import React, { useCallback } from "react";
import {
  Container,
  Card,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../component/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useReducer } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/authentication/loginDetails";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoadingSpinners from "../component/LoadingSpinners";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  main_container: {
    marginTop: theme.spacing(12),
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const userDetailDispatch = useDispatch();

  const log = formState.inputs;

  const loginDetails = {
    email: log.email.value,
    password: log.password.value,
  };

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const logData = await axios.post(
        "http://training.pixbit.in/api/login",
        loginDetails,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      userDetailDispatch(
        userLogin({
          tokenState: true,
          tokenValue: logData.data.data.access_token,
        })
      );
      console.log(logData.data.data);
      localStorage.setItem(
        "loginUser",
        JSON.stringify(logData.data.data.access_token)
      );
      setLoading(false);
      toast.success("Successfully Logged In", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
      history.push("/");
    } catch (err) {
      console.log("Login error " + err);
      setLoading(false);
      toast.error("Provide valid information", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classes.main_container}
      >
        <Card>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form
                className={classes.form}
                autoComplete="off"
                onSubmit={placeSubmitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      element="input"
                      variant="outlined"
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="E-mail Address"
                      name="email"
                      errorText="Valid email required"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                      onInput={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      element="password"
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      errorText="Atleast 7 characters"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(7)]}
                      onInput={inputHandler}
                    />
                  </Grid>
                  {loading && (
                    <>
                      <Grid item xs={12}>
                        <LoadingSpinners />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                  disabled={!formState.isValid}
                >
                  Login
                </Button>
              </form>
            </div>
          </Container>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
