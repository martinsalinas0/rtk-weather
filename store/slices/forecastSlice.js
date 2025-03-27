import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const ROOT_URL = "https://api.openweathermap.org/data/2.5";

const initialState = {
  cities: [],
  status: "idle",
  error: "",
  forecastData: {},
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ROOT_URL}/forecast?q=${searchQuery}&appid=${API_KEY}&units=imperial`
      );

      const forecastData = response.data;

      const weatherInfo = {
        id: forecastData.city.id,
        name: forecastData.city.name,
        list: forecastData.list,
        temperature: forecastData.list.map((item) => item.main.temp),
        humidity: forecastData.list.map((item) => item.main.humidity),
        pressure: forecastData.list.map((item) => item.main.pressure),
      };

      // console.log(forecastData);
      // console.log(weatherInfo);
      return weatherInfo;
    } catch (error) {
      return rejectWithValue(error.response + 'ee' || "error");
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    resetList: (state) => {
      state.cities = [];
      state.status = "idle";
      state.error = "";
      state.forecastData = {};
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null; 
        state.forecastData = action.payload;
        // state.cities.push(action.payload);
        console.log(action.payload);
        const cityIdNo = state.cities.some(
          (city) => city.id === action.payload.id
        );
        console.log(cityIdNo);

        if (!cityIdNo) {
          state.cities.push(action.payload);
        } else {
          console.log("duplicate");
          alert("city already here");
        }
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

      });
  },
});

export const { addCity, resetList, deleteCity } = forecastSlice.actions;
export default forecastSlice.reducer;
