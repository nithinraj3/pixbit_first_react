import { createSlice } from "@reduxjs/toolkit";

const initialRegisterDetails = {
  tokenState: false,
  tokenValue: "",
};

const userRegisterSlice = createSlice({
  name: "register_valid",
  initialState: { value: initialRegisterDetails },
  reducers: {
    userRegistered: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userRegistered } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
