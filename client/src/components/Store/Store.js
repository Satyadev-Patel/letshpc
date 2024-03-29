import React from 'react'
import Papa from 'papaparse';
import SVG from "./undraw_data_input_fxv2.svg";
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Slide } from '@mui/material';
import { useStyles } from "./StoreParallel/styles";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const URL = process.env.REACT_APP_URL

const Store = () => {

  const classes = useStyles();
  
  const [checked, setChecked] = useState();
  
  return (
    <div className={classes.root}>
      <div>
        <img style={{ width: "400px", height: "400px", margin: "50px" }} src={SVG} alt="Your SVG" />
      </div>
      <Grid container component="main" className={classes.grid} spacing={2}>
        <Grid className={classes.gridItem} item xs={12}>
          <Slide
            direction="top"
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            mountOnEnter
            unmountOnExit
          >
            <Typography variant="h1" style={{ fontFamily: "Poppins" }}>
              Assignment Submission
            </Typography>
          </Slide>
        </Grid>
      </Grid>
      <Grid container component="main" className={classes.grid}>
      <Grid className={classes.gridItem} item xs={12}>
          <Button
            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem" }}
            className={classes.formBtn}
            href="/collectSerial"
            variant="contained">
            Serial Data
          </Button>
        </Grid>
        <Grid className={classes.gridItem} item xs={12}>
          <Button
            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem" }}
            className={classes.formBtn}
            href="/collectParallel"
            variant="contained">
            Parallel Data
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Store