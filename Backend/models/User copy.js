const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

const user = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    postalCode: {
        type: Number
    },
    about: {
        type: String
    },
    //accessLevel: {
    //type: Number
    //},
    rateCVs: {
        type: Boolean
    },
    sendMails: {
        type: Boolean
    },
    interview: {
        type: Boolean
    }
});

user.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

user.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        cb(null, isMatch);
    });
};




module.exports = User = mongoose.model('user', user);