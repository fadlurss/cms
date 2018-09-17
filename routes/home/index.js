var express    = require('express');
    router     = express.Router();
    bcrypt     = require('bcryptjs');
    Posts      = require('../../models/posts');
    Categories = require('../../models/categories');
    Users      = require('../../models/users');


    router.get("/", (req,res)=>{
        Posts.find({}, (err, posts)=>{
            Categories.find({}, (err, categories)=>{
                res.render("v_home/index", {posts: posts ,categories: categories});
            });
        });
    });

router.get("/about", ((req,res)=>{
    res.render("v_home/about");
}));

router.get("/login", ((req,res)=>{
    res.render("v_home/login");
}));

router.get("/register", ((req,res)=>{
    res.render("v_home/register");
}));

router.post('/register', (req,res)=>{ 

    var error   = [];


        if(!req.body.firstName){
            error.push({message: 'please add a firstName'});
        }

        if(!req.body.lastName){
            error.push({message: 'please add a lastName'});
        }

        if(!req.body.email){
            error.push({message: 'please add a email'});
        }

        if(!req.body.password){
            error.push({message: 'please add a password'});
        }

        if(!req.body.passwordConfirm){
            error.push({message: 'please add a confirm password'});
        }

        if(req.body.password !== req.body.passwordConfirm){
            error.push({message: "Password field don't match"});
        }

        if(error.length > 0 ){
            res.render('v_home/register', {
                error: error,
                firstName : req.body.firstName,
                lastName  : req.body.lastName,
                email     : req.body.email,
            });
        } 
        
        else {

            Users.findOne({email: req.email}).then(user=>{
                if(!user){
                    var newUsers = new Users({
                        firstName : req.body.firstName,
                        lastName  : req.body.lastName,
                        email     : req.body.email,
                        password  : req.body.password
        
                    });
        
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUsers.password, salt, (err,hash)=>{
        
                          newUsers.password = hash;
        
                            newUsers.save();
                            req.flash('success', 'You are now registered, please login');
                            res.redirect('/login'); 
        
                        });
                    });

                } else {
                    req.flash('error', 'That email exist please login');
                    res.redirect('/login');
                }
            });

            

           
        }
}); 

router.get("/posts/:id", (req,res)=>{
    Posts.findById(req.params.id, (err, posts)=>{
        Categories.find({}, (err, categories)=>{
            res.render("v_home/post", {posts: posts ,categories: categories});
        });
    });
});



module.exports = router; 