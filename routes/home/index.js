var express    = require('express');
    router = express.Router();

router.get("/", ((req,res)=>{
    res.render("v_home");
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



module.exports = router; 