var express                 = require('express');
    app                     = express();
    path                    = require('path');
    expressLayouts          = require('express-ejs-layouts');
    home                    = require('./routes/home/index');
    admin                   = require('./routes/admin/index'); 
  
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + "/public")); 

app.use('/', home);
app.use('/admin', admin);

app.listen(3000, ()=> {
    console.log('Server cms has started!');
});