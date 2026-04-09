const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db-connect");

const Router = require("./routes");

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/public", express.static("./public"))
app.use("/api", Router);

let port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running at http://localhost:${port}`));
