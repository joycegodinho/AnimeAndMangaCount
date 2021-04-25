const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
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

module.exports = mongoose.model('wishModel', wishSchema);