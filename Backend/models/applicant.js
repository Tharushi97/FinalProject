const mongoose = require('mongoose');


//Applicant schema

const applicantSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,

    },
    mobile: {
        type: String,
    },
    nic: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    expectedSalary: {
        type: Number,
    },
    availability: {
        type: String,
    },
    priority: {
        type: String,
    },
    referral: {
        type: String,
    },
    interviewerComments: [],
    interviewPoints: Number,
    writtenResults: [],
    currentSalary: String,
    offeredSalary: String,
    interviewScope: {
        type: String,
    },

    textResult: {
        type: String,
    },

    salaryDetails: {
        type: String,
    },

    notes: [],
    rates: {
        type: String,
    },
    evaluated: {
        type: Boolean
    },
    cv: {
        type: String
    },
    rate: {
        type: Number
    },
    cvDoc: {
        type: String
    },
    shortlisted: Boolean,
    interviewSheduled: Boolean,
    positionId: { type: String },
    selected: { type: Boolean }












});

const User = module.exports = mongoose.model('applicant', applicantSchema);