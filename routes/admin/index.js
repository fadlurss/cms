var express    = require('express');
    router = express.Router();

    router.all('/*', (req, res, next)=>{
        req.app.locals.layout = 'admin';
    });

    router.get('/', (req,res)=>{
        res.render('v_admin/index');
    });



module.exports = router; 