require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const connectDb = require("./db/connectdb");
const route = require("./routes");
//middleware
app.use(
  cors({
    origin: `http://localhost:${port}`,
  })
);
app.use(bodyParser.json());
connectDb();
route(app);
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
