const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    number: {
        type: String,
    },
    content: {
        type: String,
      
    }
 },
 {
    timestamps: true
 }
);

module.exports = mongoose.model('animeModel', animeSchema);