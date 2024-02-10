import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentUser: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.studentUser = action.payload;
    },
  },
});

export default studentSlice.reducer;
export const { saved } = studentSlice.actions;
