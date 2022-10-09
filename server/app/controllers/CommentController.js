// models
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
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
        post: postId,
      });

      await newComment.save();
      await Post.findByIdAndUpdate(
        { _id: postId },
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
    const { postId, id } = req.params;
    const condition = { author: userId, _id: id, post: postId };
    try {
      const commentDeleted = await Comment.findOneAndDelete(condition);
      await Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: id } });

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
}

module.exports = new CommentController();
