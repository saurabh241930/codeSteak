
var express = require('express');
var Blog = require('../models/blog');
var User = require('../models/user');
var Comment = require('../models/comment');
var router = express.Router();



////////////////////////COMMENT ROUTE///////////////////////////////////////
router.get('/blogs/:id/comments/new',isLoggedIn,function(req,res){
   Blog.findById(req.params.id,function(err,blog){
   if (err) {
    console.log(err);
  } else {
    res.render('comments/new',{blog:blog});
  }
 });

 });

////////////////////////////posting comments//////////////////////////////
router.post('/blogs/:id/comments',isLoggedIn,function(req,res){
  Blog.findById(req.params.id, function(err,blog){
    if (err) {
      console.log(err);
      //redirect to blog
    } else {
     Comment.create(req.body.comment,function(err,comment){
         if (err) {
      console.log(err);
      
    } else {
      //adding username and id to comment
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      //save comment
      comment.save();
      
      blog.comments.push(comment);
      blog.save();
   
      var ProjectCreaterID = blog.creater.id;
       var projectTitle = blog.title;
      var commentText = comment.text;
      
      User.findById(ProjectCreaterID,function(err,user){
        if (err) {
      console.log(err);
       } else {
       
     var commentNotification = 
                       {
                          id:req.user._id,
                    username:req.user.username,
                 Projectname:projectTitle,
                        Text:commentText
                       }
         
     
     
         user.CommentNotification.push(commentNotification);
         user.save();
         
       }
        
        
      })
      
    }
       
     })
   res.redirect('/blogs/' + blog._id);
    }
  });
});



//////////reply route//////////////////

router.post('/blogs/:id/comment/:id/reply',isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,blog){
    if (err) {
    throw err;
   } else {
     Comment.findById(req.params.id,function(err,comment){
    if (err) {
    throw err;
     } else {
 var Reply = {
            id:req.user._id,
            reply: req.body.reply,
            username:req.user.username
          }
      
      comment.replies.push(Reply);    
      comment.save();
    // 
     }
      })
     res.redirect("back")
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



