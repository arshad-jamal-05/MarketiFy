const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./db-connect");

const Router = require("./routes");

// var corsOptions = {
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const allowedOrigins = [
  "http://localhost:5173",
  "https://marketify-atwv.onrender.com",
];

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);
// app.use(cors(corsOptions));
app.use(express.json());
app.use("/public", express.static("./public"));
app.use("/api", Router);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

let port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running at http://localhost:${port}`));
