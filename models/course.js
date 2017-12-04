var  mongoose = require('mongoose');



var courseSchema = new mongoose.Schema({
  courseTitle : String,
  titleImage : String,
  
  Chapters:[{
    lessons:String
  }],
  
  
  
  comments:[
  {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comment"
  }
],
  
  
  registeredUsers:[{
     id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
    username: String
}]  
})









module.exports = mongoose.model("Course",courseSchema);