/**
 * Fetches the current school cafe menu link from a remote JSON file on GitHub.
 * Uses a combined race timeout alongside external cancellation handles.
 * 
 * @param {AbortSignal} [externalSignal] - Optional signal passed from React/Vue components to cancel the request.
 * @returns {Promise<Object|Array>} The parsed JSON data representing the current menu link.
 */
export const fetchSchoolMenu = async (externalSignal) => {
  // Create an internal controller to handle our network timeout
  const timeoutController = new AbortController();

  // Set a hard 10-second limit for network fallbacks before aborting
  const timeoutId = setTimeout(() => timeoutController.abort(), 10000);

  // Link the internal timeout controller with the external cancellation stream
  const handleExternalAbort = () => timeoutController.abort();

  if (externalSignal) {
    // If the component unmounts or cancels, immediately abort our fetch request
    externalSignal.addEventListener("abort", handleExternalAbort);
  }

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Altronxs/Waipahu-App/refs/heads/main/live-data/website.json',
      { signal: timeoutController.signal }
    );

    // Verify the HTTP request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the raw response body into a usable JavaScript object/array
    const data = await response.json();
    return data.website[0].menu;

  } catch (error) {
    // Handle or rethrow errors so the calling component knows the fetch failed
    if (error.name === 'AbortError') {
      console.warn("Fetch school menu request was aborted (either timeout or component unmount).");
    } else {
      console.error("Failed to fetch school menu:", error);
    }
    throw error;

  } finally {
    // Clear timeout and remove event listener to eliminate memory leaks
    clearTimeout(timeoutId);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", handleExternalAbort);
    }
  }
};