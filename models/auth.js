const { Schema, default: mongoose } = require("mongoose");
const profileSchema = new Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
});
const authSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile: { profileSchema },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", authSchema);
