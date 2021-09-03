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

import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoadingSpinners from "../component/LoadingSpinners";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [newDesignation, setNewDesignation] = useState("");

  const designationHandler = (e) => {
    setNewDesignation(e.target.value);
  };

  const list = {
    designation_name: newDesignation,
  };

  const addDesignationHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://training.pixbit.in/api/designations", list, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
        },
      });
      setLoading(false);
      console.log(newDesignation);
      history.push("/designations");
      toast.success("successfully Added", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
      });
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
      });
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
                <AddToQueueIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create Designation
              </Typography>
              <form
                className={classes.form}
                onSubmit={addDesignationHandler}
                autoComplete="off"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="designation_name"
                      label="Designation Name"
                      id="designation_name"
                      onChange={designationHandler}
                      value={newDesignation}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="flex-start">
                  <Grid item>
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
                  <Grid item>
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
                  <Grid item xs={2}>
                    {loading && <LoadingSpinners />}
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
