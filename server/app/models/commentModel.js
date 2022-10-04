const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    author: { ref: "Auth", type: Schema.Types.ObjectId },
    body: { type: String, require: true, trim: true },
    date: { type: Date, default: Date.now() },
    parentComment: {
      ref: "Comment",
      type: Schema.Types.ObjectId,
    },
    blog: {
      ref: "Blog",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
