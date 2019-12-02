const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ctrlUser = require('../controllers/user.controller');
const passport = require('passport');

const jwtHelper = require('../helpers/jwthelper');

//user routes

const Applicant = require('../models/applicant');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quadrantz.dev@gmail.com',
        pass: '971521813'
    }
});

router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/test', ctrlUser.test);

module.exports = router;