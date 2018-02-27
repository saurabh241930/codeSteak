var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({

username:String,

password :String,
  
FavouriteColor:String,
  
ThemeColor:String,
 
NewNotifications:{type:Boolean,default:false},
  
ReputationScore:{type:Number,default:1},
  
TotalProjectViewed:{type:Number,default:0},
  
Visited:{type:Number,default:1},

ProfileImage:{ type: String, default: "http://res.cloudinary.com/sp241930/image/upload/v1519073356/imageedit_2_7510950099_xbbjip.png" },


friends:[{    
username: String,
friendImage:String
}],

ProjectCreatedByFriends:[{
title:String,
username:String
}],

messages:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},

texts:[{
username:String,
message:String
}],

User:String
}],

  
following:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String
}], 

followers:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String
}], 

  
followingNotification:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
On:{type:Date,default:Date.now},
}], 
  

friendRequest:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
requesterImage:String,
Status:{type:String,default:"Accept" }, 
Color:{type:String,default:"blue" } 
}], 

  
  
friendRequestNotification:[{
  
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
Status:{type:String,default:"Accept" }, 
Color:{type:String,default:"blue" } 
}], 
  
  
  BlogLikedNotification:[{
  
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
Projectname:String
}], 

  
 YourfriendRequestedNotification:[{
   
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String

}], 
 
  
  
 AcceptedfriendRequestedNotification:[{
   
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String

}], 
  
   CommentNotification:[{
   
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
Projectname:String,
Text:String

}], 
  
  


registeredClasses:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "Blog"
},
classname: String,
}],




createdProjects:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "Blog"
},
classname: String,
}]   
});






UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);