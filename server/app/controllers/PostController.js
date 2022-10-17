// models
const Post = require("../models/postModel");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
class PostController {
  async createPost(req, res) {
    const { title, body, tags } = req.body;
    const image = req.file;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Missing is title!",
      });
    }

    try {
      let pathImage = "";
      if (image) {
        pathImage = await cloudinary.uploader.upload(image.path);
      }
      const newPost = new Post({
        author: req.userId,
        title,
        body,
        image: pathImage.secure_url || pathImage,
        tags,
      });

      await newPost.save();

      res.status(200).json({
        success: true,
        message: "Created new Post",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }
  async getPosts(req, res) {
    let regex = {};
    let filter = {};
    if (req.query.keyword) {
      regex = {
        title: { $regex: new RegExp(req.query.keyword), $options: "i" },
      };
    }
    if (req.query.tags) {
      filter = {
        tags: req.query.tags.split(","),
      };
    }

    try {
      const posts = await Post.find(regex)
        .where(filter)
        .populate("author", "username");
      res.status(200).json({
        success: true,
        message: "get posts successfully!",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }

  async getPost(req, res) {
    const condition = { _id: req.params.postId };

    try {
      const post = await Post.findOne(condition).populate("author", "username");

      res.status(200).json({
        success: true,
        message: "get blog successfully!",
        post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }
  async removePost(req, res) {
    const condition = { _id: req.params.postId, author: req.userId };

    try {
      const fileImage = await Post.findOne({ _id: req.params.id }).select(
        "image"
      );
      if (fileImage.image) {
        await cloudinary.uploader.destroy(fileImage.image);
      }
      const postDeleted = await Post.deleteOne(condition);

      res.status(200).json({
        success: true,
        message: "Deleted blog successfully!",
        postDeleted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
  async editPost(req, res) {
    const condition = { author: req.userId, _id: req.params.postId };
    const { title, body, tags } = req.body;
    const fileImage = req.file || "";

    // update blog
    try {
      let newImage = "";
      if (fileImage) {
        const post = await Post.findOne(condition).select("image");
        if (post.image) {
          const arrTempt = post.image.split("/");
          const fileName = arrTempt[arrTempt.length - 1];
          let publicId = fileName.split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        newImage = await cloudinary.uploader.upload(fileImage.path);
      }
      const image = newImage.secure_url;
      let postUpdate = {
        title: title,
        body: body,
        image,
        tags: tags,
      };
      postUpdate = await Blog.findOneAndUpdate(condition, postUpdate, {
        new: true,
      }).populate("author", "username");

      res.status(202).json({
        success: true,
        message: "Blog edited successfully!",
        postUpdate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async handleLikePost(req, res) {
    // get id user like and blog is liking
    // check user exsting likes if those user in likes remove user or revese
    const condition = { _id: req.params.postId };
    const userId = req.userId;

    try {
      const posts = await Blog.findOne(condition).select("votes");
      const check = [...posts.votes].some((vote) => vote.toString() === userId);
      let postUpdate = {};
      if (check) {
        postUpdate = await Blog.findByIdAndUpdate(
          condition,
          {
            $pull: { votes: userId },
          },
          { new: true }
        );
      } else {
        postUpdate = await Blog.findByIdAndUpdate(
          condition,
          {
            $push: { votes: userId },
          },
          { new: true }
        );
      }
      // add socket
      res.status(201).json({
        success: true,
        postUpdate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async handleFavsPost(req, res) {
    // get id user like and blog is liking
    // check user exsting likes if those user in likes remove user or revese
    const condition = { _id: req.params.blogId };
    const userId = req.userId;

    try {
      const posts = await Blog.findOne(condition).select("votes");
      const check = [...posts.votes].some((vote) => vote.toString() === userId);
      let postUpdate = {};
      if (check) {
        postUpdate = await Blog.findByIdAndUpdate(
          condition,
          {
            $pull: { favs: userId },
          },
          { new: true }
        );
      } else {
        postUpdate = await Blog.findByIdAndUpdate(
          condition,
          {
            $push: { favs: userId },
          },
          { new: true }
        );
      }
      // add socket
      res.status(201).json({
        success: true,
        postUpdate,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new PostController();
