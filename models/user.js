var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({




username:String,

password :String,

ProfileImage:{ data: Buffer, contentType: String },


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