var express    = require('express');
    router = express.Router();
var faker = require('faker');
var Categories = require('../../models/categories');


router.get("/", (req,res)=>{
    Categories.find({}, (err, categories)=>{
        res.render("v_admin/categories/index", {categories: categories});
    });
});

router.post('/create', (req,res)=>{ 
    var newCategories = new Categories({
        name : req.body.name
    });

    newCategories.save();
    res.redirect("/admin/categories");
}); 

router.get('/edit/:id', (req,res)=>{ 
    Categories.findById(req.params.id, (err, edit_categories)=>{
        res.render('v_admin/categories/edit', {edit_categories: edit_categories}); 
    });
}); 

router.put("/edit/:id", (req,res)=>{
    var name = req.body.name;
    var updateCategories = {name : name};
    
    Categories.findByIdAndUpdate(req.params.id, updateCategories, (err, update_categories)=>{
        if(err){
            res.redirect("/admin/categories");
            console.log(err);
        } else {
            req.flash('success', `Post ${req.body.name} was succesfully updated`);
            res.redirect("/admin/categories");
            
        }
    });
});

router.delete('/:id', (req,res)=>{ 
    Categories.findByIdAndRemove(req.params.id, (err)=>{
        res.redirect('/admin/categories'); 
    });
}); 


module.exports = router;