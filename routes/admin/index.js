var express    = require('express');
    router = express.Router();
    faker       = require('faker');
    Posts       = require('../../models/posts');
    var {userAuthenticated} = require('../../helpers/auth');


    router.get('/', userAuthenticated, (req,res)=>{
        res.render('v_admin/index');
    });

    router.post('/generate-fake-posts', (req,res)=>{
        for(var i=0; i<req.body.amount; i++){
           var post = new Posts (); 

           post.title = faker.name.title();
           post.status = 'public';
           post.allowComments = faker.random.boolean();
           post.body = faker.lorem.sentence();

            post.save(function(err){
                if(err){
                    console.log(err);
                }
            });
        };
        res.redirect('/admin/posts');
    });


module.exports = router; 