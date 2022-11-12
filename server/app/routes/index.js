const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/post", postRouter);
  app.use("/api/comment", commentRouter);
};
