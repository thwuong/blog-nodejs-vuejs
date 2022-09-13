const Router = require("express").Router();
const authController = require("../controllers/AuthController");
const upload = require("../configs/multer");
const passport = require("../configs/passport");
Router.post("/login", authController.login);
Router.post("/register", authController.register);
Router.put(
  "/setting",
  passport,
  upload.single("avatar"),
  authController.updateProfile
);
Router.get("/", passport, authController.getUser);

module.exports = Router;
