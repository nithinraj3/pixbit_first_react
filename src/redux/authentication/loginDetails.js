import { createSlice } from "@reduxjs/toolkit";

const initialLoginDetails = {
  tokenState: false,
  tokenValue: "",
};

const userLoginSlice = createSlice({
  name: "login_valid",
  initialState: { value: initialLoginDetails },
  reducers: {
    userLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userLogin } = userLoginSlice.actions;

export default userLoginSlice.reducer;
