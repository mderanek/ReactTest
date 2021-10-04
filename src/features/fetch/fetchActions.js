import { fetchAct } from "./fetchSlice";

// Call the API for the initial pull of data
// JSON extracted and then stored in store using dispatch
export const fetchLaunchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      // Fetch Data
      const response = await fetch("https://api.spacexdata.com/v4/launches");

      if (!response.ok) {
        throw new Error("Could not fetch launch data!");
      }

      // Extract JSON
      const data = await response.json();

      return data;
    };

    try {
      // ASync, wait for completion
      const launchData = await fetchData();

      // Store the JSON in the store
      dispatch(
        fetchAct.fetchList({
          launchData: launchData,
        })
      );
    } catch (error) {}
  };
};
