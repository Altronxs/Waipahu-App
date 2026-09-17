// ==========================================
// IMPORTS
// ==========================================
import { DOMParser } from '@xmldom/xmldom';

// Pre-defined array of short month names for fast, index-based mapping
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ==========================================
// SERVICE FUNCTIONS
// ==========================================

/**
 * Parses raw XML/RSS strings into structured, UI-ready event objects.
 * Expects dates and times to be embedded inside the <description> tag.
 * 
 * @param {string} xmlString - The raw XML text payload from the server.
 * @returns {Array<{name: string, month: string, day: string, time: string}>} Array of processed events.
 */
export const parseEventsXML = (xmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    
    // Gather all item tags into an array-like collection
    const items = doc.getElementsByTagName('item');
    const extractedEvents = [];
    
    // Limit extraction to a maximum of 5 items to keep UI footprints small
    const itemCount = Math.min(5, items.length);

    for (let i = 0; i < itemCount; i++) {
        const item = items[i];

        // Safely extract Node values to avoid crashing on empty fields
        const titleNode = item.getElementsByTagName('title')[0];
        const descNode = item.getElementsByTagName('description')[0];

        const eventName = titleNode && titleNode.textContent ? titleNode.textContent.trim() : 'Unknown Event';
        const rawDesc = descNode && descNode.textContent ? descNode.textContent.trim() : '';

        let month = '';
        let day = '';

        // Matches numeric date formats localized at the start of descriptions (e.g., "8/18/2026")
        const dateMatch = rawDesc.match(/^(\d{1,2})\/(\d{1,2})\/\d{4}/);
        
        if (dateMatch) {
            const monthNum = parseInt(dateMatch[1], 10);
            // Map the parsed numeric month safely to our lookup index (1-12 maps to 0-11)
            if (monthNum >= 1 && monthNum <= 12) {
                month = MONTH_NAMES[monthNum - 1];
            }
            day = dateMatch[2];
        }

        // Default value if no specific time block can be verified
        let time = 'All Day'; 
        
        // Matches expressions like "8:00 AM", "12:30 PM", or "9:00 AM - 2:00 PM"
        const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM)(?:\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM))?)/i;
        const timeMatch = rawDesc.match(timeRegex);
        
        if (timeMatch) {
            // Unify spaces around hyphens for clean visual spacing (e.g. "9:00AM-1:00PM")
            time = timeMatch[0].trim().replace(/\s*-\s*/, '-');
        }

        // Push the formatted payload into the final batch collection
        extractedEvents.push({
            name: eventName,
            month,
            day,
            time,
        });
    }

    return extractedEvents;
};

/**
 * Fetches raw XML school events from the remote RSS feed channel.
 * Uses a combined race timeout alongside external cancellation handles.
 * 
 * @param {AbortSignal} [externalSignal] - Optional signal passed from React/Vue components.
 * @returns {Promise<Array>} Resolves to a structured list of events.
 */
export const fetchSchoolEvents = async (externalSignal) => {
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 10000);
    const handleExternalAbort = () => timeoutController.abort();

    if (externalSignal) {
        externalSignal.addEventListener("abort", handleExternalAbort);
    }

    try {
        const response = await fetch(
            'https://www.waipahuhigh.org/apps/events/events_rss.jsp?id=0',
            { signal: timeoutController.signal }
        );

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const htmlString = await response.text();
        return parseEventsXML(htmlString);

    } catch (err) {
        // Was this a real network/parse failure, or just an intentional cancel
        // (screen navigated away, or our own 10s timeout)?
        const wasAborted = err?.name === 'AbortError' || externalSignal?.aborted;

        if (wasAborted) {
            // Expected — don't treat this as an error, just bail quietly.
            return null;
        }
        throw err; // genuine failure — let the caller handle/report it
    } finally {
        clearTimeout(timeoutId);
        if (externalSignal) {
            externalSignal.removeEventListener("abort", handleExternalAbort);
        }
    }
};

// ==========================================
// SHARED CACHE / IN-FLIGHT REQUEST DEDUP
// ==========================================
// Both the Home screen and the Events screen call into this file every time
// they gain focus. Without coordination, rapid navigation between them
// (e.g. home -> events -> home in under a second) can fire several
// overlapping, then-aborted requests to the SAME host in quick succession.
// Aborted native requests aren't always torn down instantly, so a burst of
// these can pin/exhaust the connection pool for that host and make
// unrelated requests stall right after. This module-level cache + in-flight
// promise ensures at most one request to the RSS feed is ever outstanding
// app-wide, and repeated focus events within the TTL just reuse the cache.
let cachedEvents = null;
let cachedAt = 0;
let inFlightRequest = null;
const CACHE_TTL_MS = 30000; // don't hit the network more than once per 30s

/**
 * Returns the latest school events, either from cache, from an
 * already-in-flight request, or by kicking off a new fetch. Never allows
 * more than one concurrent request to the underlying endpoint.
 *
 * @param {Object} [options]
 * @param {boolean} [options.forceRefresh] - Bypass the cache (e.g. pull-to-refresh).
 * @returns {Promise<Array|null>}
 */
export const getSchoolEvents = async ({ forceRefresh = false } = {}) => {
    const isFresh = cachedEvents && (Date.now() - cachedAt < CACHE_TTL_MS);

    if (isFresh && !forceRefresh) {
        return cachedEvents;
    }

    // Someone else already kicked off a fetch (e.g. Home and Events both
    // focused within the same moment) — piggyback on it instead of
    // starting a second request to the same host.
    if (inFlightRequest) {
        return inFlightRequest;
    }

    inFlightRequest = fetchSchoolEvents()
        .then((parsedEvents) => {
            if (parsedEvents && parsedEvents.length > 0) {
                cachedEvents = parsedEvents;
                cachedAt = Date.now();
            }
            return cachedEvents;
        })
        .finally(() => {
            inFlightRequest = null;
        });

    return inFlightRequest;
};

/**
 * Higher-level execution wrapper designed to pipe network operations 
 * smoothly into UI state management hooks. Backed by the shared cache
 * above, so calling this from multiple screens on every focus is safe
 * and cheap — it will not spam the network.
 * 
 * @param {Object} params
 * @param {Function} params.setEvents - State variable updater for raw event payloads.
 * @param {Function} params.setEventsError - Error state dispatcher.
 * @param {Function} params.setAppIsReady - Application life-cycle validation hook.
 * @param {boolean} [params.forceRefresh] - Bypass the cache (e.g. pull-to-refresh).
 */
export const loadWebsiteData = async ({ setEvents, setEventsError, setAppIsReady, forceRefresh = false }) => {
    setEventsError(null); // clear stale error before starting
    try {
        const parsedEvents = await getSchoolEvents({ forceRefresh });

        // Safeguard state from getting overridden by incomplete requests
        if (!parsedEvents || parsedEvents.length === 0) return;

        setEvents(parsedEvents);
        setEventsError(null);

    } catch (error) {
        console.error("Network request failed: ", error);
        setEventsError("Unable to load events right now.");

    } finally {
        // Toggle the UI loading skeleton off regardless of failure or success outcomes
        if (setAppIsReady) {
            setAppIsReady(true);
        }
    }
};