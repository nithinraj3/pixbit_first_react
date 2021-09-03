import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first_name: "",
    last_name: "",
    join_date: new Date().toLocaleDateString(),
    date_of_birth: new Date().toLocaleDateString(),
    designation_id: "",
    gender: "",
    email: "",
    mobile: "",
    landline: "",
    present_address: "",
    permanent_address: "",
    status: "",
    profile_picture: [],
    resume: [],
};

const employeeStateSlice = createSlice({
    name: "employee_create",
    initialState: { value: initialState },
    reducers: {
        addEmployee: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { addEmployee } = employeeStateSlice.actions;

export default employeeStateSlice.reducer;