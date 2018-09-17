var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var CategoriesSchema = new Schema ({
    
    name : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('categories', CategoriesSchema);