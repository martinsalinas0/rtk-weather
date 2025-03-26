import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const ROOT_URL = "https://api.openweathermap.org/data/2.5";

export const fetchData = createAsyncThunk(
  "weather/fecthData",
  async (searchQuery, { isRejectedWithValue }) => {
    try {
      const response = await axios.get(
        `${ROOT_URL}/forecast?q=${searchQuery}&appid=${API_KEY}&units=imperial`
      );
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response || "error");
    }
  }
);


export const forecastSlice = createSlice({ 
  name: 'cities', 
  initialState: { 
    cities: [], 
     },
  reducers: { 
    addCity: (state, action) => { 
      state.cities = 
    }
  }
  
})