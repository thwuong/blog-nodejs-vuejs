const Router = require("express").Router();
const PostController = require("../controllers/PostController");
const passport = require("../configs/passport");
const upload = require("../configs/multer");

Router.post(
  "/newpost",
  passport,
  upload.single("image"),
  PostController.createPost
);
Router.get("/:postId", PostController.getPost);
Router.delete("/:postId/delete", passport, PostController.removePost);
Router.put(
  "/:postId/edit",
  passport,
  upload.single("image"),
  PostController.editPost
);
Router.put("/:postId/like", passport, PostController.handleLikePost);
Router.put("/:postId/favorite", passport, PostController.handleFavsPost);
Router.get("/", PostController.getPosts);

module.exports = Router;
