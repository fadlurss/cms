var express    = require('express');
    router     = express.Router();
    Posts      = require('../../models/posts');


    router.get('/', (req,res)=>{
        Posts.find({}, (err, result_posts)=>{
            res.render('v_admin/posts', {result_posts : result_posts});
        });
    });

    router.get("/create", (req,res)=>{
        res.render("v_admin/posts/create");
    });

    router.post("/create", (req,res)=>{
        var allowComments = '';

        if(allowComments){ 
            allowComments = true;
        } else {
            allowComments = false;
        } 

       var newPosts = new Posts({
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            body: req.body.body
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


module.exports = router; 