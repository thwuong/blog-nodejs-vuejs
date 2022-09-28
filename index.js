require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const connectDb = require("./db/connectdb");
const route = require("./routes");
//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
route(app);
app.use(bodyParser.urlencoded({ extended: false }));
connectDb();
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
