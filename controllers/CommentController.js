// models
const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");
class CommentController {
  async createComment(req, res) {
    const userId = req.userId;
    const { body } = req.body;
    const blogId = req.params.blogId;
    if (!body) {
      return res.status(401).json({
        success: false,
        message: "Missing body comment",
      });
    }

    try {
      const newComment = new Comment({
        author: userId,
        body,
        blog: blogId,
      });

      await newComment.save();
      await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $push: { comments: newComment._id } }
      );

      res.status(203).json({
        success: true,
        message: "created comment successfully!",
        newComment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
  async removeComment(req, res) {
    const userId = req.userId;
    const { blogId, id } = req.params;
    const condition = { author: userId, _id: id, blog: blogId };
    try {
      const commentDeleted = await Comment.findOneAndDelete(condition);
      await Blog.findOneAndUpdate({ _id: blogId }, { $pull: { comments: id } });

      res.status(203).json({
        success: true,
        message: "deleted comment successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
}

module.exports = new CommentController();
