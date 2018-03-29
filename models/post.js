var  mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    
postImage:String,
caption:String,
Views:{type:Number,default:0},
  
LikedUser:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String
}],

postedBy:{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "User"
},
username: String
},  
  
comments:[
            {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
            }
            ],
  
  
postedOn:{type:Date,default:Date.now}, 
  
 })


module.exports = mongoose.model("Post",postSchema);