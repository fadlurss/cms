var express    = require('express');
    router     = express.Router();
    Posts      = require('../../models/posts');
    fs         = require('fs');
var {isEmpty, uploadDir}  = require('../../helpers/upload-helpers');


    router.get('/', (req,res)=>{
        Posts.find({}, (err, result_posts)=>{
            res.render('v_admin/posts', {result_posts : result_posts});
        });
    });

    router.get("/create", (req,res)=>{
        res.render("v_admin/posts/create");
    });

    router.post("/create", (req,res)=>{

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
            body: req.body.body,
            file: filename
       });

       newPosts.save();
       res.redirect("/admin/posts");
    });

    router.get("/edit/:id", (req,res)=>{
        Posts.findById(req.params.id, (err, edit_posts)=>{
            if(err){
                res.redirect("/admin/posts");
                console.log(err);
            } else {
                res.render("v_admin/posts/edit", {edit_posts: edit_posts});
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
        
        var updatePosts = {title : title, status : status, allowComments : allowComments, body : body};
        Posts.findByIdAndUpdate(req.params.id, updatePosts, function(err, update_posts){
            console.log("HASILNYA "+update_posts);
            if(err){
                res.redirect("/admin/posts");
                console.log(err);
            } else {
                res.redirect("/admin/posts");
                
            }
        });
    });

    router.delete("/:id", (req, res)=>{
        // Posts.findOne(req.params.id, function(err, post){
           
        //         fs.unlink(uploadDir + post.file, (err)=>{
        //             post.remove();
        //             res.redirect("/admin/posts");
        //         });

        Posts.findOne({_id: req.params.id}).then( post=>{
                fs.unlink(uploadDir + post.file, (err)=>{
                    post.remove();
                    res.redirect("/admin/posts");
                });
        });
    });


    


module.exports = router; 