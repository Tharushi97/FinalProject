const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let applicantSchema = new Schema({
    firstname: { type: String },
    date: { type: String },
    email: { type: String, unique: true },
    rate: { type: Number },
    confirm: { type: String },
    // status: { type: String, default: "Not Status" },
    evaluated: { type: Boolean },
    interviewSheduled: { type: Boolean }

});

const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;