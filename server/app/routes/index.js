const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const commentRouter = require("./commentRouter");
module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/comment", commentRouter);
};
