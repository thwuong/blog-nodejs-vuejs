// models

class CommentController {
  createComment(req, res) {
    res.json({
      message: "Create new blog",
    });
  }
  removeComment(req, res) {
    res.json({
      message: "Remove blog",
    });
  }
}

module.exports = new CommentController();
