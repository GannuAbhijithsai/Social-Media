const { default: mongoose } = require("mongoose")
const {Schema}=mongoose;
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: {
          type: String,
          require: true
      },
      username:{
        type: String,
        reuire: true,
        unique:true
      },
      email: {
          type: String,
          require: true,
          unique:true
      },
      password: {
          type:String,
             required:true
      }   ,
      date:{
        type:Date,
        default:Date.now
      },
      Photo: {
        type: String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      },
      followers: [{ type: ObjectId, ref: "users" }],
      following: [{ type: ObjectId, ref: "users" }],
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      saved: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      bio: {
        type: String,
        maxLength: 150,
      },
      Links: [String]    
  })
    const User=mongoose.model("users", userSchema)
    User.createIndexes();
  module.exports= User;