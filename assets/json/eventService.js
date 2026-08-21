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
    
    // Set a hard 10-second limit for network fallbacks
    const timeoutId = setTimeout(() => timeoutController.abort(), 10000);

    // Link the internal timeout controller with the external cancellation stream
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

    } finally {
        // Clear timeout and remove event listener to eliminate memory leaks
        clearTimeout(timeoutId);
        if (externalSignal) {
            externalSignal.removeEventListener("abort", handleExternalAbort);
        }
    }
};

/**
 * Higher-level execution wrapper designed to pipe network operations 
 * smoothly into UI state management hooks.
 * 
 * @param {Object} params
 * @param {AbortSignal} [params.signal] - Cancellation token.
 * @param {Function} params.setEvents - State variable updater for raw event payloads.
 * @param {Function} params.setEventsError - Error state dispatcher.
 * @param {Function} params.setAppIsReady - Application life-cycle validation hook.
 */
export const loadWebsiteData = async ({ signal, setEvents, setEventsError, setAppIsReady }) => {
    try {
        const parsedEvents = await fetchSchoolEvents(signal);

        // Safeguard state from getting overridden by incomplete requests
        if (!parsedEvents || parsedEvents.length === 0) return;

        setEvents(parsedEvents);
        setEventsError(null);

    } catch (error) {
        // If the request was intentionally cancelled, swallow the exception silently
        if (error?.name === "AbortError") {
            return; 
        }
        
        console.error("Network request failed: ", error);
        setEventsError("Unable to load events right now.");

    } finally {
        // Toggle the UI loading skeleton off regardless of failure or success outcomes
        if (setAppIsReady) {
            setAppIsReady(true);
        }
    }
};
