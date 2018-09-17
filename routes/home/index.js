var express    = require('express');
    router     = express.Router();
    Posts      = require('../../models/posts');
    Categories = require('../../models/categories');


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

router.get("/posts/:id", (req,res)=>{
    Posts.findById(req.params.id, (err, posts)=>{
        Categories.find({}, (err, categories)=>{
            res.render("v_home/post", {posts: posts ,categories: categories});
        });
    });
});



module.exports = router; 