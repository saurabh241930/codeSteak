var express = require('express');
var Blog = require('../models/blog');
var User = require('../models/user');
var Post = require('../models/post');
var router = express.Router();


router.post('/blogs/:id/subscribe',isLoggedIn,function(req,res){
  
//     User.findById(req.params.id, function(err,user){
//       if (err) {
//          console.log(err);
//       } else {
//         var Class = {
//           classname:req.blog.title
//         }
//         user.registeredClasses.push(Class);
//         user.save();
//        res.redirect('/blogs/' + blog._id);
//       }  
//        Profile.findById(req.params.id, function(err,info){
//        if (err) {
//        console.log(err); 
//         } else {
         
// //          var Information = {
// //                id: blog._id,
// //           classname:blog.title
// //          }
         
//          var name = req.user.username;
         
// //          info.registeredClasses.push(Information);
//           info.username.push(name);
//           info.save();
//        }
//      })
  
//     })

  
  
  
  
  
  
  
  
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
        
        }
 })
      
      
      
      
      //adding student names to classes
 var  Student = {
    id: req.user._id,
    username: req.user.username
 }
 

      blog.registeredUsers.push(Student);
      blog.save();
       res.redirect('/blogs/' + blog._id);
    }
    })
  
   
  
//  User.findById(req.params.id, function(err,user){
//    if (err) {
//       console.log(err);
//       //redirect to blog
//     } else {
//     var Class = {
//     id: blog._id,
//     classname:blog.title
//   } 
   
//     user.registeredClasses.push(Class);
//     user.save();
  
//     }
//  })   
  
  
  
  
  
  
});











function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


module.exports = router;