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
    const regex =
      req.query.title !== undefined
        ? { $regex: new RegExp(req.query.title), $options: "i" }
        : {};
    const filter =
      req.query.tags !== undefined
        ? { $elemMatch: { tags: req.query.tags } }
        : {};
    console.log(regex, filter);
    let blogs = {};
    try {
      if (req.query.title) {
        blogs = await Blog.find({
          title: regex,
        });
      } else {
        blogs = await Blog.find({}).populate("author", "username");
      }

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
  editBlog(req, res) {
    res.json({
      message: "Edit blog",
    });
  }
}

module.exports = new BlogController();
