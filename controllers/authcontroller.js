// auth model

class authController {
  login(req, res) {
    res.send("login");
  }
  register(req, res) {
    res.send("register");
  }
}

module.exports = new authController();
