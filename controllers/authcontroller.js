// auth model
const Auth = require("../models/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class authController {
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

      if (await argon2.verify(user.password, password)) {
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
    if (password != comfirmPassword) {
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
}

module.exports = new authController();
