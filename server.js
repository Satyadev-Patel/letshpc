const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const errors = require("restify-errors");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dotnev = require("dotenv");
const bodyParser = require("body-parser");

dotnev.config({ path: "./config/config.env" });

app.use(cors());

// Connection URL
const url = process.env.MONGO_URI;

// Database Name
const dbName = 'letshpc';

// Create a new MongoClient
const client = new MongoClient(url);

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

client.connect(
    console.log('Connected successfully to MongoDB')
)

const db = client.db(dbName);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/assignments/fetchall/", (req, res, next) => {
    try {
        const data = req.body;
        const collection = db.collection('assignments');
        // Sending all the chats of requested meeting
        collection.distinct("ass_name").then((ass) => {
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
        const collection = db.collection('assignments');
        // Sending all the chats of requested meeting
        collection.findOne({ ass_name: data["ASS_NAME"] }).then((ass) => {
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
        const collection = db.collection('serialData');
        // Sending all the chats of requested meeting
        collection.distinct("PROB_NAME").then((probs) => {
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

app.post("/data/store/", (req, res, next) => {
    try {
        const data = req.body;
        const collection = db.collection('serialData');
        // Sending all the chats of requested meeting
        collection.insertMany(data);
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
    server.use(express.static("client/build"))
}

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));