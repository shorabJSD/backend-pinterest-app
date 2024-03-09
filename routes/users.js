const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pin");
const plm = require("passport-local-mongoose")
const userSchema = new mongoose.Schema({
  fullname:String,
  username:String,
  name:String,
  email:String,
  password:String,
  contact:Number,
  profileImage:String,
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  }
})
mongoose.plugin(plm)
module.exports = mongoose.model("user", userSchema)

