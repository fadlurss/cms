var express                 = require('express');
    app                     = express();
    path                    = require('path');
    mongoose                = require('mongoose');
    bodyParser              = require('body-parser');
    methodOverride          = require('method-override');
    expressLayouts          = require('express-ejs-layouts');
    session                 = require('express-session');
    flash                   = require('connect-flash');
    upload                  = require('express-fileupload');
    moment                  = require('moment');
    home                    = require('./routes/home/index');
    admin                   = require('./routes/admin/index'); 
    posts                   = require('./routes/admin/posts'); 
    categories              = require('./routes/admin/categories'); 
var {select, generateTime}  = require('./helpers/dynamic_select');
// mongoose.Promise = global.Promise;
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + "/public")); 
mongoose.connect('mongodb://localhost/cms', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(upload());
app.use(session({
    secret : "dfnjvn3245",
    resave : true,
    saveUninitialized : true
}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    app.locals.moment = require('moment');
    next();
});
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);

app.listen(3000, ()=> {
    console.log('Server cms has started!');
});