const Router = require("express").Router();
const authController = require("../controllers/authcontroller");
Router.get("/login", authController.login);
Router.get("/register", authController.register);

module.exports = Router;
