var moment = require('moment');

module.exports = {
    select: function(selected, options){
        console.log('works');
    },

    generateTime: function(date, format){
        return moment(date).format(format);
    }
}
