import React from 'react'
import Papa from 'papaparse';
import SVG from "./undraw_data_input_fxv2.svg";
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Slide } from '@mui/material';
import { useStyles } from "./styles";
import axios from 'axios';

const URL = process.env.REACT_APP_URL

const Store = () => {

  const classes = useStyles();

  const [data, setData] = useState([]);
  const [grpNumber, setGrpNumber] = useState(0);
  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  // Function to store the data in the database
  const storeData = () => {
    if (grpNumber === 0) {
      window.alert("Please Enter Group Number");
    }
    else {
      data.forEach(async (row) => {
        row["GROUP_NO"] = grpNumber;
      });
      axios.post(`${URL}/data/store`, data)
        .then(window.alert("Data Stored"))
        .catch(err => console.error(err));
    }
  };


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
          <TextField
            className={classes.txtfield}
            id="outlined-basic"
            label="Group Number"
            onChange={(e) => setGrpNumber(e.target.value)}
            variant="outlined" />
        </Grid>
        <Grid className={classes.gridItem} item xs={12}>
          <TextField
            className={classes.txtfield}
            onChange={handleUpload}
            inputProps={{ type: 'file' }} />
        </Grid>
        <Grid className={classes.gridItem} item xs={12}>
          <Button
            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem" }}
            className={classes.formBtn}
            onClick={storeData}
            variant="contained">
            Store Data
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Store