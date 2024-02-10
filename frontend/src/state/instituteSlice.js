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
  },
});

export default instituteSlice.reducer;
export const { saved } = instituteSlice.actions;
