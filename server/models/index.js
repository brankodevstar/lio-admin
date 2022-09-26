const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(process.env.MONGODB_URI || config.mongoURI);

mongoose.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

mongoose.connection.on('error', err => {
    console.log('Mongoose Default Connection Error : ' + err);
});