import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../state/studentSlice";
import instituteReducer from "../state/instituteSlice";

const store = configureStore({
  reducer: {
    student: studentReducer,
    institute: instituteReducer,
  },
});

export default store;
