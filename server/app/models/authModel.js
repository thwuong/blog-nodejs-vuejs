const { Schema, default: mongoose } = require("mongoose");

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
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dmf8jfmss/image/upload/v1666176522/default-avatar-profile-icon-of-social-media-user-vector_rfjmey.jpg",
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", authSchema);
