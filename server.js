const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const dotnev = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const serialData = require("./Models/SerialData.js")
const assignments = require("./Models/Assignments.js")
const passport = require("passport");

const path = require("path");

dotnev.config({ path: "./config/config.env" });

app.use(cors());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, PUT, POST, DELETE, PATCH"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
const session = require('express-session');
app.use(session({
    secret: "HELLO",
    resave: true,
    saveUninitialized: true
}));
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/assignments/fetchall/", (req, res, next) => {
    try {
        const data = req.body;
        // Sending all the chats of requested meeting
        assignments.distinct("ass_name").then((ass) => {
            const obj = {
                msg: "success",
                allAssignments: ass,
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

app.post("/data/analyse", (req, res, next) => {
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
                combinedMean.push({ group: element.MACHINE + " Group " + element.GROUP_NO, mean: 0.8*parseFloat(element.MEAN) + 0.2*parseFloat(element.STD) });
            });
            row.forEach(element => {
                combinedStd.push({ group: element.MACHINE + " Group " + element.GROUP_NO, std: parseFloat(element.STD) });
            });
            combinedTime.sort((a, b) => a.time - b.time);
            combinedMean.sort((a, b) => a.mean - b.mean);
            combinedStd.sort((a, b) => a.std - b.std);
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

app.post("/assignments/fetchone/", (req, res, next) => {
    try {
        const data = req.body;
        assignments.findOne({ ass_name: data["ASS_NAME"] }).then((ass) => {
            const obj = {
                msg: "success",
                assignment: ass,
            };
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

app.post("/data/allproblems/", (req, res, next) => {
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

connectDB();

app.post("/data/store/", (req, res, next) => {
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

app.use("/users", require("./routes/users"));



const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
}

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));