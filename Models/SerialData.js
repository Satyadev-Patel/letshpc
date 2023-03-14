const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Chat Database

const SerialData = new mongoose.Schema({
    ALG_TIME: String,
    GROUP_NO: String,
    MACHINE: String,
    PROB_NAME: String,
    PROB_SIZE: String,
    TOTAL_TIME: String,
    PERF: String,
    MEAN: String,
    STD: String,
}, { collection: 'serialData' });

SerialData.plugin(timestamp);
const serialData = mongoose.model("SerialData", SerialData);
module.exports = serialData;