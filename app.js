var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
const { env } = require("process");
const helmet = require("helmet");
var app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(helmet());
app.use(logger("dev"));
app.set("trust proxy", true);
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", indexRouter);
//This is just a test
// var trans = db.runTransaction(i => {
//   return i.get(course_ref).then(doc => {
//     i.update(course_ref);
//   }).then(res => {
//     console.log("Added:dummy data")
//   }).catch(err => {
//     console.log(`${err} :failed`);
//   })
// })

var whitelist = ["https://ttp-capstone-project.web.app/"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Then pass them to cors:
app.use(cors(corsOptions));
//// error handling
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
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
