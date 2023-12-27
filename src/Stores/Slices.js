import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./Intercepter";

export const login = createAsyncThunk("login", async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    login: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
    });
  },
});
export default projectSlice.reducer;
