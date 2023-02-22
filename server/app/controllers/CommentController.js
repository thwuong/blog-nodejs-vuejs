// models
const Comment = require("../models/commentModel");
class CommentController {
  async createComment(req, res) {
    const userId = req.userId;
    const { body } = req.body;
    const postId = req.params.postId;
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
        blog: postId,
      });

      await newComment.save();

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
    const { postId, id } = req.params;
    const condition = { author: userId, _id: id, post: postId };
    try {
      const commentDeleted = await Comment.findOneAndDelete(condition);

      res.status(203).json({
        success: true,
        message: "deleted comment successfully!",
        commentDeleted,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
  async getComments(req, res) {
    const { postId } = req.params;
    try {
      const comments = await Comment.find({ blog: postId }).populate(
        "author",
        "-password"
      );

      res.status(203).json({
        success: true,
        message: "get comments successfully!",
        comments,
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
