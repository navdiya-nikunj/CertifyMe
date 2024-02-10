import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    saved: (state, action) => {
      state.templates.push(action.payload);
    },
    restored: (state, action) => {
      state.templates = action.payload;
    },
    cleared: (state) => {
      state.templates = [];
    },
  },
});

export default templateSlice.reducer;
export const { saved, restored, cleared } = templateSlice.actions;
