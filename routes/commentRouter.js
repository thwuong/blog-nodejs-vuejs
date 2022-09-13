const Router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const passport = require("../configs/passport");

Router.post("/newcomment", passport, CommentController.createComment);
Router.delete("/:id", passport, CommentController.removeComment);

module.exports = Router;
