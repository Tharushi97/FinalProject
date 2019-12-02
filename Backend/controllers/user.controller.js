const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');


module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    console.log('called auth')
    passport.authenticate('local', (err, user, info) => {
        console.log(user)
        console.log(err)
            // error from passport middleware

        if (user) return res.status(200).json({ "token": user.generateJwt() });

        else if (err)
            return res.status(400).json(err);
        // registered use
        // unknown user or wrong password
        else return res.status(404).json(info);


    })(req, res);
}

module.exports.test = (req, res, next) => {
    res.status(200).json({ test: 'hello' });
}


//user profile
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['userName', 'email']) });
        }
    );
}