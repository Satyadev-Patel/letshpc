import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useStyles } from "./styles";
const Ssh = () => {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("This is the output");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        setConnected(false);
    }, [])


    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.grid}
            >
                <Box>
                    <TextField
                        className={classes.txtfield}
                        id="outlined-basic"
                        label="Input Command"
                        style={{ width: "500px" }}
                        onChange={(e) => setInput(e.target.value)}
                        variant="outlined"
                    />
                </Box>
                <Box style={{ marginTop: "50px" }}>
                    <Typography variant='h3' fontFamily='Poppins'>
                        SSH OUTPUT
                    </Typography>
                    <Box style={{
                        outline: "2px dotted green",
                        width: "1200px",
                        height: "300px",
                        backgroundColor: "black"
                    }}
                        className={classes.scroll}
                    >
                        <Typography style={{
                            margin: "20px",
                            fontFamily: "Poppins",
                            color: "white"
                        }}
                            variant='body1'
                            gutterBottom>
                            {output}
                        </Typography>
                    </Box>
                </Box>
                {connected ?
                    <Typography style={{
                        margin: "20px",
                        fontFamily: "Poppins",
                        color: "Green"
                    }}
                        variant='h4'
                        gutterBottom>
                        Connected!
                    </Typography> : (
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.grid}
                        >
                            <TextField
                                className={classes.txtfield}
                                id="outlined-basic"
                                label="IP Address"
                                style={{ width: "250px", margin: "20px" }}
                                onChange={(e) => setUsername(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.txtfield}
                                id="outlined-basic"
                                label="Password"
                                style={{ width: "250px", margin: "20px" }}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                            />
                            <Button
                                style={{ fontFamily: "Poppins" }}
                                className={classes.formBtn}
                                onClick={() => setConnected(true)}
                                variant="contained">
                                Connect
                            </Button>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default Ssh