import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import { InputLabel, MenuItem, Box, FormControl, Button, Grid, Card, Typography, List, CardContent } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import ProblemCard from './ProblemCard';

const Assignments = () => {
    const classes = useStyles();
    const [assignments, setAssignments] = useState([])
    const [taskName, setTaskName] = useState("");
    const [prob, setProb] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    useEffect(() => {
        axios.post('https://letshpc2.herokuapp.com/assignments/fetchall')
            .then(res => setAssignments(res.data["allAssignments"]))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setInput("");
        setTaskName(e.target.value);
        setProb("");
        setOutput("");
    };

    const loadAssignment = async () => {
        if (taskName === "") {
            window.alert("Please select Assignment");
        }
        else {
            console.log(taskName);
            const response = await axios.post('http://localhost:7000/assignments/fetchone', { "ASS_NAME": taskName })
            setProb(response.data["assignment"]["problem_statement"]);
            setInput(response.data["assignment"]["problem_input"]);
            setOutput(response.data["assignment"]["expected_output"]);
        }
    }

    return (
        <div className={classes.root} style={{ fontFamily: "Poppins" }}>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{ minWidth: 200, margin:"40px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Assignment</InputLabel>
                        <Select
                            value={taskName}
                            label="Assignment"
                            style={{ marginBottom: "20px" }}
                            onChange={handleChange}
                            defaultValue=""
                        >
                            {assignments.map((ass) => (
                                <MenuItem value={ass}>{ass}</MenuItem>
                            ))}
                        </Select>
                        <Button
                            style={{ fontFamily: "Poppins" }}
                            className={classes.formBtn}
                            onClick={loadAssignment}
                            variant="contained">
                            LOAD
                        </Button>
                    </FormControl>
                </Box>
                <Box>
                    <ProblemCard head="Problem Statement" body={prob}/>
                    <ProblemCard head="Input Instructions" body={input}/>
                    <ProblemCard head="Expected Output" body={output}/>
                </Box>
            </Grid>
        </div>
    )
}

export default Assignments