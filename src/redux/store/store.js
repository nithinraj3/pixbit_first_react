import { configureStore } from "@reduxjs/toolkit";
import designationReducer from "../designation_list/designation_slice";
import employeeReducer from "../empoyees_list/employee_slice";
import userRegisterReducer from "../authentication/registerDetails";
import userLoginReducer from "../authentication/loginDetails";
const store = configureStore({
  reducer: {
    designation_list: designationReducer,
    employee_list: employeeReducer,
    register_valid: userRegisterReducer,
    login_valid: userLoginReducer,
  },
});

export default store;
