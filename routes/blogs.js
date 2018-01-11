var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var User = require('../models/user');
var methodOverride = require('method-override');
var multer = require('multer');     
var path = require('path');
var fs = require('fs');
var imageBase64 = require('image-base64');
var upload = multer({ dest: 'uploads/' });
var moment = require('moment');


//////////////////////INDEX ROUTE/////////////////////////////
router.get('/blogs',function(req,res){
//   console.log(req.user);
  Blog.find({}).sort({Views: -1}).limit(6).exec(function(err,blogs) {
    if (err) {
      console.log(err);
    } else {
      
      User.find({}).sort({ReputationScore: -1}).limit(6).exec(function(err,users) {
        
     if (err) {
      console.log(err);
    } else {
     
      res.render('blogs/index',{blogs:blogs,TopUsers:users});
      }
      })
    }
  });

});

//New ROUTE



router.get('/blogs/new',isLoggedIn,function(req,res){
  
  var css = "";
 var html = "";
   var javascript = "";
  
  
  res.render('blogs/new',{html,css,javascript});
});




 /////////////////////////CREATE ROUTE/////////////////////////
router.post('/blogs',isLoggedIn,function(req,res){
  //Create new blog
  var title = req.body.title;
  var image = req.body.image;
  var body = req.body.body;
  var html = req.body.html;
  var css = req.body.css;
  var javascript = req.body.javascript;
  
  var creater = {
    id: req.user._id,
    username: req.user.username
  }
  var newBlog = {title: title,
                 image: image,
                 body: body,
                 html:html,
                 css:css,
                 javascript:javascript,
                 creater: creater}
  
  
  Blog.create(newBlog, function(err,newestBlog){
    if (err) {
      console.log(err);
      //redirect to blog
    } else {
      
      User.findById(req.user._id,function(err,user){
        if (err) {
          console.log(err);
        } else {
           user.ReputationScore = user.ReputationScore + 10;
           user.save();
          res.render('confirm',{blog:newestBlog,user:user});
        }
      })
 
      
         
       
    }
  })
})





///////////////////CONFIRM ROUTE//////////////////////////////////
router.post('/blogs/new/confirm/:id/:username',isLoggedIn,function(req,res){

  
  
    Blog.findById(req.params.id, function(err,blog){
    if (err) {
      console.log(err);
      //redirect to blog
    } else {
      
     User.findById(req.user._id, function(err,user){
     
        if (err) {
           console.log(err);
        } else {
         
          var Created = {
            id:blog._id,
            classname: blog.title
          }
         
           user.createdProjects.push(Created);
           user.save();
          
            
var AllHisFriends = user.friends.map(FriendList => FriendList.username);


AllHisFriends.forEach(function(friendUsername){
  
User.findOne({username:friendUsername},function(err,friend){
if (err) {
console.log(err);
} else {
 var message = {
title:blog.title,
username:req.params.username
}

friend.ProjectCreatedByFriends.push(message);
friend.save();
}

})
})



res.redirect('/blogs/' + blog._id);
}
})
}
})
})







/////////////////////////////////////////////////////////////



/////////////////////////SHOW ROUTE///////////////////////////////
router.get('/blogs/:id/',isLoggedIn,function(req,res){
 Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
   if (err) {
    console.log(err);
  } else {
      //Icreasing views
    foundBlog.Views++;
    foundBlog.save();
    
    
    
    
    User.findById(req.user._id,function(err,user){
      if (err) {
        console.log(err);
      } else {
        user.TotalProjectViewed++;

        
        //preventing duplication
        
    if(foundBlog.ViewedUser.some((user) => user.id.toString() === req.user._id.toString())) {   
         
      console.log("You are on the list");
    
      }
        
        else{
             var DetailOfUserWhoViewedThisProject = {
           id:req.user._id,
           username:req.user.username
            }
        foundBlog.ViewedUser.push(DetailOfUserWhoViewedThisProject);
        foundBlog.save();
        }
     
              }
            })

    
    User.findById(foundBlog.creater.id,function(err,user){
      if (err) {
        console.log(err);
      } else {
           
    res.render('blogs/show',{blog:foundBlog,Creater:user});
      }
    })
    
  
    
  
    
   
 
  }
 });
});

///////////////////////////EDIT ROUTE////////////////////////////////
  router.get('/blogs/:id/edit',checkBlogOwnership,function(req,res){
      Blog.findById(req.params.id,function(err,foundBlog){
        if (err) {
          throw err;
        } else {
            res.render('blogs/edit',{blog:foundBlog});
        }
        })
  })
  



////////////////////////////UPDATE ROUTE///////////////////////////////////

router.put('/blogs/:id',checkBlogOwnership,function(req,res){
Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundBlog){
  if (err) {
     console.log(err);
  } else {
    ////////
 
       
    ////////
    res.redirect('/blogs/' +req.params.id)
  }
});
});

//////////////////////////DELETE ROUTE///////////////////////////////////// 

router.delete('/blogs/:id',checkBlogOwnership,function(req,res){
  Blog.findByIdAndRemove(req.params.id,function(err,DeletedBlog){
    if (err) {
      console.log(err);
    } else {
       res.redirect('/blogs/');
    }
});
});


////////////////////////RUN routes//////////////////////

router.post('/blogs/run/',function(req,res){

 var html = req.body.html;
 var css = req.body.css;
 var javascript = req.body.javascript;

 res.render('run',{html,css,javascript}); 
})





router.post('/blogs/:id/run/',function(req,res){

 var html = req.body.html;
 var css = req.body.css;
 var javascript = req.body.javascript;

 res.render('run',{html,css,javascript}); 
})

router.get('/blogs/:id/run',function(req,res){
  
  Blog.findById(req.params.id,function(err,blog){
    if (err) {
      console.log(err);
    } else {
     
        res.render("HostingTemplate",{blog:blog});
    }
  })
  

});





router.post('/blogs/run/preview',function(req,res){

 var html = req.body.html;
 var css = req.body.css;
 var javascript = req.body.javascript;

 res.render('blogs/new',{html,css,javascript});

  
})

////////////////////////////////////////////////


router.get('/profilepic',function(req,res){
 

  
 res.render('blogs/profilepic');

  
})



// router.post("/api/Upload/",function(req,res){
  
// //   User.findById(req.user._id,function(err,user){
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       user.ProfileImage.data = fs.readFileSync(req.files.userPhoto.path);
// //       user.ProfileImage.contentType = "image/png";
// //       user.save();
// //       res.redirect("back");
// //     }
// //   })
  
  
  
// //  var newItem = new User ();
// //  newItem.ProfileImage.data = fs.readFileSync(req.files.userPhoto.path)
// //  newItem.ProfileImage.contentType = "image/png";
// //  newItem.save();
  
  
  
  
  
  
  
  
  
// });


router.post('/upload',upload.single('avatar'), function(req, res) {
  
  
    var fileInfo = [];
  
  
    for(var i = 0; i < req.files.length; i++) {
      
        fileInfo.push({
            "originalName": req.files[i].originalName,
            "size": req.files[i].size,
            "b64": new Buffer(fs.readFileSync(req.files[i].path)).toString("base64")
        });
      
        fs.unlink(req.files[i].path);
    }
   console.log(fileInfo);
  res.redirect("back");
  
  
  
});






////////////////// #### FUNCTION ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


////////////////////////////////////////check Ownership//////////////////////////////////////////////////

 function checkBlogOwnership(req,res,next) {
  if (req.isAuthenticated()) {                                      /// is user logged in?
        
      Blog.findById(req.params.id,function(err,foundBlog){
       if (err) {
          res.redirect('back');
        console.log(err);
      } else {
       
        if(foundBlog.creater.id.equals(req.user._id)){                //  does the user own the respective blog?
        next();
        }
        else{
          res.redirect('back');
        }
      }
     }); 
    }
    else{
       res.redirect('back');
    }
  
}
 /////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////


 function checkFriendship(req,res,next) {
  if (req.isAuthenticated()) {                                      /// is user logged in?
        
      User.findById(req.params.id,function(err,foundUser){
       if (err) {
          res.redirect('back');
        console.log(err);
      } else {
       foundUser.forEach(function(user){
        if(user.friendRequest.id.equals(req.user._id)){ 
             res.redirect('back');
        }
        else{
       next();
        }
         })
      }
     }) 
    }
    else{
       res.redirect('back');
    }
  
}

/////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;



