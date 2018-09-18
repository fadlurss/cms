var express    = require('express');
    router = express.Router();
    Posts  = require('../../models/posts');
    Comments  = require('../../models/comments');

    router.get('/', (req,res)=>{ 
        Comments.find({}).populate("user").exec(function(err, comments){ 
            res.render('v_admin/comments/index', {comments: comments}); 
            console.log(comments);
        });
    }); 

    router.post('/', (req,res)=>{ 
        Posts.findOne(req.body._id, (err, Posts)=>{    
            if(err){
                console.log(err);
            } else {
                console.log("id usernya "+req.user.id);
                var body = req.body.body;
                var user = req.user.id
                var newComment = {body: body, user: user};
                Comments.create(newComment, (err,new_comments)=>{
                    Posts.comments.push(new_comments);
                    Posts.save();
                    console.log(new_comments);
                    res.redirect('/posts/'+Posts._id); 
                });
            }
        });
    }); 

    // router.delete('/:id', (req,res)=>{ 
    //     Comments.findByIdAndRemove(req.params.id).then(deleteItem=>{
    //         res.redirect('/admin/comments'); 
    //     });
    // }); 
    router.delete('/:id', function(req, res){
        Comments.remove(req.params.id, function(err,hasil){
            res.send('sfsdfsdf');
        });
    });
    



    module.exports = router;