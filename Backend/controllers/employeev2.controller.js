const express = require('express');
const router = express.Router();
var cors = require('cors');
const nodemailer = require('nodemailer');
var Employee = require('../models/employee.model');

router.get('/getAllNonEvaluatedUsers', (req, res) => {

    Employee.find().where('evaluated', true).exec((err, data) => {

        if (err) {
            console.log("Applicant detail Retriving error " + err)
        } else {
            res.json(data)
        }
    })
})

router.put('/updateUserDetail/:id', (req, res) => {
    // console.log(req)
    Employee.findOneAndUpdate(

        { _id: req.params.id }, { $set: { interviewSheduled: true } },
    ).exec(
        (err, employee) => {
            if (err) {
                console.log("Employee cannot updated" + err)
            } else {
                console.log("Employee updated" + employee)
                res.json(employee)
            }
        }
    )
})

module.exports = router;