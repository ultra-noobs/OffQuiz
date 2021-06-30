var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var session = require("express-session");
var port = process.env.PORT || 5000;
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/LoginRouter");
var registerRouter = require("./routes/RegisterRouter");
var dashboardRoute = require("./routes/dashboardRouter");
const profileRoute = require("./routes/profile");
const cors = require("cors");

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/dashboard/", dashboardRoute);
app.use("/profile", profileRoute);

app.listen(port, () => {
  console.log("listening to port", port);
});

module.exports = app;
