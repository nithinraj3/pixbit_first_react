import axios from "axios";
import { toast } from "react-toastify";

export const DeleteDesignationData = async (id) => {
  try {
    await axios.delete(`http://training.pixbit.in/api/designations/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
      },
    });
    console.log("deleted...");
    toast.success("Successfully Deleted", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  }
};

export const EditDesignationData = async (id, editedData) => {
  try {
    await axios.put(
      `http://training.pixbit.in/api/designations/${id}`,
      { designation_name: editedData },
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
        },
      }
    );
    console.log("edited...");
    toast.success("Successfully edited", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  }
};

//Employee api calls

export const DeleteEmployeesData = async (id) => {
  try {
    await axios.delete(`http://training.pixbit.in/api/employees/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
      },
    });
    toast.success("Successfully Deleted", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
    console.log("deleted...");
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  }
};

export const EditEmployeesData = async (id) => {
  try {
    await axios.put(`http://training.pixbit.in/api/employees/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
      },
    });
    console.log("employees edited");
    toast.success("Successfully edited", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  }
};
