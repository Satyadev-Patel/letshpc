import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import { InputLabel, MenuItem, Box, FormControl, Button, Grid, ListItem, Typography, List } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { common } from '@mui/material/colors';

const URL = process.env.REACT_APP_URL;
const Analyse = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container component="main" className={classes.grid}>
                <Grid className={classes.gridItem} item xs={12}>
                    <Button
                        style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem" }}
                        className={classes.formBtn}
                        href="/analyseSerial"
                        variant="contained">
                        Serial Data
                    </Button>
                </Grid>
                <Grid className={classes.gridItem} item xs={12}>
                    <Button
                        style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem" }}
                        className={classes.formBtn}
                        href="/analyseParallel"
                        variant="contained">
                        Parallel Data
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Analyse