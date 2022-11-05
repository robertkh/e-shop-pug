////////////////////////////////////////////////////
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fileUpload = require("express-fileupload");

////////////////////////////////////////////////////
var app = express();

////////////////////////////////////////////////////
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

////////////////////////////////////////////////////
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

////////////////////////////////////////////////////
// Սա էլ պետք է հնարավորին շուտ կանչվի
const session = require("./middleware/session");
app.use(session);

const sessInit = require("./middleware/sessInit");
app.use(sessInit);

const numberOfVisits = require("./middleware/visits");
app.use(numberOfVisits);

////////////////////////////////////////////////////
var index = require("./router/index");
app.use("/", index);

var userRouter = require("./router/userRouter");
app.use("/user", userRouter);

var storeRouter = require("./router/storeRouter");
app.use("/store", storeRouter);

var messRouter = require("./router/messRouter");
app.use("/mess", messRouter);

var dashRouter = require("./router/dashRouter");
app.use("/dashboard", dashRouter);

// Խնդիրը ճյուղավորում չունենալու պատճառով շրջանցում ենք router-y
var { paymentCheckout } = require("./controllers/checkoutController");
app.post("/check", paymentCheckout);

var payRouter = require("./router/payRouter");
app.use("/paypal", payRouter);

////////////////////////////////////////////////////
// --- fileUpload
app.use(
  fileUpload({
    limits: {
      fileSize: 100 * 1024,
    },
  })
);

app.post("/upload", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const image = req.files.myFile;
  if (image.size > 100 * 1024) {
    console.log("Նկարի ծավալը գերազանցում է թույլատրելի սահմանը։");
    return;
  }

  const path = __dirname + "/public/images/" + image.name;

  image.mv(path, (error) => {
    if (error) {
      console.error(error);
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          status: "error",
          message: error,
        })
      );
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        status: "success",
        path: "/public/images/" + image.name,
      })
    );
  });
});

////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

////////////////////////////////////////////////////
module.exports = app;
