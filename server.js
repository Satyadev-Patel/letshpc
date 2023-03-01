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
        res.send({msg:"DONE"});
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
})





const PORT = process.env.PORT || 7000;

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
      });
}

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));