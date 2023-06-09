const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { testDbConnection } = require("./src/config/db");
const { headers } = require("./src/middlewares/headers");

const users = require("./src/routes/users");
const posts = require("./src/routes/posts");
const comments = require("./src/routes/comments");
const likes = require("./src/routes/likes");
const friends = require("./src/routes/friends");
const app = express();
// require('./src/config/testdb')

app.use(headers);
testDbConnection();
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./src/uploads"));
app.use(cookieParser());

app.use("/users", users);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/likes", likes);
app.use("/friends", friends);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    status: err.status || 500,
    response: err.message,
  });
});

module.exports = app;
