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

    file : {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    },

    categories : {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    }
});

module.exports = mongoose.model('posts', PostsSchema);