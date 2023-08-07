var createError = require("http-errors");
var express = require("express");
const bcrypt = require("bcrypt");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var adminRouter = require("./routes/admin");
var BlogDEtailRouter = require("./routes/blog_detail");
const Joi = require("joi");
var app = express();
app.use(express.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/admin", adminRouter);
app.use("/blog", BlogDEtailRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
