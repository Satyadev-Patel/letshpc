const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Chat Database

const Assignments = new mongoose.Schema({
    ass_name: String,
    expected_output: String,
    problem_input: String,
    problem_statement: String,
}, { collection: 'assignments' });

Assignments.plugin(timestamp);
const assignments = mongoose.model("Assignments", Assignments);
module.exports = assignments;