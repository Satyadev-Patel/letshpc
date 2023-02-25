import { Button, Grid, Slide } from '@mui/material'
import SVG from "./undraw_educator_re_ju47.svg"
import React from 'react'
import { useState, useEffect } from 'react';
import { useStyles } from "./styles";

const DataPage = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    return (
        <div className={classes.root}>
            <div>
                <img style={{width:"500px", height: "500px", margin: "50px"}} src={SVG} alt="Your SVG" />
            </div>
            <Slide
                direction="bottom"
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                mountOnEnter
                unmountOnExit
            >
                <h1 className={classes.title}>Welcome to Data Exploration</h1></Slide>
            <Slide
                direction="left"
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                mountOnEnter
                unmountOnExit
            >
                <Grid container component="main" className={classes.grid} spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "300px", }}
                            className={classes.formBtn}
                            href="/collect"
                            variant="contained">
                            Collect Data
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "300px", }}
                            className={classes.formBtn}
                            href="/analyse"
                            variant="contained">
                            Analyse Data
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "300px" }}
                            className={classes.formBtn}
                            href="/plot"
                            variant="contained">
                            PLOT DATA
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "300px", backgroundColor: "black" }}
                            className={classes.formBtn}
                            href="/ssh"
                            variant="contained">
                            SSH
                        </Button>
                    </Grid>
                </Grid>
            </Slide>
        </div>
    )
}

export default DataPage