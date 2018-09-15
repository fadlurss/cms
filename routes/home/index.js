var express    = require('express');
    router = express.Router();

router.get("/", ((req,res)=>{
    res.render("v_home");
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



module.exports = router; 