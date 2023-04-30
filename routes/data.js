const express = require("express");
const serialData = require("../Models/SerialData");
const parallelData = require("../Models/ParallelData");
const errors = require("restify-errors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const dotnev = require("dotenv");

// Load Config
dotnev.config({ path: "./config/config.env" });

router.post("/storeserial", (req, res, next) => {
    try {
        const data = req.body;
        // Sending all the chats of requested meeting
        serialData.insertMany(data);
        res.send({ msg: "DONE" });
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

router.post("/storeparallel", (req, res, next) => {
    try {
        const data = req.body;
        // Sending all the chats of requested meeting
        parallelData.insertMany(data);
        res.send({ msg: "DONE" });
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

router.post("/allproblems", (req, res, next) => {
    try {
        const data = req.body;
        // Sending all the chats of requested meeting
        serialData.distinct("PROB_NAME").then((probs) => {
            probs.shift();
            const obj = {
                msg: "success",
                data: probs,
            };
            console.log(obj)
            res.send(obj);
            next();
        });
        // res.send({msg:"DONE"});
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

router.post("/allproblemsparallel", (req, res, next) => {
    try {
        const data = req.body;
        // Sending all the chats of requested meeting
        parallelData.distinct("PROB_NAME").then((probs) => {
            // probs.shift();
            const obj = {
                msg: "success",
                data: probs,
            };
            console.log(obj)
            res.send(obj);
            next();
        });
        // res.send({msg:"DONE"});
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

router.post("/analyse", (req, res, next) => {
    try {
        const data = req.body;
        const size = data.size;
        var tempSize = parseInt(size)
        tempSize = Math.pow(2, tempSize);
        tempSize = tempSize.toString();
        const probName = data.probName
        console.log(tempSize);
        const combinedTime = [];
        const combinedMean = [];
        const combinedStd = [];
        serialData.find({ PROB_NAME: probName, PROB_SIZE: tempSize }).then((row) => {
            // const groups = [];
            // const time = [];
            row.forEach(element => {
                combinedTime.push({ group: element.MACHINE + " Group " + element.GROUP_NO, time: parseFloat(element.TOTAL_TIME) });
            });
            row.forEach(element => {
                combinedMean.push({ group: element.MACHINE + " Group " + element.GROUP_NO, mean: 0.8 * parseFloat(element.MEAN) + 0.2 * parseFloat(element.STD) });
            });
            row.forEach(element => {
                combinedStd.push({ group: element.MACHINE + " Group " + element.GROUP_NO, std: parseFloat(element.STD) });
            });
            combinedTime.sort((a, b) => a.time - b.time);
            combinedMean.sort((a, b) => a.mean - b.mean);
            combinedStd.sort((a, b) => a.std - b.std);
            console.log(combinedMean)
            const obj = {
                message: "success",
                combinedTime: combinedTime,
                combinedMean: combinedMean,
                combinedStd: combinedStd
            }
            res.send(obj);
            next();
        })
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

router.post("/analyseparallel", async (req, res, next) => {
    try {
        const data = req.body;
        const size = data.size;
        var tempSize = parseInt(size)
        tempSize = Math.pow(2, tempSize);
        tempSize = tempSize.toString();
        const probName = data.probName;
        const cores = data.cores;
        console.log(cores);
        const combinedTime = [];
        const speedup = [];
        const serial = [];
        const x = await parallelData.find({ PROB_NAME: [probName,probName.toUpperCase()], PROB_SIZE: tempSize, NUMBER_CORES: "0", MACHINE: ["Intel(R) Xeon(R) CPU E5-2640 v3 @ 2.60GHz","CLUSTER"] }).then((results) => {
            results.forEach(row => {
                serial.push({group: row.GROUP_NO, time : parseFloat(row.TOTAL_TIME)})
            })
        })
        parallelData.find({ PROB_NAME: [probName,probName.toUpperCase()], PROB_SIZE: tempSize, NUMBER_CORES: cores, MACHINE: ["Intel(R) Xeon(R) CPU E5-2640 v3 @ 2.60GHz","CLUSTER"] }).then((row) => {
            // const groups = [];
            // const time = [];
            // console.log(row)
            row.forEach(element => {
                const serialTime = serial.find(o => o.group === element.GROUP_NO)
                // console.log(serialTime)
                speedup.push({group: element.MACHINE + " Group " + element.GROUP_NO, speedup: serialTime.time/parseFloat(element.TOTAL_TIME)})
                combinedTime.push({ group: element.MACHINE + " Group " + element.GROUP_NO, time: parseFloat(element.TOTAL_TIME) });
            });
            combinedTime.sort((a, b) => b.time - a.time);
            speedup.sort((a, b) => b.speedup - a.speedup);
            const obj = {
                message: "success",
                combinedTime: combinedTime,
                speedup: speedup
            }
            res.send(obj);
            next();
        })
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})

module.exports = router;