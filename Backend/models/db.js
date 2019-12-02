const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('mongodb connected');
    } else {
        console.log('connection failed' + JSON.stringify(err, undefined, 2));
    }
});

require('./user');