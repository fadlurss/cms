var express    = require('express');
    router     = express.Router();
    Posts      = require('../../models/posts');
    Categories = require('../../models/categories');
    fs         = require('fs');
var {userAuthenticated} = require('../../helpers/auth');
    
var {isEmpty, uploadDir}  = require('../../helpers/upload-helpers');


    router.get('/',userAuthenticated, (req,res)=>{
        Posts.find({}).populate("categories").exec(function(err, result_posts){
            res.render('v_admin/posts', {result_posts : result_posts});
        });
    });

    router.get("/create",userAuthenticated, (req,res)=>{
        Categories.find({}, (err, categories)=>{
            res.render("v_admin/posts/create", {categories: categories});
        });
        
    });

    router.post("/create",userAuthenticated, (req,res)=>{
        var errors   = [];
        if(!req.body.title){
            errors.push({message: 'please add a title'});
        }

        if(!req.body.status){
            errors.push({message: 'please add a status'});
        }

        if(!req.body.body){
            errors.push({message: 'please add a body'});
        }

        if(errors.length > 0 ){
            res.render('admin/posts/create', {erros: errors});
        } else {

            if(!isEmpty(req.files)){
                var file = req.files.file;
                var filename = Date.now() + '-' + file.name;
                file.mv('./public/uploads/' + filename, (err)=>{
                    if(err){
                        console.log(err);
                    }
                });
                console.log('is not empty');
            } else {
                console.log('is empty');
            }
    
            
            var allowComments = true;
    
            if(req.body.allowComments){ 
                allowComments = true;
            } else {
                allowComments = false;
            } 
    
           var newPosts = new Posts({
                title: req.body.title,
                status: req.body.status,
                allowComments: allowComments,
                categories : req.body.categories,
                body: req.body.body,
                file: filename
           });
    
           newPosts.save();
           req.flash('success', `Post ${req.body.title} was created succesfully`);
           res.redirect("/admin/posts");
        }

        
    });

    router.get("/edit/:id", (req,res)=>{
        Posts.findById(req.params.id, (err, edit_posts)=>{
            if(err){
                res.redirect("/admin/posts");
                console.log(err);
            } else {
                Categories.find({}, (err,categories)=>{
                    res.render("v_admin/posts/edit", {edit_posts: edit_posts, categories:categories});
                });
            }
        });
    }); 

    router.put('/edit/:id', (req,res)=>{
        if(req.body.allowComments){ 
            allowComments = true;
        } else {
            allowComments = false;
        } 

        var title = req.body.title;
        var status = req.body.status;
        var allowComments = allowComments;
        var body = req.body.body;
        var categories = req.body.categories;

        if(!isEmpty(req.files)){
            var file = req.files.file;
            var filename = Date.now() + '-' + file.name;
            var input_file = filename; //to db
            file.mv('./public/uploads/' + filename, (err)=>{
                if(err){
                    console.log(err);
                }
            });
            console.log('is not empty');
        } else {
            console.log('is empty');
        }

        
        var updatePosts = {title : title, categories: categories , status : status, allowComments : allowComments, body : body, file: input_file};
        Posts.findByIdAndUpdate(req.params.id, updatePosts, function(err, update_posts){
            // console.log("HASILNYA "+update_posts);
            if(err){
                res.redirect("/admin/posts");
                console.log(err);
            } else {
                req.flash('success', `Post ${req.body.title} was succesfully updated`);
                res.redirect("/admin/posts");
                
            }
        });
    });

    router.delete("/:id", (req, res)=>{
        Posts.findOne({_id: req.params.id}).then( post=>{
                fs.unlink(uploadDir + post.file, (err)=>{
                    post.remove();
                    req.flash('success', 'Post was successfully deleted');
                    res.redirect("/admin/posts");
                });
        });
    });


    


module.exports = router; 