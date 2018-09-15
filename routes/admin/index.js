var express    = require('express');
    router = express.Router();


    router.get('/', (req,res)=>{
        res.render('v_admin/index');
    });



module.exports = router; 