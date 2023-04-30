const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Chat Database

const ParallelData = new mongoose.Schema({
    ALG_TIME: String,
    GROUP_NO: String,
    MACHINE: String,
    PROB_NAME: String,
    PROB_SIZE: String,
    NUMBER_CORES: String,
    TOTAL_TIME: String,
    PERF: String,
    MEAN: String,
    STD: String,
}, { collection: 'parallelData' });

ParallelData.plugin(timestamp);
const parallelData = mongoose.model("ParallelData", ParallelData);
module.exports = parallelData;