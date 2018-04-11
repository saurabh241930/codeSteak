
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Blog = require('../models/blog');
var Course = require('../models/course');
var passport = require('passport');
var User = require('../models/user');
var Post = require('../models/post');
var flash = require('connect-flash');
var multer = require('multer');     
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var cloudinary = require('cloudinary');



router.get('/',function(req,res){
  
//   User.findById(req.user._id,function(err,user){
//     if (err) {
//       console.log(err)
//     } else {
//       var FriendIdArray 
//     }
//   })
  
  res.redirect('/blogs');
});



router.get('/post/:id',function(req,res){
  
  Post.findById(req.params.id,function(err,post){
    if (err) {
      console.log(err)
    } else {
      res.render('post',{post:post});
    }
  })

});


/////////////IMAGE UPLOAD CONFIGURATION/////////////////////////////

 var upload = multer({ dest: './uploads/'});


 router.post('/imageUpload', upload.single('file'), function(req,res){
   
 User.findById(req.user._id,function(err,user){
   if (err) {
    console.log(err)
  } else {
    
    cloudinary.uploader.upload(req.file.path,
    function(result){
      
    user.ProfileImage = result.secure_url;
    user.save();
     res.redirect("/");

});
    
  }
 })  

 });










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const upload = multer({ dest: 'uploads/' })

// router.post('/file_upload', upload.single('file'), (req, res, next) => {
  
//    User.findById(req.user._id,function(err,user){
     
//      if (err) {
//       console.log(err)
//     } else {
      
      
//         var image = new Image ({
          
//          path: req.file.path,
//          filename: user.username
          
//         });
      
      
      
//       const encoded = req.file.toString('base64');
//       user.ImageProfile = encoded;
//       user.save();
//       res.render("temporary",{encoded:encoded,user:user});
//     }
     
//    })

  
// })


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// var upload = multer({ dest: '/tmp' });


// router.post('/file_upload', upload.single("file"), function (req, res) {
  
//   User.findById(req.user._id,function(err,user){
    
//     if (err) {
//       console.log(err)
//     } else {
      
//   var file = path.join(__dirname, '../ProfileImages', user.username + ".jpg");
      
      
//      fs.rename(req.file.path, file, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("back");
//         }

//     })
      
      
//     }
    
//   })
 
// })







//////////////////////////////////////////AUTH ROUTES////////////////////////////////////////
//register
router.get('/register',function(req,res){
  res.render('register');
});

//Sign Up logic
router.post('/register',function(req,res){
var newUser = new User ({username: req.body.username,
                         FavouriteColor: req.body.FavouriteColor,
                         ThemeColor: req.body.ThemeColor,
                         ProfileImage:req.body.ProfileImage});


User.register(newUser,req.body.password,function(err,user){
if (err) {
console.log(err);
return res.render('register');
} else {
passport.authenticate("local")(req,res,function(){
res.redirect('/blogs');
})
}

})

});


//////////////////////course routes///////////////////////////
router.get('/courses',function(req,res){
Course.find({},function(err,courses){
if (err) {
console.log(err);
} else {
res.render('courses',{courses:courses});
}
});
});


///////////lessons logic/////////////////
router.get('/courses/:id/',function(req,res){
Course.findById(req.params.id,function(err,foundcourse){
if (err) {
console.log(err);
} else {

res.render('chapters',{course:foundcourse});
}
});
});
////////////////////////////////////////////////////
router.get('/courses/:id/59f88c5545f8bc07035c1b74/',function(req,res){
res.render('lesson');

})

router.post('/courses/:id/59f88c5545f8bc07035c1b74/run',function(req,res){

var html = req.body.html;
var css = req.body.css;
var javascript = req.body.javascript;

res.render('run',{html,css,javascript});


})






router.get('/userProfile',function(req,res){
res.render('userProfile');
})






/////////////////////Login route///////////////////////////
router.get('/login',function(req,res){
res.render('login');
});

router.post('/login',passport.authenticate("local",
{successRedirect: "/blogs",
failureRedirect: "/login"
}),function(req,res){

//   User.findById(req.user._id,function(err,user){
//     if (err) {
//       console.log(err);
//     } else {
//       user.Visited++;
//       user.save();
//     }
//   })
  
  
});




////////////////////Logout Route/////////////////////////
router.get('/logout',function(req,res){
req.logout();
res.redirect('/blogs');
});






// db.users.find({username:"chirag"},{messages: { $elemMatch: { User: "developer2" } }}).pretty()




////////////////Sending message//////////////////
// router.post('/profile/chat/:username/:id/send',isLoggedIn,function(req,res){


// User.update({username:req.user.username},
// {
// $addToSet:{
// "messages":{
// User:req.params.username,
// id:req.params.id
// }
// }
// }, 
// function(err,user) {
// if (err) {
// throw err;
// } else {
  
  
  
//   User.update({username:req.params.username},
// {
// $addToSet:{
// "messages":{
// User:req.user.username,
// id:req.user._id
// }
// }
// }, 
// function(err,user) {
// if (err) {
// throw err;
// } else {
// console.log("Debugg Point 1");

// User.findOneAndUpdate({username:req.user.username,"messages.id":req.params.id},
// {$push:
// {"messages.$.texts":

// {
// message:req.body.message,
// username:req.user.username
// }
             
// }
// },function(err,user){
// if (err) {
// throw err;
// } else {
  
//   User.findOneAndUpdate({username:req.params.username,"messages.id":req.user.id},
// {$push:
// {"messages.$.texts":

// {
// message:req.body.message,
// username:req.user.username
// }
             
// }
// },function(err,user){
// if (err) {
// throw err;
// } else {
  
//  console.log("Debugg Point 1"); 
  
// }
// })   
// console.log("Debugg Point 2");
// res.redirect("back");
// }
// })
  
// }
//   })   
  
  
// }
// }
// )            
// })






/////////////////////////Checking duplication//////////////////////////////////////////

function checkDuplication(req,res,next) {
if (req.isAuthenticated()) {                                                 // is user logged in?

User.findById(req.params.id,function(err,foundUser){
if (err) {
res.redirect('back');
console.log(err);
} else {

if (foundUser.friendRequest.some((fr) => fr.id.toString() === req.user._id.toString())) {
console.log("you are already in his friends list ");
res.redirect("back");
} else {
next();
}
}}
)}
}

  
////////////Check duplication for multiple acceptance/////////////////
function checkDuplicationTwo(req,res,next) {
if (req.isAuthenticated()) {                                                 // is user logged in?

User.findById(req.user._id,function(err,foundUser){
if (err) {
res.redirect('back');
console.log(err);
} else {


if (foundUser.friends.some((fr) => fr.username.toString() === req.params.username.toString())) {
console.log("Already added ");
res.redirect("back");
} else {
next();
}
}}
)}
}














////////////////// #### FUNCTION ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error","You must be logged in to do that");
    res.redirect('/login');
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
     module.exports = router;                                              
                                                   