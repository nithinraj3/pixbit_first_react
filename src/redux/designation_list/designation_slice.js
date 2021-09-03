import { createSlice } from "@reduxjs/toolkit";

const initialState = { designationList: [], selected_id: [] };

const designationSlice = createSlice({
  name: "designation_list",
  initialState: { value: initialState },
  reducers: {
    getDesgnList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getDesgnList } = designationSlice.actions;

export default designationSlice.reducer;
