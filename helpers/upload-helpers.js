var path  = require('path');

module.exports = {    
    uploadDir : path.join(__dirname, '../public/uploads/'),

    isEmpty: function(obj){
        for (var key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }
};  