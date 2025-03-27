import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const ROOT_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ROOT_URL}/forecast?q=${searchQuery}&appid=${API_KEY}&units=imperial`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || 'error');
    }
  }
);

const forecastSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: [
      { 
      name: 'Austin', 
      tmep: 23, 
      pressure: 1389, 
      humidity: 32, 
    }, 
  ],
    status: 'idle',
    error: null,
  },
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    resetList: (state) => {
      state.forecastData = null;
      state.status = 'idle';
      state.error = null;
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.name !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecastData = action.payload;
        state.cities.push(action.payload.city.name);
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addCity, resetList, deleteCity } = forecastSlice.actions;

export default forecastSlice.reducer;
