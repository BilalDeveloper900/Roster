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

export const tripDetail = createAsyncThunk("tripDetail", async (id) => {
  const response = await api.get(`api-staff/trips/${id}`);
  console.log(response);
  return response.data;
});

export const tripMembers = createAsyncThunk("tripMembers", async (id) => {
  const response = await api.get(`api-staff/trips/${id}/members`);
  console.log(response);
  return response.data;
});

export const changeTime = createAsyncThunk("changeTime", async (payload) => {
  const response = await api.post(
    "api-staff/trips/members/update-boarding-status",
    payload
  );
  console.log(response);
  return response.data;
});

export const scanDetail = createAsyncThunk("scanDetail", async (id) => {
  const response = await api.get(`/api-staff/trips/members/${id}`);
  console.log(response);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    login: [],
    trips: [],
    tripMembers: [],
    tripDetail: [],
    scanDetail: [],
    changeTime: [],
    error: null,
    id: null,
    fetchedData: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setFetchedData: (state, action) => {
      state.fetchedData = action.payload;
    },
    updateData: (state, action) => {
      // Perform the update logic here
      state.fetchedData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.login = action.payload;
        state.error = null;
      })
      .addCase(tripMembers.fulfilled, (state, action) => {
        state.tripMembers = action.payload;
        state.error = null;
      })
      .addCase(trips.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(tripDetail.fulfilled, (state, action) => {
        state.tripDetail = action.payload;
        state.error = null;
      })
      .addCase(changeTime.fulfilled, (state, action) => {
        state.changeTime = action.payload;
        state.error = null;
      })
      .addCase(scanDetail.fulfilled, (state, action) => {
        state.scanDetail = action.payload;
        state.error = null;
      });
  },
});
export default projectSlice.reducer;

export const { setId, setFetchedData, updateData } = projectSlice.actions;
export const selectId = (state) => state.data.id;
export const selectFetchedData = (state) => state.data.fetchedData;
