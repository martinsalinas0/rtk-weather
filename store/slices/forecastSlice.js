import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get(`${ROOT_URL}/posts`);
	return response.data;
});

export const forecastSlice = createSlice({ 
  name: 'weather', 
  initialState:  {
    cities: [
      {
        name: 'Austin', 
        temp: 65, 
        pressure: 1002, 
        humidity: 34, 
      }
    ] 
  }, 
  reducers: { 
  
  }
})
