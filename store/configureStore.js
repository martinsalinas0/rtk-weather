import { configureStore } from '@reduxjs/toolkit';
import forecastReducer from './slices/forecastSlice';

const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

export default store;
