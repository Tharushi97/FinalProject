
var express = require("express");
var Employee = require('../models/employee.model');
var _ = require('lodash');
var request = require('request');
nodeMailer = require("nodemailer");
bodyParser = require("body-parser");
app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.employee_details = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        // if (err) return next(err);
        res.send(employee);
    });
};

exports.employees_details = function (req, res) {
    Employee.find(req.params.id, function (err, employee) {
        if (err) return next(err);
        res.send(employee);
    });
};



exports.employee_updatePerson = function (req, res, next) {
    Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
        err,
        employee
    ) {
        if (err) return next(err);
        res.send("Employee udpated.");
    });
};

exports.employee_update = function (req, res, next) {
    Employee.updateOne(
        { _id: req.params.id },
        { $set: { title: "Interview Scheduled" } },
        function (err, employee) {
            if (err) return next(err);
            res.send("Employee updated.");
        }
    );
};

exports.employee_delete = function (req, res) {
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send("Deleted successfully!");
    });
};

exports.employee_send = function (req, res) {
    // let email = JSON.stringify(`http://${req.headers.host}/employee/${req.params.id}/confirm/`)
    let confirm = JSON.stringify(`http://${req.headers.host}/employee/${req.params.id}/confirm/`)
    let cancel = JSON.stringify(`http://${req.headers.host}/employee/${req.params.id}/cancel-confirm/`)
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "nadee.project@gmail.com",
            pass: "nadee1234"
        }
    });

    let mailOptions = {
        from: "nadee.project@gmail.com", // sender address
        to: req.params.email, // list of receivers
        subject: "confirmation", // Subject line
        text: "Regarding job application that you send", // plain text body
        html: `Dear Applicant,<br/>
    Thank you for your interest in this job. We have reviewed your application and we glad to inform you that it has been selected for first round interview.
    </br>
    <h2>Confirm Your Participation ${req.params.date}</h2> 
    <a href=${confirm}><button>Yes</button></a>
    <a href=${cancel}><button>No</button></a><br/>
  If you have any issues regarding this date, cancelled confirmation and immediately   cantact below person.</br>
    Mrs. Senavirathne  -  0715674836  /  0114567634 <br/>
    Thankyou!` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        res.json({ msg: "index" });
    });
};

exports.employee_confirm = function (req, res) {
    Employee.updateOne(
        { _id: req.params.id },
        { $set: { confirm: "Confirm Date" } },
        function (err, employee) {
            if (err) return next(err);
            res.send("confirmed date.");
        }
    );
}

exports.employee_cancelConfirm = function (req, res) {
    Employee.updateOne(
        { _id: req.params.id },
        {
            $set: {
                confirm: "Cancel Date",
                interviewSheduled: false
            }
        },
        function (err, employee) {
            if (err) return next(err);
            res.send("Cancel date.");
        }
    );
}
// employee_updateEmail = (employeeArray) => {
//   console.log("sssssssssssssssss",employeeArray._id);
//   Employee.findByIdAndUpdate(employeeArray._id, { $set: employeeArray }, function(
//     err,
//     employee
//   ) {
//   });
// };


exports.employee_search = function (req, res) {
    Employee.findByIdAndSearch(req.params.id, function (err) {
        if (err) return next(err);
        res.send("Search successfully!");
    });
};

