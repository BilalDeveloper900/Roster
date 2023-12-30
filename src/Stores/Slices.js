import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./Intercepter";
import axios from "axios";

export const login = createAsyncThunk("login", async (payload) => {
  const response = await api.post("api/auth/login", payload);
  return response.data;
});

export const trips = createAsyncThunk("trips", async () => {
  const response = await api.get("api-staff/trips/active");
  console.log(response);
  return response.data;
});

export const members = createAsyncThunk("members", async () => {
  const response = await api.get("api-staff/trips/18/members");
  console.log(response);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    login: [],
    trips: [],
    members: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.login = action.payload;
        state.error = null;
      })
      .addCase(members.fulfilled, (state, action) => {
        state.members = action.payload;
        state.error = null;
      })
      .addCase(trips.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.error = null;
      });
  },
});
export default projectSlice.reducer;
