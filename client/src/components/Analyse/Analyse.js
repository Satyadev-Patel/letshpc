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
    const [probName, setProbName] = useState("");
    const [allProb, setAllProb] = useState([]);
    const [size, setSize] = useState();
    const [groups, setGroups] = useState([]);
    const [time, setTime] = useState([]);
    const allSize = [...Array(27).keys()]
    const handleChange = (e) => {
        setProbName(e.target.value);
    };

    var state = {

        series: [{
            data: time
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            title:{
                text: "PERFORMANCE CHART"
            },
            xaxis: {
                categories: groups,
                title:{
                    text: "Runtime(s)",
                    style: {
                        fontSize: '20px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
            },
            yaxis: {
                title:{
                    text: "Group Number",
                    style: {
                        fontSize: '20px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
            }
        },
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
        else if (size === "") {
            window.alert("Please select size");
        }
        else {
            // console.log(probName);
            const response = await axios.post(`${URL}/data/analyse`, { "probName": probName, "size": size })
            console.log(response.data);
            var tempGroup = []
            var tempTime = []
            response.data.combined.forEach(element => {
                tempGroup.push(element.group)
                tempTime.push(element.time)
            });
            setGroups(tempGroup);
            setTime(tempTime);
            console.log(state);
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
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Problem</InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                value={probName || ''}
                                label="Problem"
                                style={{ marginRight: "20px" }}
                                onChange={handleChange}
                            >
                                {allProb.map((prob) => (
                                    <MenuItem value={prob}>{prob}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth>

                            <InputLabel id="size-label">Size</InputLabel>
                            <Select
                                labelId="size-label"
                                id="demo-simple-select"
                                value={size || ''}
                                label="Size"
                                style={{ width: "100px" }}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {allSize.map((size) => (
                                    <MenuItem value={size}>{size}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            style={{ fontFamily: "Poppins", marginLeft: "50px" }}
                            className={classes.formBtn}
                            onClick={analyseData}
                            variant="contained">
                            Analyse
                        </Button>
                    </Box>
                </Grid>
                <ReactApexChart options={state.options}
                    series={state.series} type="bar" height={500} width={1000} />
            </Grid>
        </div>
    )
}

export default Analyse