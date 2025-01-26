const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const PostModel = mongoose.model("PostModel");
const protectedRoute = require("../middleware/protectedResource")

//all users posts
router.get("/allposts", (req,res)=>{
    PostModel.find()
    .populate("author", "_id fullName profileImg")
    .populate("comments.commentedBy", "_id fullName")
    .then((dbPosts)=>{
        res.status(200).json({posts: dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
})

//all posts only for loggd in
router.get("/myallposts",protectedRoute, (req,res)=>{
    PostModel.find({author: req.user._id})
    .populate("author", "_id fullName profileImg")
    .then((dbPosts)=>{
        res.status(200).json({posts: dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
})

router.post("/createpost",protectedRoute, (req,res)=>{
    const{description, location, image} = req.body;
    if(!description || !location || !image){
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({description: description, location: location, image: image,author: req.user});
    postObj.save()
    .then((newPost)=>{
        res.status(201).json({post: newPost});
    })
    .catch((error)=>{
        console.log(error);
    })
});


router.delete("/deletepost/:postId",protectedRoute, (req,res)=>{
    PostModel.findOne({_id: req.params.postId})
    .populate("author", "_id")
    .then((postFound)=>{
        if(!postFound){
            return res.status(400).json({error: "Post does not exist"});
        }
        //check f the post author is same as loggedin user only then allows deletion
        if(postFound.author._id.toString() === req.user._id.toString()){
            return postFound
            .deleteOne()
            .then((data)=>{
                res.status(201).json({result: data});
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    })
})

router.put("/like", protectedRoute, async (req, res) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(            
            req.body.postId,
            {                
                $addToSet: { likes: req.user._id }, // Use $addToSet to add user to likes if not already present
            },
            {
                new: true, // Return the updated document
            }
        ).populate("author", "_id fullName");
            
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/unlike", protectedRoute, async (req, res) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.body.postId,
            {
                $pull: { likes: req.user._id }, // Use $addToSet to add user to likes if not already present
            },
            {
                new: true, // Return the updated document
            }
        ).populate("author", "_id fullName");

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/comment", protectedRoute, async (req, res) => {
    try {
        const comment = {
            commentText: req.body.commentText,
            commentedBy: req.user._id
        };

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.body.postId,
            {
                $push: { comments: comment }
            },
            {
                new: true // returns updated record
            }
        ).populate("comments.commentedBy", "_id fullName") // comment owner
        .populate("author", "_id fullName"); // post owner

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;