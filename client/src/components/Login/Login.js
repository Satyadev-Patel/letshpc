import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
const URL = process.env.REACT_APP_URL;

const Copyright = () => {
  return (
    <Typography
      style={{ color: "#fff", fontFamily: "Poppins" }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}LetsHPC {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = (props) => {
  const classes = useStyles();

  const InitialValues = {
    email: "",
    password: "",
  };
  const [values, setValue] = useState(InitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  // Calling the API to authenticate the user

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/users/login`, values)
      .then(function (response) {
        if (response["data"]["msg"] === "success") {
          window.sessionStorage.setItem("isAuthenticate", "Yes");
          window.sessionStorage.setItem(
            "user",
            JSON.stringify(response["data"]["user"])
          );
          console.log("YES");
          props.Authenticate();
        }
      })
      .catch(function (error) {
        console.log(error);
        window.alert("Invalid Credenital!!");
      });
  };

  return (
    <Grid container component="main" className={classes.root} style={{backgroundColor:"black"}}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Container style={{ alignItems: "center" }}>
          <h1 style={{ color: "#fff", alignItems: "center", fontSize: "3rem" }}>
            Sign In
          </h1>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield,
              }}
              InputLabelProps={{
                className: classes.txtfield,
              }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className={classes.outfield}
              InputProps={{
                className: classes.txtfield,
              }}
              InputLabelProps={{
                className: classes.txtfield,
              }}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formBtn}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Box mt={5} style={{margin:"20px"}}>
              <Copyright />
            </Box>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;