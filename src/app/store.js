import { configureStore } from '@reduxjs/toolkit';
import launchSlice from '../features/launch/LaunchSlice';

export const store = configureStore({
  reducer: {
    launch: launchSlice.reducer,
  },
});
