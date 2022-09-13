const Router = require("express").Router();
const BlogController = require("../controllers/BlogController");
const passport = require("../configs/passport");

Router.post("/newblog", passport, BlogController.createBlog);
Router.get("/:id", BlogController.getBlog);
Router.delete("/:id", passport, BlogController.removeBlog);
Router.put("/:id", passport, BlogController.editBlog);
Router.get("/", BlogController.getBlogs);

module.exports = Router;
