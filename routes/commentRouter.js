const Router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const passport = require("../configs/passport");

Router.post("/:blogId/newcomment", passport, CommentController.createComment);
Router.delete("/:blogId/delete/:id", passport, CommentController.removeComment);

module.exports = Router;
