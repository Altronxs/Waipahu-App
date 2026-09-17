/**
 * Fetches the current school cafe menu link from a remote JSON file on GitHub.
 * Uses a combined race timeout alongside external cancellation handles.
 * 
 * @param {AbortSignal} [externalSignal] - Optional signal passed from React/Vue components to cancel the request.
 * @returns {Promise<Object|Array>} The parsed JSON data representing the current menu link.
 */
export const fetchSchoolMenu = async (externalSignal) => {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), 10000);
  const handleExternalAbort = () => timeoutController.abort();

  if (externalSignal) {
    externalSignal.addEventListener("abort", handleExternalAbort);
  }

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Altronxs/Waipahu-App/refs/heads/main/live-data/website.json',
      { signal: timeoutController.signal }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data?.website?.[0]?.menu) {
      throw new Error('Unexpected response shape: missing website[0].menu');
    }
    return data.website[0].menu;

  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn("Fetch school menu request was aborted (either timeout or component unmount).");
      return null;
    }
    console.error("Failed to fetch school menu:", error);
    throw error;
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
// Cafe's useFocusEffect calls this on every focus. Same reasoning as
// eventService.js: without this, rapid focus/blur cycling on the Cafe
// screen fires overlapping, then-aborted requests. Kept as a separate
// cache from events (different endpoint, different data), same pattern.
let cachedMenu = null;
let cachedMenuAt = 0;
let inFlightMenuRequest = null;
const MENU_CACHE_TTL_MS = 30000;

/**
 * Returns the cached menu link, an in-flight request already underway, or
 * kicks off a new fetch — never more than one request outstanding at once.
 *
 * @param {Object} [options]
 * @param {boolean} [options.forceRefresh] - Bypass the cache.
 * @returns {Promise<Object|Array|null>}
 */
export const getSchoolMenu = async ({ forceRefresh = false } = {}) => {
  const isFresh = cachedMenu && (Date.now() - cachedMenuAt < MENU_CACHE_TTL_MS);

  if (isFresh && !forceRefresh) {
    return cachedMenu;
  }

  if (inFlightMenuRequest) {
    return inFlightMenuRequest;
  }

  inFlightMenuRequest = fetchSchoolMenu()
    .then((data) => {
      if (data) {
        cachedMenu = data;
        cachedMenuAt = Date.now();
      }
      return cachedMenu;
    })
    .finally(() => {
      inFlightMenuRequest = null;
    });

  return inFlightMenuRequest;
};