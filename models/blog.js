const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema(
  {
    author: { ref: "Auth", type: Schema.Types.ObjectId },
    title: { type: String, require: true, trim: true },
    body: { type: Text },
    meta: {
      votes: { type: Number },
      favs: { type: Number },
    },
    tags: {
      type: String,
      enum: ["Technology", "Entertainment", "Law", "Sports", "Orther"],
      default: "Orther",
    },
    comments: [
      {
        ref: "Comment",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
