import { Button, Grid, Slide } from '@mui/material'
import SVG from "./undraw_educator_re_ju47.svg"
import React from 'react'
import { useState, useEffect } from 'react';
import { useStyles } from "./styles";

const Home = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);

    const Logout = () => {
        window.sessionStorage.clear();
        props.Authenticate();
    };
    return (
        <div className={classes.root}>
            <div>
                <img style={{ width: "500px", height: "500px", margin: "50px" }} src={SVG} alt="Your SVG" />
            </div>
            <Slide
                direction="bottom"
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                mountOnEnter
                unmountOnExit
            >
                <h1 className={classes.title}>Welcome to LetsHPC 2.0</h1></Slide>
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
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "400px", }}
                            className={classes.formBtn}
                            href="/datapage"
                            variant="contained">
                            Data Exploration
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "400px", }}
                            className={classes.formBtn}
                            href="/assignments"
                            variant="contained">
                            Assignments
                        </Button>
                    </Grid>
                    {
                        props.Auth === "Yes" ? (
                            <Grid item xs={12}>
                                <Button
                                    style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "400px", }}
                                    className={classes.formBtn}
                                    onClick={Logout}
                                    variant="contained">
                                    Logout
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Button
                                    style={{ fontFamily: "Poppins", padding: "20px", fontSize: "2rem", minWidth: "400px", }}
                                    className={classes.formBtn}
                                    href="/login"
                                    variant="contained">
                                    Login
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
            </Slide>
        </div>
    )
}

export default Home