const jwt = require("jsonwebtoken");
const passport = (req, res, next) => {
  const authToken = req.headers["authorization"];
  // authorization Baser ádfkajsdlfjaskldfja
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRECT);
    req.userId = decodedToken.payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = passport;
