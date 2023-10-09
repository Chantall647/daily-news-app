import {createSlice} from "@reduxjs/toolkit";
import {addToNewsletter} from "../utils/thunks";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    action: {},
  },
  reducers: {
    clearNewsletter: (state, action) => {
      state.action = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToNewsletter.fulfilled, (state, action) => {
      state.action = action.payload;
    });
  },
});

export const {clearNewsletter} = usersSlice.actions;
export default usersSlice.reducer;
