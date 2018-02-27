
 var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
   asker:String,
   askerImage:String,
   questionText:String,
   askerId:{
           id:  {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
                },
   },
  
  comments:[{
            commentText:String,
            commenter:String
  }],
  
  answers:[{
           answerText:String,
           id:  {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
                },
           answeredBy:String,
           answererImage:String,
           accepted:{type:Boolean,default:false}
  }],
  
  
  askedOn:{type:Date,default:Date.now},
  score:{type:Number,default:0},
  questionCode:String,
  questionDescription:String,
  answered:{type:Boolean,default:false},
  upvotedUsers:[{username:String}],
  downvotedUsers:[{username:String}]
})


module.exports = mongoose.model("Question",questionSchema);