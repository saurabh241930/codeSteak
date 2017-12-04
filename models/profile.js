var  mongoose = require('mongoose');


var profileSchema = new mongoose.Schema({
    name : String,

      registeredClasses:[{
  
   id:{
   type : mongoose.Schema.Types.ObjectId,
  ref : "Blog"
     },
    classname: String
    }]
  
  
 })


module.exports = mongoose.model("Profile",profileSchema);