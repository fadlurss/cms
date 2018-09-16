var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var PostsSchema = new Schema ({
    
    title : {
        type: String,
        required: true
    },
    status : {
        type: String,
        default: 'public'
    },
    allowComments : {
        type: Boolean,
        required: true
    },
    body : { 
        type: String,
        required: true
    },
});

module.exports = mongoose.model('posts', PostsSchema);