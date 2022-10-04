const Router = require("express").Router();
const BlogController = require("../controllers/BlogController");
const passport = require("../configs/passport");
const upload = require("../configs/multer");

Router.post(
  "/newblog",
  passport,
  upload.single("image"),
  BlogController.createBlog
);
Router.get("/:blogId", BlogController.getBlog);
Router.delete("/:blogId/delete", passport, BlogController.removeBlog);
Router.put(
  "/:blogId/edit",
  passport,
  upload.single("image"),
  BlogController.editBlog
);
Router.put("/:blogId/like", passport, BlogController.handleLikeBlog);
Router.put("/:blogId/favorite", passport, BlogController.handleFavsBlog);
Router.get("/", BlogController.getBlogs);

module.exports = Router;
