// auth model
const Auth = require("../models/authModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const fs = require("fs");
class authController {
  async getUser(req, res, next) {
    try {
      const user = await Auth.findById(req.userId).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: "Missing password or username",
      });
    }
    try {
      const user = await Auth.findOne({ username: username });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "user not found",
        });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (passwordValid) {
        const token = jwt.sign({ payload: user._id }, process.env.SECRECT);
        res.status(200).json({
          success: true,
          message: "Login successfully!",
          token,
        });
      } else {
        res.status(402).json({
          success: false,
          message: "password incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
      console.log(error);
    }
  }
  async register(req, res) {
    const { username, password, comfirmPassword } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing password or username",
      });
    }
    const user = await Auth.findOne({ username: username });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "user is existing",
      });
    }
    if (password !== comfirmPassword) {
      return res.status(402).json({
        success: false,
        message: "password not matched",
      });
    }
    try {
      const hashPassword = await argon2.hash(password);
      const newUser = new Auth({
        username,
        password: hashPassword,
      });

      await newUser.save();
      const token = jwt.sign({ payload: newUser._id }, process.env.SECRECT);

      res.status(200).json({
        success: true,
        message: "Username created successfully!",
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
      console.log(error);
    }
  }
  async updateProfile(req, res) {
    const filename = req.file?.filename;
    const { username, email } = req.body;

    const condition = { _id: req.userId };

    if (filename) {
      const fileAvatar = await Auth.findById(req.userId).select("avatar");
      if (fileAvatar.avatar) {
        const pathFileAvatar = `uploads/avatar/${fileAvatar.avatar}`;
        fs.unlink(pathFileAvatar, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }

    try {
      let userUpdate = {
        username,
        email,
        avatar: filename,
      };
      userUpdate = await Auth.findOneAndUpdate(condition, userUpdate, {
        new: true,
      }).select("-password");
      res.status(200).json({
        success: true,
        message: "Updated profile successfully!",
        userUpdate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
      console.log(error);
    }
  }
}

module.exports = new authController();
