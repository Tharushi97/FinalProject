const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const Applicant = require('../models/applicant');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quadrantz.dev@gmail.com',
        pass: '971521813'
    }
});

//insert form 1 data
router.post('/form1', (req, res) => {
    // console.log('error gggggggggd')
    const applicant = new Applicant({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        NIC: req.body.NIC,
        evaluated: false
    });

    applicant.save(function (err, applicant) {
        if (err) {
            console.log("Applicant form1  data storing error" + err);
        } else {
            console.log(applicant)
            res.status(200).json({
                applicant: applicant,
                state: true,
                msg: "successfuly stored form1 data "
            });

        }
    })

});

//insert form 2 data 
// router.put('/form2/:id', (req, res) => {

//     Applicant.findOneAndUpdate({ _id: req.params.id },
//         {
//             $set: {
//                 LinkIn: req.body.LinkIn,
//                 expectedSalary: req.body.expectedSalary,
//                 availability: req.body.availability,
//                 priority: req.body.priority,
//                 referral: req.body.referral
//             }
//         },
//         {
//             new: true
//         },
//         function (err, applicant) {
//             if (err) {

//                 res.send('form 2 data storing error');
//             }
//             else {
//                 res.status(200).json({
//                     applicant: applicant,
//                     state: true,
//                     msg: "successfuly stored form2 data "
//                 });
//             }
//         }
//     )
// });


// router.put('/updateUserApplication',(req,res)=>{

// })

// router.get('/getSpecificUser',(req,res)=>{
//     Applicant.findById({_id: req.params.id} ,
//         function(err,applicant){
//             if(err){
//                 res.send('Error in getting a user')
//             }else{
//                 res.status(200).json({
//                     applicant: applicant,
//                     state: true,
//                     msg: 'successfully retrieved data'
//                 })
//             }
//         })
// })

router.get('/getSpecificUser/:id', (req, res) => {
    Applicant.findById(req.params.id).exec(
        (err, applicant) => {
            if (err) {
                res.send('error in getting single user' + err)
            } else {
                res.json(applicant)
            }
        }
    )
})

router.put('/updateUserDetails', (req, res) => {
    Applicant.findByIdAndUpdate(req.body._id, {
        interviewerComments: req.body.interviewerComments,
        interviewPoints: req.body.interviewPoints,
        writtenResults: req.body.writtenResults,
        currentSalary: req.body.currentSalary,
        offeredSalary: req.body.offeredSalary,
        shortlisted: req.body.shortlisted,
        selected: req.body.selected
    },
        (err, applicant) => {
            if (err) {
                console.log("error in updating user")
            } else {
                res.json(applicant)
            }
        }
    )
})

router.put('/updateUserNotesDetails', (req, res) => {
    console.log(req.body)
    Applicant.findByIdAndUpdate(req.body._id, { notes: req.body.notes },
        (err, applicant) => {
            if (err) {
                console.log("error in updating notes" + err)
                res.send("error in updating notes" + err)
            } else {
                res.json(applicant)
            }
        })
})

//insert form 2 data 
router.put('/update/id/:id', (req, res) => {

    Applicant.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            interviewSheduled: req.body.interviewSheduled,
            shortlisted: req.body.shortlisted,
            linkedin: req.body.linkedin,
            expectedSalary: req.body.expectedSalary,
            availability: req.body.availability,
            priority: req.body.priority,
            referral: req.body.referral,
            evaluated: true,
            rate: req.body.rate
        }
    }, {
        new: true
    },
        function (err, applicant) {
            if (err) {

                res.send('form 2 data storing error');
            } else {

                sendEmail("quadrantz.dev@gmail.com", applicant.email, "Geveo Australisia Evaluation Process", "Your appliction is successfully evaluated", applicant);

                res.status(200).json({
                    applicant: applicant,
                    state: true,
                    msg: "successfuly stored form2 data "
                });
            }
        }
    )
});





//insert form 3 data
router.put('/form3/:id', (req, res) => {

    Applicant
        .findOneAndUpdate({ _id: req.params.id }, {
            $set: {

                interviewerComment: req.body.interviewerComment,
                interviewScope: req.body.interviewScope,
                textResult: req.body.textResult,
                salaryDetails: req.body.salaryDetails,
                rates: req.body.rates


            }
        },

            {
                new: true
            },
            function (err, applicant) {
                if (err) {

                    res.send('form 3 data storing error');
                } else {
                    res.status(200).json({
                        applicant: applicant,
                        state: true,
                        msg: "successfuly stored form3 data "
                    });
                }
            }

        )


});


// Get all Applicant details
router.get('/allApplicantDetails', (req, res) => {

    Applicant.find({})
        .exec(function (err, applicants) {
            if (err) {
                console.log("Applicant Detail Retriving error " + err)
            } else {
                res.json(applicants)
            }
        })
})

//count number of applicants
router.get('/countApplicants', (req, res) => {
    Applicant.find((err, applicants) => {
        var count = applicants.length
        if (!err) { res.json(count); }
        else { console.log('Error in retrieving count aplicants :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/countInterviews', (req, res) => {
    Applicant.find({ interviewSheduled: true }, (err, applicants) => {
        var count = applicants.length
        if (!err) { res.json(count); }
        else { console.log('Error in retrieving count interviews :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/countSelected', (req, res) => {
    Applicant.find({ selected: true }, (err, applicants) => {
        var count = applicants.length
        if (!err) { res.json(count); }
        else { console.log('Error in retrieving count selected :' + JSON.stringify(err, undefined, 2)); }
    });
});


// Get Paricular Applicant Details
router.get('/id/:id', (req, res) => {
    Applicant.findById(req.params.id)
        .exec(function (err, applicant) {
            if (err) {
                console.log("Applicant detail Retriving error " + err)
            } else {
                res.json(applicant)
            }
        })
})



// Get All Evaluated  Applicant Details
router.get('/getAllEvaluatedUsers', (req, res) => {

    Applicant.find().where('evaluated', true).exec((err, data) => {

        if (err) {
            console.log("Applicant detail Retriving error " + err)
        } else {
            res.json(data)
        }
    })
})


router.get('/getAllNonEvaluatedUsers', (req, res) => {

    Applicant.find().where('evaluated', !true).exec((err, data) => {

        if (err) {
            console.log("Applicant detail Retriving error " + err)
        } else {
            res.json(data)
        }
    })
})

router.delete('/deleteAllUsers', (req, res) => {

    Applicant.deleteMany().exec((err, ress) => {

        if (err) {
            console.log("Applicant detail deleting error " + err)
        } else {
            res.json(ress)
        }
    })
})


router.get('/sendMail', (req, res) => {

    let image_url = "https://previews.123rf.com/images/apinan/apinan1506/apinan150600029/41692219-business-email-marketing-connection-on-people-background-social-network-and-business-connection.jpg"
    let subject = "GCV Australia Confirmation"
    var mailOptions = {
        from: "bhagyafdo97@gmail.com",
        to: "ashanchandrasiri1@gmail.com",
        subject: "GCV Australia Confirmation",
        html: `
        <center><h3>${subject}</h3></center>
        <h4>Dear Ashan Chandrasiri,</h4>
        Your application is successfully referred.Furter information will e provided via email.
        <br><br>
        Thanks,
        <br>
        Team Geveo Australisia
        <br><br>
        <div style = \" background-image:url(${image_url})   \">
        
        
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json("error in sending email")
        } else {
            console.log('Email sent: ' + info.response);
            res.json('Email sent' + info.response)
        }
    });

})

async function sendEmail(from, to, subject, text, applicant) {
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: `
        <center><h3>${subject}</h3></center>
        <h4>Dear ${applicant.firstname} ${applicant.lastname},</h4>
        Your application is successfully referred.Furter information will e provided via email.
        <br><br>
        Thanks,
        <br>
        Team Geveo Australisia
        <br><br>
        
        `
    };

    try {

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('err: ' + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {

    }


}



router.get('/sample/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params.userId)
})


module.exports = router;