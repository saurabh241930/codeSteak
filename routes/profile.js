var express = require('express');
var Blog = require('../models/blog');
var User = require('../models/user');

var router = express.Router();



router.get('/profile',isLoggedIn,function(req,res){

User.findById(req.user._id, function(err,founduser){
if (err) {
console.log(err);
} else {
res.render('profile',{user:founduser});
}
})
})


router.get('/profile/:username',isLoggedIn,function(req,res){

User.findOne({username:req.params.username}, function(err,founduser){
if (err) {
console.log(err);
} else {
res.render('profile',{user:founduser});
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
