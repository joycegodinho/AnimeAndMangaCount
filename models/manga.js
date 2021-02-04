const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mangaSchema = new Schema({
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

module.exports = mongoose.model('mangaModel', mangaSchema);