
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Blog = require('../models/blog');
var Course = require('../models/course');
var passport = require('passport');
var User = require('../models/user');
var Profile = require('../models/profile');
var flash = require('connect-flash');



valueOf


/////////////////////////////////Following people///////////////////////////////

router.get("/follow/:id/:username",isLoggedIn,function(req,res){
  User.findById(req.user._id,function(err,primaryUser){
    if (err) {
      console.log(err);
    } else {
          
       User.findById(req.params.id,function(err,secondaryUser){
         
         if (err) {
          console.log(err);
        } else {
          
          
          if (primaryUser.following.some((User) => User.id.toString() === req.params.id.toString())) {
            
            console.log("you are already following ");
            res.redirect("back");
            
          } else {
            
           //////////////////
            var idealInfo = {
            id:req.params.id,
           username:req.params.username
      }
      
      primaryUser.following.push(idealInfo);
      primaryUser.save();
          
          
          var fanInfo = {
            id:req.user._id,
            username:req.user.username
          }
          
          
          
          
          secondaryUser.followers.push(fanInfo);
          secondaryUser.followingNotification.push(fanInfo);
          secondaryUser.ReputationScore =  secondaryUser.ReputationScore + 25;
          
          secondaryUser.save();
          
          res.redirect("back");
          /////////////////
              
          }
          
          
          
          
      
        }
       }) 
    }
  })
})









/////////////////////////////////Following people///////////////////////////////


/////////////////////finding people/////////////////
router.get('/people', isLoggedIn,function(req,res){
// User.find({}, function(err, users) {
User.find({}).sort({username: 1}).exec(function(err,users) {
if (err){ 
throw err;
} else {
res.render('people',{users:users})
}
})
})


//////////////////sending friend request///////////
router.post("/people/friendRequest/:id/:username",checkDuplication,function(req,res){

User.findById(req.params.id, function(err,user){
if (err) {
throw err;
} else {

  
  
  
// console.log(req.user._id);
// console.log(user.id);

var Request = {
id:req.user._id,
username: req.user.username,
requesterImage:req.user.ProfileImage
}

var Notification = {
  id:req.user._id,
  username: req.user.username
}


user.NewNotifications = true;
user.friendRequestNotification.push(Notification);
user.friendRequest.push(Request);
user.save();
  
  
  ///////////////////////Sending Notificatiion///////////////////////////
  
  
  
 User.findById(req.user._id,function(err,primaryuser){
   
   if (err) {
    console.log(err);
  } else {
       
    var YourRequest = {
        id:req.params.id,
        username: req.params.username
      }
    
    primaryuser.YourfriendRequestedNotification.push(YourRequest);
    primaryuser.save();
    
    
   res.redirect("back");
    }
   })
  }
 })
})


///////////////////////////////Displaying FRntification////////////////////////////
router.get('/FRnotifications',isLoggedIn,function(req,res){
  
 User.findById(req.user._id, function(err,founduser){
if (err) {
console.log(err);
} else {
  
   founduser.NewNotifications = false;
   founduser.save();
  
res.render('FRnotifications',{user:founduser});
}
})
    
})

////////////////////////////////////////////////////////////////////





//////////////////////Displaying Friend Request////////////////////////////////////

router.get('/friendrequest',isLoggedIn,function(req,res){


User.findById(req.user._id, function(err,founduser){
if (err) {
console.log(err);
} else {

res.render('friendrequest',{user:founduser});
}
})
})

/////////////////////////////////////////////////////////////////////////////







///////////////ACCEPT ROUTE ////////////////////

router.post('/accept/:id/:username',checkDuplicationTwo,function(req,res){

User.findOneAndUpdate({username:req.user.username,'friendRequest._id':req.params.id},
{$set:{'friendRequest.$.Status':'Friend','friendRequest.$.Color':'green'}},function(err,founduser){

if (err) {
throw err;
} else {

User.findOne({username:req.params.username},function(err,secondaryUser){

if (err) {
throw err;
} else {

  var RequestConfirmation = {
    username:req.user.username,
    friendImage:founduser.ProfileImage
  }
  
  secondaryUser.friends.push(RequestConfirmation);
  secondaryUser.save();
  
  
  User.findById(req.user._id,function(err,primaryUser){
    if (err) {
      console.log(err)
    } else {
      
       var RequestConfirmationPrimary = {
    username:secondaryUser.username,
    friendImage:secondaryUser.ProfileImage
  }
  
  primaryUser.friends.push(RequestConfirmationPrimary);
  primaryUser.save();
    }
  })
  
 

    
    
//////////////////////adding accept notification ////////////////////////
       
 
       
       
       var Accept = {
         id:req.user._id,
        username: req.user.username
       }
       
       founduser.NewNotifications = true;
       founduser.AcceptedfriendRequestedNotification.push(Accept);
       founduser.ReputationScore = founduser.ReputationScore + 5;
       founduser.save();
       
       res.redirect("back");
      }
    })  
   }
  }) 
 })  
 



////////////////////////////////////////////////////////////////////////


///////////////////////////Messaging box//////////////////////////////////////////////
router.get('/profile/chat/:username',isLoggedIn,function(req,res){
  
  
User.findOne({username:req.params.username},function(err,founduser){
if (err) {
throw err;
} else {
  
  // db.users.find({username:"chirag"},{messages: { $elemMatch: { User: "developer2" } }}).pretty()
  
// User.find({username:req.user.username},{messages: { $elemMatch: { User:req.params.username} }},function(err,data){
// if (err) {
// throw err;
// } else {
//   res.render("chat",{texts:data,user:founduser});
// }
// }) 
  
  User.findOne({username:req.user.username},{messages: { $elemMatch: { User:req.params.username} }},function(err,data){
if (err) {
throw err;
} else {
  
  var secondaryUsername = req.params.username;
  var primaryUsername = req.user.username;
  
  
  
  
  res.render("chat",{texts:data,user:founduser,notMyName:secondaryUsername,MyName:primaryUsername});
}
}) 
  
  
}
  
  
  
})
})


///////////////////////////////////Sending messages//////////////////////////////////////////////

router.post('/profile/chat/:username/:id/send',isLoggedIn,function(req,res){
  
  User.findById(req.user._id,function(err,primaryUser){
  if (err) {
      console.log(err);
 } else {
      
   
   
  /*If User (name) is present in collection then direct insert message 
   or else create new room then add messages*/
   
   
   
  if (primaryUser.messages.some((message) => message.id.toString() === req.params.id.toString())) {
      
       
 User.findOneAndUpdate({username:req.user.username,"messages.id":req.params.id},
{$push:
{"messages.$.texts":

{
message:req.body.message,
username:req.user.username
}
             
}
},function(err,user){
if (err) {
console.log(err);
} else {
  
 User.findOneAndUpdate({username:req.params.username,"messages.id":req.user.id},
{$push:
{"messages.$.texts":

{
message:req.body.message,
username:req.user.username
}
             
}
},function(err,user){
if (err) {
throw err;
} else {
  
 console.log("Debugg Point 3"); 
  
}
})   
console.log("Debugg Point 4");
res.redirect("back");
}
})
    
    
    
       
       
 }
   else {
     
   var primarySpace = {
     id:req.params.id,
     User:req.params.username
   }
    
   primaryUser.messages.push(primarySpace);
   primaryUser.save();
      
     
   User.findById(req.params.id,function(err,secondaryUser){
     if (err) {
      console.log(err);
    } else {
      
      
      
   var secondarySpace = {
     id:req.user._id,
     User:req.user.username
   }
     
  secondaryUser.messages.push(secondarySpace);
  secondaryUser.save();
      
      
User.findOneAndUpdate({username:req.user.username,"messages.id":req.params.id},
{$push:
{"messages.$.texts":

{
message:req.body.message,
username:req.user.username
}
             
}
},function(err,user){
if (err) {
throw err;
} else {
  
  User.findOneAndUpdate({username:req.params.username,"messages.id":req.user.id},
{$push:
{"messages.$.texts":

{
message:req.body.message,
username:req.user.username
}
             
}
},function(err,user){
if (err) {
throw err;
} else {
  
 console.log("Debugg Point 1"); 
  
}
})   
console.log("Debugg Point 2");
res.redirect("back");
}
})  
    }
   })    
  }    
    }
  })
  
})























/////////////////////////Checking duplication for sending multiple request//////////////////////////////////////////

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






    module.exports = router;  