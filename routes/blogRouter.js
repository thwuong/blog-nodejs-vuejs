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
Router.get("/:id", BlogController.getBlog);
Router.delete("/:id", passport, BlogController.removeBlog);
Router.put("/:id", passport, upload.single("image"), BlogController.editBlog);
Router.get("/", BlogController.getBlogs);

module.exports = Router;
