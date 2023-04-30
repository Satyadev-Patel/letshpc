import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import { InputLabel, MenuItem, Box, FormControl, Button, Grid, ListItem, Typography, List } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { common } from '@mui/material/colors';

const URL = process.env.REACT_APP_URL;
const AnalyseParallel = () => {
    const classes = useStyles();
    const [probName, setProbName] = useState("");
    const [allProb, setAllProb] = useState([]);
    const [cores, setCores] = useState();
    const [size, setSize] = useState();
    const [groupsSpeedUp, setGroupsSpeedUp] = useState([]);
    const [speedUp, setSpeedUp] = useState([]);
    const allSize = [...Array(27).keys()]
    const handleChange = (e) => {
        setProbName(e.target.value);
    };

    var state1 = {

        series: [{
            data: speedUp
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
                enabled: true,
                style: {
                    colors: ["#000"]
                }
            },
            title: {
                text: "PERFORMANCE CHART"
            },
            xaxis: {
                categories: groupsSpeedUp,
                title: {
                    text: "Speedup",
                    style: {
                        fontSize: '20px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
            },
            yaxis: {
                title: {
                    text: "Group Number",
                    style: {
                        fontSize: '20px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                labels: {
                    maxWidth: 250
                }
            }
        },
    };
    useEffect(() => {
        axios.post(`${URL}/data/allproblemsparallel`)
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
            const response = await axios.post(`${URL}/data/analyseparallel`, { "probName": probName, "size": size, "cores": cores })
            console.log(response.data);
            var tempGroup = []
            var tempSpeedUp = []
            response.data.speedup.forEach(element => {
                tempGroup.push(element.group)
                tempSpeedUp.push(element.speedup)
            });
            setGroupsSpeedUp(tempGroup);
            setSpeedUp(tempSpeedUp);
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
                                style={{ width: "100px", marginRight: "20px" }}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {allSize.map((size) => (
                                    <MenuItem value={size}>{size}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth>

                            <InputLabel id="size-label">Cores</InputLabel>
                            <Select
                                labelId="cores-label"
                                id="demo-simple-select"
                                value={cores || ''}
                                label="Cores"
                                style={{ width: "100px" }}
                                onChange={(e) => setCores(e.target.value)}
                            >
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="8">8</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                                <MenuItem value="16">16</MenuItem>
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
                <ReactApexChart options={state1.options}
                    series={state1.series} type="bar" height={1000} width={1200} />
            </Grid>
        </div>
    )
}

export default AnalyseParallel