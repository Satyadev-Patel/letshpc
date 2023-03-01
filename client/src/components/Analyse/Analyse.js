import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import { InputLabel, MenuItem, Box, FormControl, Button, Grid, ListItem, Typography, List } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { common } from '@mui/material/colors';

const URL = process.env.REACT_APP_URL;
const Analyse = () => {
    const classes = useStyles();
    const [probName, setProbName] = useState("");
    const [allProb, setAllProb] = useState([]);
    const [perfResults, setPerfResults] = useState([]);
    const handleChange = (e) => {
        setPerfResults([]);
        setProbName(e.target.value);
    };

    useEffect(() => {
        axios.post(`${URL}/data/allproblems`)
            .then(res => setAllProb(res.data.data))
            .catch(err => console.error(err));
    }, []);

    const analyseData = async () => {
        if (probName === "") {
            window.alert("Please select Problem");
        }
        else {
            console.log(probName);
            const response = await axios.post(`${URL}/data/analyse`, { "PROB_NAME": probName })
            console.log(response.data);
            setPerfResults(response.data)
        }
    }

    return (
        <div className={classes.root}>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Problem</InputLabel>
                        <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            value={probName}
                            label="Problem"
                            style={{ marginBottom: "20px" }}
                            onChange={handleChange}
                        >
                            {allProb.map((prob) => (
                                <MenuItem value={prob}>{prob}</MenuItem>
                            ))}
                        </Select>
                        <Button
                            style={{ fontFamily: "Poppins" }}
                            className={classes.formBtn}
                            onClick={analyseData}
                            variant="contained">
                            Analyse
                        </Button>
                    </FormControl>
                </Box>
                <br />
                {
                    perfResults.length > 0 ? (
                        <Typography
                            variant='h6'
                            className={classes.txtfield}
                            style={{ fontFamily: "Poppins" }}>
                            Please find below the best performance details
                        </Typography>) : <></>

                }
                <br />
                {
                    perfResults.map((result) => (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <Typography
                                    style={{ fontFamily: "Poppins" }}>
                                    Problem Name : {probName}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography
                                    style={{ fontFamily: "Poppins" }}>
                                    Machine Name : {result["MACHINE"]}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography
                                    style={{ fontFamily: "Poppins" }}>
                                    Group ID : {result["GROUP_NO"]}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography
                                    style={{ fontFamily: "Poppins" }}>
                                    Run-time : {result["TOTAL_TIME"]}
                                </Typography>
                            </ListItem>
                        </List>
                    ))
                }
            </Grid>
        </div>
    )
}

export default Analyse