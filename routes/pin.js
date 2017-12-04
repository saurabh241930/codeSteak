var express = require('express');
var Blog = require('../models/blog');
var User = require('../models/user');
var Profile = require('../models/profile');
var router = express.Router();



router.post('/blogs/:id/pin',isLoggedIn,function(req,res){
 
       Blog.findById(req.params.id, function(err,blog){
     if (err) {
       console.log(err);
       //redirect to blog
     } else {
  
       
       
      
   User.findById(req.user._id, function(err,user){
     
        if (err) {
           console.log(err);
        } else {
         
          var Class = {
            id:blog._id,
            classname: blog.title
          }
         
         
        
           user.registeredClasses.push(Class);
           user.save();
         res.redirect('/blogs/' + blog._id);
        }
 })
     } 
       })  
})
 

  
 

      

      
                    























function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


module.exports = router;