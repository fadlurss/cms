var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UsersSchema = new Schema ({
    
    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true
    },

    password : {
        type: String,
        required: true
    }
});

UsersSchema.methods.testMethod = function(){
    console.log('using schema method');
}

module.exports = mongoose.model('users', UsersSchema);