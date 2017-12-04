var  mongoose = require('mongoose');
var Blog = require('./models/blog');
var Comment = require('./models/comment');
var Profile = require('./models/profile');
var User = require('./models/user');
var Course = require('./models/course');



var data = [
  {
    title : 'Batman',
    image : 'https://www.eaglemoss.com/uploads/142005360377776/original.jpg',
    body : 'Batman has been featured in many ongoing series limited series and graphic novels published by DC Comics. These titles have been handled or coordinated through a single editorial section at DC Comics. This section also generally handles titles that have spun off of the core Batman titles to feature related characters. This list presents these titles separated by general type of publication.',
    creater : 'Saurabh'
  },
  {
   title : 'Batman',
   image : 'https://www.eaglemoss.com/uploads/142005360377776/original.jpg',
    body : 'Batman has been featured in many ongoing series limited series and graphic novels published by DC Comics. These titles have been handled or coordinated through a single editorial section at DC Comics. This section also generally handles titles that have spun off of the core Batman titles to feature related characters. This list presents these titles separated by general type of publication.',
 creater : 'Saurabh'
  },
    {
   title : 'Batman',
   image : 'https://www.eaglemoss.com/uploads/142005360377776/original.jpg',
    body : 'Batman has been featured in many ongoing series limited series and graphic novels published by DC Comics. These titles have been handled or coordinated through a single editorial section at DC Comics. This section also generally handles titles that have spun off of the core Batman titles to feature related characters. This list presents these titles separated by general type of publication.',
 creater : 'Saurabh'
  },
    {
   title : 'Batman',
   image : 'https://www.eaglemoss.com/uploads/142005360377776/original.jpg',
    body : 'Batman has been featured in many ongoing series limited series and graphic novels published by DC Comics. These titles have been handled or coordinated through a single editorial section at DC Comics. This section also generally handles titles that have spun off of the core Batman titles to feature related characters. This list presents these titles separated by general type of publication.',
 creater : 'Saurabh'
  }

];


function seedDB(){
  
  Course.remove({},function(err){
  if (err) {
         console.log(err);
   } 
         console.log("All Blogs removed");
    
//       data.forEach(function(seed){
//       Course.create(seed,function(err,blog){
//         if (err) {
//          console.log(err);
//        } else {
//          console.log('Data added');
//          Comment.create({
//            text:"yak!",
//            author:"Saurabh"
//          },function(err,comment){
//            if (err) {
//                console.log(err);
//           } else {
//             blog.comments.push(comment);
//              blog.save();
//             console.log('comment added');
//            }
//         })
//       }
//       });
 // });

});
}



module.exports = seedDB;

