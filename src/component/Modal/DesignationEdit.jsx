import React from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  main_container: {
    margin: theme.spacing(12, 5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    margin: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(2, 2, 0, 0),
  },
}));
const AddDesignation = () => {
  const classes = useStyles();

  const history = useHistory();
  const designationData = useSelector(
    (state) => state.designation_list.value.designationList
  );

  const params = useParams();

  var resultObject = search(params.id, designationData);
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return myArray[i];
      }
    }
  }
  const [newDesignation, setNewDesignation] = useState(resultObject.name);
  const designationHandler = (e) => {
    setNewDesignation(e.target.value);
  };

  const list = {
    designation_name: newDesignation,
  };

  const addDesignationHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://training.pixbit.in/api/designations/${params.id}`,
        list,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        }
      );
      history.push("/designations");
      console.log(newDesignation);
    } catch (err) {
      console.log("Add designation error " + err);
    }
  };

  return (
    <>
      <Paper className={classes.main_container}>
        <Grid container alignItems="center" justifyContent="center">
          <Container component="main">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Designation
              </Typography>
              <form className={classes.form} onSubmit={addDesignationHandler}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="dgName"
                      label="Designation Name"
                      id="dgName"
                      onChange={designationHandler}
                      value={newDesignation}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="flex-start">
                  <Grid>
                    <Button
                      className={classes.submit}
                      xs={12}
                      sm={6}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      className={classes.submit}
                      xs={12}
                      sm={6}
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => history.push("/designations")}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Grid>
      </Paper>
    </>
  );
};

export default AddDesignation;
