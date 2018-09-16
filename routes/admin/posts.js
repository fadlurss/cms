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
        Posts.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/admin/posts");
            } else {
                res.redirect("/admin/posts");
            }
        });
    });


    


module.exports = router; 