var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({




username:String,

password :String,
  
FavouriteColor:String,
  
ReputationScore:{type:Number,default:1},

ProfileImage:{ type: String, default: "http://cdn.playbuzz.com/cdn/52fa9341-4dfc-46fa-81d8-c64315ab63c4/1773fca9-d977-4369-83e3-e7d36efae092.png" },


friends:[{    
username: String
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



  
  
  

friendRequest:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String,
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