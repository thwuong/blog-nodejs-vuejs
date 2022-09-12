// auth model
const Auth = require("../models/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class authController {
  async getUser(req, res, next) {
    try {
      const user = await Auth.findById(req.userId).select("-password");
      console.log(user);
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
        message: "username or password empty",
      });
    }
    try {
      const user = await Auth.findOne({ username: username });
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
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
      return res.status(401).json({
        success: false,
        message: "username or password empty",
      });
    }
    if (password !== comfirmPassword) {
      return res.status(402).json({
        success: false,
        message: "password not match",
      });
    }
    try {
      // hash password
      const hashPassword = await argon2.hash(password);
      const newUser = new Auth({
        username,
        password: hashPassword,
      });

      await newUser.save();
      // create token
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
    const filename = req.file?.filename || "";
    const { username, email } = req.body;
    const condition = { _id: req.userId };
    try {
      let userUpdate = {
        username,
        profile: {
          email,
          avatar: filename,
        },
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
