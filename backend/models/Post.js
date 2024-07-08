const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types; 

const postSchema = new mongoose.Schema({ 
  body: {
    type: String,
    required: true,
  }, 
  photo: {
    type: String,
    default: "no photo",
  },
  ImageURL:{
    type: String
  },
  likes: [{ type: ObjectId, ref: "users" }],
  comments: [
    {
      comment: { type: String },
      username:{type:String},
      userphoto:{type:String}
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedBy: {
    type: ObjectId,
    ref: "users",
  }
}, { timestamps: true });

const Post = new mongoose.model("post", postSchema);
module.exports = Post;
