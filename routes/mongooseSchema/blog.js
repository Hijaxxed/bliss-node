var mongoose = require('mongoose');
 
var blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

var BlogPost = mongoose.model('BlogPost', blogSchema, 'BlogPosts');
 
module.exports = BlogPost;