import React from 'react'
import Papa from 'papaparse';
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { useStyles } from "./styles";
import Plot from 'react-plotly.js';

const Plotter = () => {
    const [data, setData] = useState([]);
    const [plotData, setPlotData] = useState(false);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [algy, setAlgY] = useState([]);
    const classes = useStyles();
    const handleUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
            },
        });
    };

    const visualize = () => {
        setX([]);
        setY([]);
        setAlgY([]);
        setPlotData(false);
        if (data.length === 0) {
            window.alert("Please upload data file");
        }
        else {
            setPlotData(true);
            for (let i = 0; i < data.length - 1; i++) {
                setX(x => ([...x, Math.log2(Number(data[i]["PROB_SIZE"]))]));
                // console.log(x);
            }
            data.map((point) => (
                setY(y => ([...y, Number(point["TOTAL_TIME"])]))
            ))
            data.map((point) => (
                setAlgY(algy => ([...algy, Number(point["ALG_TIME"])]))
            ))
            console.log(x, y);
        }
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.grid}
            >
                <Box sx={{ minWidth: 200 }}>
                    <TextField
                        className={classes.txtfield}
                        onChange={handleUpload}
                        inputProps={{ type: 'file' }} />
                    <Button
                        className={classes.formBtn}
                        onClick={visualize}
                        variant="contained">
                        Plot Data
                    </Button>
                </Box>
                {
                    data.length > 0 && plotData ? (
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.grid}
                        >
                            <Box style={{ margin: "20px" }}>
                                <Plot
                                    data={[
                                        {
                                            x: x,
                                            y: y,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                    ]}
                                    layout={{
                                        width: 600, height: 450, title: 'Problem size vs Total Runtime',
                                        xaxis: { title: "Problem Size" }, yaxis: { title: "Total Time" }
                                    }}
                                    config={{ scrollZoom: true }} />
                            </Box>
                        </Grid>
                    ) : <></>
                }
            </Grid>
        </div>
    )
}

export default Plotter