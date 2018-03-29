var express = require('express');
var Blog = require('../models/blog');
var User = require('../models/user');

var router = express.Router();



router.post('/blogs/:id/like',isLoggedIn,function(req,res){
  
  
     Blog.findById(req.params.id, function(err,blog){
    if (err) {
      console.log(err);
      //redirect to blog
    } else {
      
      
      if (blog.LikedUser.some((user) => user.id.toString() === req.user._id.toString())) {
        console.log("Nice Try");
        res.redirect("back");
        
      } else {
         var  UserThatLikedThePost = 
     {
                    id: req.user._id,
              username: req.user.username,  
     }
       
      
      blog.LikedUser.push(UserThatLikedThePost);
      blog.save();
        
        
        
        
     var createrID = blog.creater.id;
     var projectTitle = blog.title;  
       
        
        
      User.findById(createrID, function(err,secondaryUser){
        
        if (err) {
          console.log(err);
        } else {
          
          var Notification = 
              
              {
              id:req.user._id,
              username:req.user.username,
              Projectname:projectTitle
              }
          
          
          secondaryUser.BlogLikedNotification.push(Notification);
          secondaryUser.ReputationScore = secondaryUser.ReputationScore + 5;
          secondaryUser.save();
          
          
          res.redirect('/blogs/' + blog._id);
          
          
        }
        
        
      })
        
        
        
      
      
      }
      
      

      
      
      
      
      
      
      
      // User.findById(req.user._id, function(err,user){
  
//    Blog.findByIdAndUpdate(req.params.id,blog.likes,function(err,foundblog){
//     if (err) {
//       console.log(err);
//       //redirect to blog
//     } else {
   
//       blog.likes++;
//       blog.save();
     
      
//     }
//    })
      // }) 
      
    }
  
   })
  
  
  
  
  
  
  
  
  
})



///////////////////////Like Dupliation/////////////////////////////////////////////////////












































function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


module.exports = router;