// models
const Blog = require("../models/blogModel");
const fs = require("fs");
class BlogController {
  async createBlog(req, res) {
    const { title, body, tags } = req.body;
    const image = req.file?.filename;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Missing is title!",
      });
    }

    try {
      const newBlog = new Blog({
        author: req.userId,
        title,
        body,
        image: image || "",
        tags,
      });

      await newBlog.save();

      res.status(200).json({
        success: true,
        message: "Created new blog",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }
  async getBlogs(req, res) {
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
      const blogs = await Blog.find(regex)
        .where(filter)
        .populate("author", "username");

      res.status(200).json({
        success: true,
        message: "get blogs successfully!",
        blogs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }
  async getBlog(req, res) {
    const condition = { _id: req.params.id };

    try {
      const blog = await Blog.findOne(condition).populate("author", "username");

      res.status(200).json({
        success: true,
        message: "get blog successfully!",
        blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error!",
      });
    }
  }
  async removeBlog(req, res) {
    const condition = { _id: req.params.id, author: req.userId };
    const fileImage = await Blog.findOne({ _id: req.params.id }).select(
      "image"
    );
    const pathFileUpload = `uploads/image/${fileImage.image}`;
    try {
      const blogDeleted = await Blog.deleteOne(condition);

      fs.unlink(pathFileUpload, (err) => {
        if (err) {
          console.log(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Deleted blog successfully!",
        blogDeleted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
  async editBlog(req, res) {
    const condition = { author: req.userId, _id: req.params.id };
    const { title, body, tags } = req.body;
    const image = req.file?.filename;

    if (image) {
      const fileImage = await Blog.findOne(condition).select("image");
      if (fileImage.image) {
        const pathfileImage = `uploads/image/${fileImage.image}`;
        fs.unlink(pathfileImage, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }

    let blogUpdate = {
      title: title,
      body: body,
      image,
      tags: tags,
    };
    // update blog
    try {
      blogUpdate = await Blog.findOneAndUpdate(condition, blogUpdate, {
        new: true,
      }).populate("author", "username");

      res.status(202).json({
        success: true,
        message: "Blog edited successfully!",
        blogUpdate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new BlogController();
