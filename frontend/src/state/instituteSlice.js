import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instituteUser: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.instituteUser = action.payload;
    },
    cleared: (state) => {
      state.instituteUser = null;
    },
  },
});

export default instituteSlice.reducer;
export const { saved, cleared } = instituteSlice.actions;
