const Router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const passport = require("../utils/passport");

Router.post("/:postId/newcomment", passport, CommentController.createComment);
Router.get("/:postId", passport, CommentController.getComments);
Router.delete("/:postId/delete/:id", passport, CommentController.removeComment);

module.exports = Router;
