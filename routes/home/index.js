var express    = require('express');
    router     = express.Router();
    Posts      = require('../../models/posts');

router.get("/", ((req,res)=>{
    
    Posts.find({}, (err, posts)=>{
        res.render("v_home", {posts : posts});
    });

    // req.session.test  = 'Test 1';
    // if(req.session.test){
    //     console.log(`We found ${req.session.test}`);
    // }
}));

router.get("/about", ((req,res)=>{
    res.render("v_home/about");
}));

router.get("/login", ((req,res)=>{
    res.render("v_home/login");
}));

router.get("/register", ((req,res)=>{
    res.render("v_home/register");
}));

router.get("/posts/:id", (req,res)=>{
    Posts.findById(req.params.id, (err, posts)=>{
        res.render("v_home/post", {posts: posts});
    });
});



module.exports = router; 