var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var User = require('../models/user');
var methodOverride = require('method-override');



//////////////////////INDEX ROUTE/////////////////////////////
router.get('/blogs',function(req,res){
//   console.log(req.user);
  Blog.find({},function(err,blogs){
    if (err) {
      console.log(err);
    } else {
       res.render('blogs/index',{blogs: blogs});
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
       res.render('confirm',{blog:newestBlog});
    }
  })
})





///////////////////CONFIRM ROUTE//////////////////////////////////
router.post('/blogs/new/confirm/:id',isLoggedIn,function(req,res){

  
  
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
           res.redirect('/blogs/' + blog._id);
        }
 })
      
      
      
      

 
 



    }
    })
  
  
  
  
})







/////////////////////////////////////////////////////////////



/////////////////////////SHOW ROUTE///////////////////////////////
router.get('/blogs/:id/',function(req,res){
 Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
   if (err) {
    console.log(err);
  } else {
   
    res.render('blogs/show',{blog:foundBlog});
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



// router.post('/blogs/run/preview',function(req,res){

//  var html = req.body.html;
//  var css = req.body.css;
//  var javascript = req.body.javascript;

//  res.render('preview',{html,css,javascript});

  
// })







router.post('/blogs/run/preview',function(req,res){

 var html = req.body.html;
 var css = req.body.css;
 var javascript = req.body.javascript;

 res.render('blogs/new',{html,css,javascript});

  
})

////////////////////////////////////////////////


// router.get('/blogs/run/preview',function(req,res){



//  res.render('preview');

  
// })








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



