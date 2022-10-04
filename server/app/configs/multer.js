const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(null, path.join("./uploads/avatar"));
    } else {
      cb(null, path.join("./uploads/image"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});
