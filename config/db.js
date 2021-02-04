const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/AnimeCount';

options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

module.exports = mongoose.connect(url, options)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Error connecting to database ' + err))