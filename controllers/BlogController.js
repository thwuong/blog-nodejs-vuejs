// models

class BlogController {
  getBlogs(req, res) {
    res.json({
      message: "Get all blog",
    });
  }
  getBlog(req, res) {
    res.json({
      message: "Get one blog",
    });
  }
  createBlog(req, res) {
    res.json({
      message: "Create new blog",
    });
  }
  removeBlog(req, res) {
    res.json({
      message: "Remove blog",
    });
  }
  editBlog(req, res) {
    res.json({
      message: "Edit blog",
    });
  }
}

module.exports = new BlogController();
