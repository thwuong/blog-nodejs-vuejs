const Router = require("express").Router();
const authController = require("../controllers/AuthController");
const upload = require("../utils/multer");
const passport = require("../utils/passport");
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
