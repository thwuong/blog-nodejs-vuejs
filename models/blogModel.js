const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema(
  {
    author: { ref: "Auth", type: Schema.Types.ObjectId },
    title: { type: String, require: true, trim: true },
    body: { type: String },
    image: {
      type: String,
    },
    meta: {
      votes: { type: Number, default: 0 },
      favs: { type: Number, default: 0 },
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
