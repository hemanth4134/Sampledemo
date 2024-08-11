const express = require("express");
const { validateAuth } = require("./auth");

let cors = require("cors");
let app = express();

app.disable("x-powered-by");
app.disable("etag");
app.use(express.json()); //parse application/json
app.use(express.urlencoded({ extended: true }));

let corsOptions = {
  origin: process.env.APP_HOSTING_URL,
};
app.use(cors(corsOptions));
//app.use([validateAuth]);

//configure
//User routes
app.use("/demoapplication", require("./routes/usermaster-routes"));
app.use("/demoapplication/categorymaster", require("./routes/categorymaster-routes"));
app.use("/demoapplication/productmaster", require("./routes/productmaster-routes"));

module.exports = app;