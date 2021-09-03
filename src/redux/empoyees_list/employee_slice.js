import { createSlice } from "@reduxjs/toolkit";

const initialState = { employeeList: [] };

const employeeSlice = createSlice({
    name: "employee_list",
    initialState: { value: initialState },
    reducers: {
        getEmployeeList: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { getEmployeeList } = employeeSlice.actions;

export default employeeSlice.reducer;