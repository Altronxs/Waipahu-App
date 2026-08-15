import { DOMParser } from '@xmldom/xmldom';

/**
 * Parses XML/RSS string into structured event objects using DOMParser.
 * @param {string} xmlString 
 * @returns {Array<{name: string, month: string, day: string, time: string}>}
 */
export const parseEventsXML = (xmlString) => {
  const parser = new DOMParser();
  // Pass 'text/xml' or 'application/xml'
  const doc = parser.parseFromString(xmlString, 'text/xml');

  // 1. Gather all <item> elements into a collection
  const items = doc.getElementsByTagName('item');
  const extractedEvents = [];

  const itemCount = Math.min(3, items.length);
  for (let i = 0; i < itemCount; i++) {
    const item = items[i];

    // 2. Fetch standard node text content safely
    const titleNode = item.getElementsByTagName('title')[0];
    const descNode = item.getElementsByTagName('description')[0];

    const eventName = titleNode && titleNode.textContent ? titleNode.textContent.trim() : 'Unknown Event';
    const rawDesc = descNode && descNode.textContent ? descNode.textContent.trim() : '';

    let month = '';
    let day = '';

    // Match date formats like "8/18/2026" or "08/18/2026"
    const dateMatch = rawDesc.match(/^(\d{1,2})\/(\d{1,2})\/\d{4}/);
    if (dateMatch) {
      const monthNum = parseInt(dateMatch[1], 10);
      if (monthNum >= 1 && monthNum <= 12) {
        month = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[monthNum - 1];
      }
      day = dateMatch[2];
    }

    // 3. Parse out the Time Range using Regex
    let time = 'All Day';
    const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM)(?:\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM))?)/i;
    const timeMatch = rawDesc.match(timeRegex);

    if (timeMatch) {
      time = timeMatch[0].trim().replace(/\s*-\s*/, '-');
    }

    // 4. Append structured event object
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
 * Fetches and parses school events from the RSS feed.
 * @param {AbortSignal} [externalSignal] 
 * @returns {Promise<Array>}
 */
const fetchSchoolEvents = async (externalSignal) => {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), 10000);

  if (externalSignal) {
    externalSignal.addEventListener("abort", () => timeoutController.abort());
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
    clearTimeout(timeoutId);
  }
};

/**
* Executes event fetching and safely handles component state updates.
 * * @param {Object} params
 * @param {AbortSignal} [params.signal] - Abort controller signal for cancellation.
 * @param {Function} params.setEvents - State setter for events list.
 * @param {Function} params.setEventsError - State setter for error messages.
 * @param {Function} params.setAppIsReady - State setter indicating readiness.
 */
export const loadWebsiteData = async ({
  signal,
  setEvents,
  setEventsError,
  setAppIsReady,
}) => {
  try {
    const parsedEvents = await fetchSchoolEvents(signal);

    // Don't overwrite state if request was cancelled or returned empty
    if (!parsedEvents || parsedEvents.length === 0) return;

    setEvents(parsedEvents);
    setEventsError(null);
  } catch (error) {
    if (error?.name === "AbortError") {
      return; // Navigation away or timeout — fail silently
    }
    console.error("Network request failed: ", error);
    setEventsError("Unable to load events right now.");
  } finally {
    if (setAppIsReady) {
      setAppIsReady(true);
    }
  }
};