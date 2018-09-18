var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CommentsSchema = new Schema ({
    user : {
        type: Schema.Types.ObjectId,
        ref : "users"
    },

    body : {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('comments', CommentsSchema);