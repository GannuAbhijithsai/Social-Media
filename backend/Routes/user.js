/**
 * @swagger
 * /api/user/get/allusers:
 *   get:
 *     summary: Get all users
 *     tags: [Profile-API]
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *       '500':
 *         description: Internal Server Error
 * 
 * /api/user/specific/{id}:
 *   get:
 *     summary: Get specific user details by ID
 *     tags: [Profile-API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodbObjectId
 *           description: The ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: Specific user details retrieved successfully
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Unprocessable Entity - Validation Error
 *
  * /api/user/get/suggestions:
 *   get:
 *     summary: Get user suggestions
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of suggestions to retrieve (default is 5)
 *     responses:
 *       '200':
 *         description: User suggestions retrieved successfully
 *       '400':
 *         description: Bad Request - Validation errors
 *       '500':
 *         description: Internal Server Error
 *
 * /api/user/profilePic/{userId}:
 *   get:
 *     summary: Get user's profile picture by user ID
 *     tags: [Profile-API]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user whose profile picture is to be retrieved
 *     responses:
 *       '200':
 *         description: Profile picture retrieved successfully
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: User not found or profile picture not uploaded
 *       '500':
 *         description: Internal Server Error
 * 
 * /api/user/search:
 *   post:
 *     summary: Search a user by username
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: Username to search
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username to search
 *     responses:
 *       '200':
 *         description: User found successfully
 *       '404':
 *         description: No user found
 *       '500':
 *         description: Internal Server Error
 * 
 * /api/user/uploadProfilePic:
 *   put:
 *     summary: Upload profile picture
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: User profile picture data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pic:
 *                 type: string
 *                 format: binary
 *                 description: Base64-encoded image data
 *     responses:
 *       '200':
 *         description: Profile picture uploaded successfully
 *       '422':
 *         description: Unprocessable Entity - Validation Error
 *
 * /api/user/follow:
 *   put:
 *     summary: Follow a user
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: User ID to follow
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: The ID of the user to follow
 *     responses:
 *       '200':
 *         description: Following successful
 *       '404':
 *         description: User being followed not found
 *       '422':
 *         description: Unprocessable Entity - Validation Error
 *
 * /api/user/unfollow:
 *   put:
 *     summary: Unfollow a user
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: User ID to unfollow
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: The ID of the user to unfollow
 *     responses:
 *       '200':
 *         description: Unfollowed successfully
 *       '422':
 *         description: Unprocessable Entity - Validation Error
 *
 * /api/user/updateProfile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodbObjectId
 *           description: The ID of the user to update
 *     requestBody:
 *       description: Updated user profile data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               bio:
 *                 type: string
 *                 description: The bio of the user
 *             example:
 *               name: Test User
 *               username: user@123
 *               email: testuser1@gmail.com
 *               bio: test bio
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '400':
 *         description: Bad Request - ID mismatch or other validation errors
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 *
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Profile-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongodbObjectId
 *           description: The ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad Request - ID mismatch or other validation errors
 *       '401':
 *         description: Unauthorized - Params ID doesn't match with login user ID
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

const express = require("express");
const router = express.Router(); 
const mongoose = require('mongoose');
const Post = require("../models/Post");
const multer = require('multer');
const path = require('path');
const User=require("../models/User");
const Fetchuser = require("../middlewares/Fetchuser"); 
const {bucket}=require("../firebase")
router.get("/specific/:id", async (req, res) => {
  try {

    const id = req.params.id;
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ error: "Invalid user ID",id });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    // Find the user by ID and exclude the password field
    const currUser = await User.findOne({ _id: objectId }).select("-password");
    // Check if the user was not found
    if (!currUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Find user posts and populate related fields
    const userPosts = await Post.find({ postedBy: objectId })
      .populate("postedBy", "_id name username")
      .populate("comments.postedBy", "_id name username");
    // Send the response with user and posts data
    res.status(200).json({ user: currUser, posts: userPosts });
  } catch (error) {
    console.error(error);
    // Send a custom error response without exposing internal details
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/displaypictures'));
  },
  filename: (req, file, cb) => {
    const userId = req.user._id;
    const fileName = `${userId}_${Date.now()}.png`;
    photo=fileName;
    cb(null, fileName);
  },
});
*/
//const host=`http://localhost:4000/displaypics/`;
//const host=`https://instagram-api-yjzj.onrender.com/displaypics/`
const host=`https://instagram-9bbk0x71j-sandeep-7282.vercel.app/`
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put("/uploadProfilePic", Fetchuser, upload.single('pic'), async (req, res) => {
  try {
    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const userId = req.user._id;
    const file = req.file;
    const fileName = `ProfilePics/${userId}_profile_pic.png`;

    // Upload the file to Firebase Storage
    const fileBuffer = file.buffer;
    const fileUpload = bucket.file(fileName);
    const fileStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    fileStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error uploading profile picture to Firebase Storage' });
    });

    fileStream.on('finish', async () => {
      // File upload successful, generate download link
      const profilePicURL = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2025', // Set an expiration date for the signed URL
      });

      // Update user schema with the file path
      const updatedUserData = await User.findByIdAndUpdate(req.user._id, {
        $set: { Photo: profilePicURL[0] }, 
      }, { new: true });
      const userDataWithoutPassword = { ...updatedUserData.toObject() };
      delete userDataWithoutPassword.password;
      res.status(200).json({
        success: true,
        message: "Profile Pic Updated",
        userData: userDataWithoutPassword,
      });
    });

    fileStream.end(fileBuffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(422).json({ success: false, error: error.message });
  }
});

//to get profile pic
router.get("/profilePic/:userId", async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const userId = req.params.userId;
    // Find the user by ID
    const user = await User.findById(userId);
    // Check if the user exists and has a profile picture
    if (!user || !user.Photo) {
      return res.status(404).json({ success: false, message: "User not found or profile picture not uploaded." });
    }
    // Construct the path to the profile picture
    const imagePath = path.join(__dirname, '../public/images/displaypictures', user.Photo);
    // Send the profile picture file
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Follow a user
router.put("/follow", Fetchuser, async (req, res) => {
  try {
    const to_follow = req.body.userID;
    const want_to_follow = req.user._id;
    // Update the user being followed (add follower)
    const updateUserBeingFollowed = await User.findByIdAndUpdate(
      to_follow,
      {
        $addToSet: { followers: want_to_follow },
      },
      { new: true } // This option returns the modified document
    );
    // Check if the update was successful
    if (!updateUserBeingFollowed) {
      return res.status(404).json({ error: "User being followed not found" });
    }
    // Update the user who wants to follow (add following)
    const updateUserWantToFollow = await User.findByIdAndUpdate(
      want_to_follow,
      {
        $addToSet: { following: to_follow },
      },
      { new: true } // This option returns the modified document
    );
    // Check if the update was successful
    if (!updateUserWantToFollow) {
      return res.status(404).json({ error: "User who wants to follow not found" });
    }
    return res.status(200).json({ success: true ,msg:"Following Successfully"});
  } catch (error) {
    console.error(error);
    res.status(422).json({ errors: error});
  }
});
// to unfollow a user
router.put("/unfollow", Fetchuser, async (req, res) => {
  try {
    const to_follow = req.body.userID; 
    const want_to_follow = req.user._id; 
    await User.findByIdAndUpdate(
      to_follow,
      {
        $pull: { followers: want_to_follow },
      },
      {
        new: true,
      }
    );
    await User.findByIdAndUpdate(
      want_to_follow,
      {
        $pull: { following: to_follow },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true,msg:"unfollowed successfully" });
  } catch (error) {
    console.log(error);
    res.status(422).json({ errors:error});
  }
});
// Route to get all users
router.get("/get/allusers", async (req, res) => {
  try {
    const users = await User.find({},"-password");
    if(users.length===0){
      res.json({msg:"no users found"});
    }
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error",error });
  }
});
//Update User Profile
router.put("/updateProfile/:id" , Fetchuser , async(req , res)=>{
  try {
      if(req.params.id === req.user.id){
              const updateuser = await User.findByIdAndUpdate(req.params.id , {
                  $set:req.body
              });
              await updateuser.save();
              res.status(200).json({msg:"Profile Updated Successfully"});
      }else{
          return res.status(400).json({msg:"Your are not allow to update this user details."})
      }
  } catch (error) {
      return res.status(500).json("Internal server error")
  }
});
//Delete User account 
router.delete("/delete/:id" , Fetchuser , async(req , res)=>{
  try {
      if(req.params.id !== req.user.id){
          return res.status(401).json({msg:"Params ID doesn't match with login user ID"})
      }else{
          const user = await User.findByIdAndDelete(req.params.id);
          if(!user){
          return res.status(400).json({msg:"Deletion failed"});
        }
        return res.status(200).json({msg:"Deletion Successfull"});
      }
  } catch (error) {
      return res.status(500).json("Internal server error",error)
  }
});
//search a user by username
router.post("/search" , Fetchuser , async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.send({
        success: false,
        message: "No user found",
      });
    }
    res.send(user);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get/suggestions" , Fetchuser ,async (req, res) => {
  try {
    const notFollowed = await User.find({
      $and: [
        { followers: { $ne: req.user._id } },
        { _id: { $ne: req.user._id } }
      ]
    })
      .limit(parseInt(req.query.limit ?? 5))
    res.send(notFollowed)
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
