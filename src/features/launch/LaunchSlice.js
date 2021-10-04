import { createSlice } from "@reduxjs/toolkit";

// State is our store, keeps our launch data and filters
const initialState = {
  launchData: [],
  nameFilter: "",
  dateFilter: "",
  launchFilter: "",
  landFilter: "",
};

// 2 Reducers to store with --
// FetchList stores our entire list of data -- called from fetchAction
// updateFilters stores our filters -- called from LaunchList
export const launchSlice = createSlice({
  name: "launch",
  initialState,
  reducers: {
    fetchList: (state, action) => {
      state.launchData = action.payload.launchData;
    },
    updateFilters: (state, action) => {
      state.nameFilter = action.payload.nameFilter;
      state.dateFilter = action.payload.dateFilter;
      state.launchFilter = action.payload.launchFilter;
      state.landFilter = action.payload.landFilter;
    },
  },
});

// export actions for other components and selectData for useSelectors
export const launchAct = launchSlice.actions;
export const selectData = (state) => state.launchData;

export default launchSlice;
