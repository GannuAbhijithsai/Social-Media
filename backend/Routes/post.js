/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         body:
 *           type: string
 *           description: The body/content of the post
 *         photo:
 *           type: string
 *           description: The URL of the post's photo
 *           default: "no photo"
 *         ImageURL:
 *           type: string
 *           description: The URL of the post's image
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: An array of user IDs representing users who liked the post
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment posted on the post
 *               postedBy:
 *                 $ref: '#/components/schemas/User'
 *                 description: The user who posted the comment
 *           description: An array of comments on the post
 *         saved:
 *           type: array
 *           items:
 *             type: string
 *             description: ID of the user who saved the post
 *           description: An array of user IDs representing users who saved the post
 *         owner:
 *           type: string
 *           description: ID of the user who owns the post
 *         postedBy:
 *           $ref: '#/components/schemas/User'
 *           description: The user who posted the post
 *       timestamps:
 *         type: object
 *         properties:
 *           createdAt:
 *             type: string
 *             format: date-time
 *           updatedAt:
 *             type: string
 *             format: date-time
 */

/**
 * @swagger
 * /api/post/createpost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The body of the post
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the post
 *     responses:
 *       '200':
 *         description: Post created successfully
 *       '400':
 *         description: Bad Request - Caption or photo required
 *       '500':
 *         description: Internal Server Error

 * /api/post/{postId}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Post-API]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/delete/{postId}:
 *   delete:
 *     summary: Delete post by ID
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '401':
 *         description: Unauthorized - Forbidden
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/update/{postId}:
 *   put:
 *     summary: Update post by ID
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     requestBody:
 *       description: Updated post data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The updated body of the post
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Updated image file for the post
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *       '400':
 *         description: Bad Request - Caption or photo required
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/handlelike/{postId}:
 *   put:
 *     summary: Handle like for a post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to handle like
 *     responses:
 *       '200':
 *         description: Like handled successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/addcomment/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to add a comment to
 *     requestBody:
 *       description: Comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment to add
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist or empty comment
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/updatecomment/{postId}:
 *   put:
 *     summary: Update a comment on a post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update a comment on
 *       - in: query
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       description: Updated comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The updated comment
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/removecomment/{postId}:
 *   delete:
 *     summary: Remove a comment from a post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to remove a comment from
 *       - in: query
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to remove
 *     responses:
 *       '200':
 *         description: Comment removed successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/handlesave/{postId}:
 *   post:
 *     summary: Handle save for a post
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to handle save
 *     responses:
 *       '200':
 *         description: Save handled successfully
 *       '400':
 *         description: Bad Request - Post doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/userpost/{userId}:
 *   get:
 *     summary: Get posts by user ID
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get posts for
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '400':
 *         description: Bad Request - User doesn't exist
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/get/explore:
 *   get:
 *     summary: Explore posts
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/get/saved:
 *   get:
 *     summary: Get saved posts
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '500':
 *         description: Internal Server Error
 *
 * /api/post/get/home:
 *   get:
 *     summary: Get home feed posts
 *     tags: [Post-API]
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */

const express = require("express");
const router = express.Router(); 
const mongoose = require('mongoose');
const Post = require("../models/Post");
const multer = require('multer');
const path = require('path');
const User = require("../models/User");
const Fetchuser = require("../middlewares/Fetchuser"); 
const { bucket } = require("../firebase");

const storage = multer.memoryStorage();
const host = `https://instagram-9bbk0x71j-sandeep-7282.vercel.app/`;

const upload = multer({ storage: storage });
router.post("/createpost", Fetchuser, upload.single('photo'), async (req, res) => {
  try {
    const { body } = req.body;
    const file = req.file;

    if (!body || !file) {
      return res.status(400).send({
        success: false,
        message: "Missing required parameters: body and photo",
      });
    }
    const originalFileName = req.file.originalname.replace(/\s+/g, "_");
    const fileName = `${req.user._id}_${originalFileName}`;

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
      res.status(500).send({
        success: false,
        message: 'Error uploading file to Firebase Storage',
      });
    });

    fileStream.on('finish', async () => {
      // File upload successful, generate download link
      const ImageURL = `https://firebasestorage.googleapis.com/v0/b/social-media-ff271.appspot.com/o/${fileName}?alt=media&token=871a81f6-601e-4f98-a9e0-e15fb0c2a36f`;
      // Create a post with the generated download link
      const post = new Post({
        body,
        photo: fileName,
        ImageURL,
        owner: req.user._id
      });

      const saved = await post.save();
      await User.updateOne(
        { _id: req.user._id },
        { $push: { posts: saved._id } }
      );

      res.send({
        success: true,
        post: saved,
      });
    });

    fileStream.end(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});
router.put("/update/:postId", Fetchuser, upload.single('photo'), async (req, res) => {
  try {
    const postId = req.params.postId;
    const { body } = req.body;
    const file = req.file;

    // Find the post by ID
    const post = await Post.findOne({ _id: postId, owner: req.user._id });

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found or you do not have permission to update it.",
      });
    }

    // Update post content
    if (body) {
      post.body = body;
    }

    // Handle file upload if a new photo is provided
    if (file) {
      const originalFileName = file.originalname.replace(/\s+/g, "_");
      const fileName = `${req.user._id}_${originalFileName}`;

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
        res.status(500).send({
          success: false,
          message: 'Error uploading file to Firebase Storage',
        });
      });

      fileStream.on('finish', async () => {
        // File upload successful, update post photo details
        post.photo = fileName;
        post.ImageURL = `https://firebasestorage.googleapis.com/v0/b/social-media-ff271.appspot.com/o/${fileName}?alt=media&token=871a81f6-601e-4f98-a9e0-e15fb0c2a36f`;

        // Save the updated post
        const updatedPost = await post.save();

        res.send({
          success: true,
          post: updatedPost,
        });
      });

      fileStream.end(fileBuffer);
    } else {
      // Save the post without updating the photo if no new photo is provided
      const updatedPost = await post.save();

      res.send({
        success: true,
        post: updatedPost,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:postId",async(req,res)=>{
  try {
      const post = await Post.findOne({ _id: req.params.postId });
      if (!post)
        return res.send({
          success: false,
          message: "Post doesn't exist",
        });
     return res.status(200).send({post:post});
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
})

router.delete("/delete/:postId",Fetchuser,async(req,res)=>{
    try {
        const post = await Post.findOne({ _id: req.params.postId });
        if (post.owner.toString() !== req.user._id.toString())
          return res.status(401).send({
            success: false,
            message: "forbidden",
          });
        await Post.deleteOne({ _id: req.params.postId });
        await User.updateOne(
          { _id: req.user._id },
          { $pull: { posts: req.params.postId } }
        );
        res.status(200).send({
          success: true,
          message: "done",
        });
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.put("/handlelike/:postId",Fetchuser,async(req,res)=>{
    try {
        const user = req.user._id;
        const post = await Post.findOne({ _id: req.params.postId });
        if (!post)
          return res.send({
            success: false,
            message: "Post doesn't exist",
          });
        const likesArr = post.likes;
        if (likesArr.includes(user)) {
          const change = await Post.updateOne(
            { _id: req.params.postId },
            { $pull: { likes: user } }
          );
          return res.send(change);
        } else {
          const change = await Post.updateOne(
            { _id: req.params.postId },
            { $push: { likes: user } }
          );
          return res.send(change);
        }
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.post("/addcomment/:postId",Fetchuser,async(req,res)=>{
    try {
        const post = await Post.findOne({ _id: req.params.postId });
      const user= await User.findOne({_id:req.user._id});
        if (!req.body.comment)
          return res.status(500).send({
            success: false,
            message: "Cant make an empty comment",
          });
        if (!post)
          return res.status(400).send({
            success: false,
            message: "Post doesn't exist",
          });
          
        const comment = await Post.updateOne(
          { _id: req.params.postId },
          { $push: { comments: { username:user.username,userphoto:user.Photo, comment: req.body.comment } } }
        );
        res.send(post.comments);
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
})
router.put("/updatecomment/:postId",Fetchuser,async(req,res)=>{
    try {
        const comment = await Post.updateOne(
          { _id: req.params.postId, "comments._id": req.query.commentId },
          { $set: { "comments.$.comment": req.body.comment } }
        );
        res.send(comment);
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.delete("/removecomment/:postId",Fetchuser,async(req,res)=>{
    try {
        const post = await Post.findOne({ _id: req.params.postId });
        const commentId = req.query.commentId;
        if (!post)
          return res.status(400).send({
            success: false,
            message: "Post doesn't exist",
          });
        const deleted = await Post.updateOne(
          { _id: req.params.postId },
          { $pull: { comments: { _id: commentId } } }
        );
        res.send(deleted);
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.post("/handlesave/:postId",Fetchuser,async(req,res)=>{
    try {
        const userFind = await User.findOne({ _id: req.user._id });
        const savedArr = userFind.saved;
        if (savedArr.includes(req.params.postId)) {
          await User.updateOne(
            { _id: req.user._id },
            { $pull: { saved: req.params.postId } }
          );
          await Post.updateOne(
            { _id: req.params.postId },
            { $pull: { saved: req.user._id } }
          );
          res.send({
            success: true,
          });
        } else {
          await User.updateOne(
            { _id: req.user._id },
            { $push: { saved: req.params.postId }}
          );
          await Post.updateOne(
            { _id: req.params.postId },
            { $push: { saved: req.user._id } }
          );
          res.send({
            success: true,
          });
        }
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
})

router.get("/userpost/:userId",Fetchuser,async(req,res)=>{
    try {
        const { userId } = req.params;
        const posts = await Post.find({ owner: userId }).sort({ createdAt: -1 });
        res.send(posts);
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.get("/get/explore",Fetchuser,async(req,res)=>{
    try {
    console.log(req.user)
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).send({
          success: false,
          message: "Invalid user ID",
      });
  }
  const posts = await Post.aggregate([
    {
        $match: {
            owner: {
                $ne:new mongoose.Types.ObjectId(req.user._id)
            },
            _id: {
                $type: 'objectId' 
            }
        }
    },
    {
        $sort: {
            createdAt: -1
        }
    }
]);
  
        res.send(posts);
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});


router.get("/get/saved",Fetchuser,async(req,res)=>{
    try {
        const findUser = await User.findOne({ _id: req.user._id });
        let savedPost = [];
        Promise.all(
          findUser.saved.map(async (item) => {
            savedPost.push(await Post.findOne({ _id: item }));
          })
        ).then(() => {
          res.send(savedPost.reverse());
        });
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
});

router.get("/get/home",Fetchuser,async(req,res)=>{
    try {
        const userId = req.user._id;
        const posts = await Post.find({ owner: userId });
        const user = await User.findOne({ _id: userId });
        Promise.all(
          user.following.map(async (item) => {
            posts.push(...(await Post.find({ owner: item })));
          })
        ).then(() => {
          const arr = posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          res.send(arr);
        });
      } catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      }
})

module.exports = router;

