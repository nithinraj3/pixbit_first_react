import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  TextField,
  Paper,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  Button,
  Checkbox,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  page_content: {
    margin: theme.spacing(12, 5, 3),
    padding: theme.spacing(3),
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(15),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  form: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  upload_input: {
    display: "none",
  },
  button: {
    marginRight: theme.spacing(5),
  },
}));

const department = [
  { id: 1, title: "React Developer" },
  { id: 2, title: "Java Developer" },
  { id: 3, title: "PHP Developer" },
];

const status = [
  { id: "1", title: "Temporary" },
  { id: "2", title: "Part Time" },
  { id: "3", title: "Permanent" },
];
const EmployeeEdit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const prevEmployeeData = useSelector(
    (state) => state.employee_list.value.employeeList
  );

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == params.id) {
        return myArray[i];
      }
    }
  }
  var resultObject = search(params.id, prevEmployeeData);

  const [employeeData, setEmployeeData] = useState({
    fname: resultObject.first_name,
    lname: resultObject.last_name,
    email: resultObject.email,
    mobile: resultObject.mobile,
    landline: resultObject.landline,
    designation: resultObject.designation_id,
    gender: resultObject.gender,
    presentAddress: resultObject.present_address,
    permenentAddress: resultObject.permanent_address,
    status: resultObject.status,
  });

  const [joiningDate, setjoiningDate] = useState(resultObject.join_date);
  const [dob, setDob] = useState(resultObject.date_of_birth);
  const [checkBoxAddress, setCheckBoxAddress] = useState(false);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
    setEmployeeData({
      ...employeeData,
      permenentAddress: employeeData.presentAddress,
    });
  };

  const employeesFormHandling = async (e) => {
    e.preventDefault();

    var object = {};
    const formData = new FormData();
    formData.append("first_name", employeeData.fname);
    formData.append("last_name", employeeData.lname);
    formData.append("join_date", new Date(joiningDate).toLocaleDateString());
    formData.append("date_of_birth", new Date(dob).toLocaleDateString());
    formData.append("designation_id", employeeData.designation);
    formData.append("gender", employeeData.gender);
    formData.append("status", employeeData.status);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("landline", employeeData.landline);
    formData.append("present_address", employeeData.presentAddress);
    formData.append("permanent_address", employeeData.permenentAddress);

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    try {
      await axios.put(
        `http://training.pixbit.in/api/employees/${params.id}`,
        object,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        }
      );
      console.log(formData);
      history.push("/employees");
    } catch (err) {
      console.log("Add employee error " + err.message);
    }
  };

  return (
    <>
      <Paper className={classes.page_content}>
        <Container className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Employee
          </Typography>
        </Container>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={employeesFormHandling}
        >
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                name="fname"
                id="fname"
                autoFocus
                required
                value={employeeData.fname}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Last Name"
                name="lname"
                id="lname"
                required
                value={employeeData.lname}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="E-mail Address"
                name="email"
                id="email"
                required
                value={employeeData.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Mobile Number"
                name="mobile"
                id="mobile"
                required
                value={employeeData.mobile}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Landline Number"
                name="landline"
                id="landline"
                placeholder="(optional)"
                value={employeeData.landline}
                onChange={handleChange}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  label="Joining Date"
                  format="MM/dd/yyyy"
                  name="joinDate"
                  value={joiningDate}
                  onChange={(e) => setjoiningDate(e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  label="Date of Birth"
                  format="MM/dd/yyyy"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>

              <FormControl variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  label="status"
                  name="status"
                  onChange={handleChange}
                  value={employeeData.status}
                >
                  {status.map((item) => (
                    <MenuItem key={item.id} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div style={{ margin: "10px 10px" }}>
                <Grid container>
                  <Grid item xs={1} className={classes.button}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={1} className={classes.button}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="button"
                      onClick={() => history.push("/employees")}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined">
                <InputLabel>Designation</InputLabel>
                <Select
                  label="Designation"
                  name="designation"
                  onChange={handleChange}
                  value={employeeData.designation}
                >
                  <MenuItem value="">None</MenuItem>

                  {department.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                label="Present Address"
                name="presentAddress"
                id="presentAddress"
                required
                value={employeeData.presentAddress}
                onChange={handleChange}
              />
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkSameAddress"
                      checked={checkBoxAddress}
                      onChange={checkBoxAddressChange}
                      color="primary"
                    />
                  }
                  label="Same as Present Address"
                />
              </FormControl>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                label="Permanent Address"
                name="permenentAddress"
                id="permenentAddress"
                required
                value={
                  checkBoxAddress
                    ? employeeData.presentAddress
                    : employeeData.permenentAddress
                }
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default EmployeeEdit;
