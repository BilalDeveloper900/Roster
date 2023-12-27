import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./Slices";

const store = configureStore({
  reducer: {
    project: projectSlice,
  },
});

export default store;
