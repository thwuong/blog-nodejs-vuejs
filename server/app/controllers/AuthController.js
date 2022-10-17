// auth model
const Auth = require("../models/authModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
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
        const token = jwt.sign({ payload: user._id }, process.env.TOKEN_SECRET);
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
      const token = jwt.sign(
        { payload: newUser._id },
        process.env.TOKEN_SECRET
      );

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
    const file = req.file || "";
    const { username, email } = req.body;
    const condition = { _id: req.userId };

    try {
      let pathFile = "";
      if (file) {
        const user = await Auth.findOne(condition).select("avatar");
        if (user.avatar) {
          const arrTempt = user.avatar.split("/");
          const fileName = arrTempt[arrTempt.length - 1];
          let publicId = fileName.split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        pathFile = await cloudinary.uploader.upload(file.path);
      }
      const avatar = pathFile.secure_url;
      let userUpdate = {
        username,
        email,
        avatar,
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
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
}

module.exports = new authController();
