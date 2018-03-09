var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: String,
    age: Number,
    description: String,
    created: { 
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema, 'users');
 
module.exports = User;