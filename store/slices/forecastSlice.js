import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const ROOT_URL = "https://api.openweathermap.org/data/2.5";

export const fetchData = createAsyncThunk(
  "weather/fetchData", // Corrected action name
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ROOT_URL}/forecast?q=${searchQuery}&appid=${API_KEY}&units=imperial`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "error");
    }
  }
);

export const forecastSlice = createSlice({
  name: "cities",
  initialState: {
    
      cities: [], 
      status: 'idle', 
      error: null, 
    

  },
  reducers: {
    addCity: (state, action) => { 
      state.cities.push(action.payload)
    },

    deleteCity: (state, action) => { 
      state.cities = state.cities.filter(
        (city) => city.name !== action.payload
      )
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecastData = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      });
  },
});

export const { resetForecast } = forecastSlice.actions;


export default forecastSlice.reducer;