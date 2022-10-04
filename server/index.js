require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const connectDb = require("./app/db/connectdb");
const route = require("./app/routes");
connectDb();
//middleware
app.use(
  cors({
    origin: "localhost:3001",
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
