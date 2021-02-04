const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('userModel', userSchema);