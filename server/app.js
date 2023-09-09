var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const color = require("colors");
require("dotenv").config();

var usersRouter = require("./routes/userRoutes");
var cliniqueRouter = require("./routes/cliniqueRoutes");
var rendezVousRouter = require("./routes/rendezVousRoutes");
var departementRouter = require("./routes/departementRoutes");
var serviceRouter = require("./routes/serviceRoutes");

var app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization', 'x-auth-token'],
  credentials: true

}));


app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




app.use("/api/users", usersRouter);
app.use("/api/clinique", cliniqueRouter);
app.use("/api/rendezVous", rendezVousRouter);
app.use("/api/departement", departementRouter);
app.use("/api/service", serviceRouter);

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
  res.json("error");
});

// Connection to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB".yellow);
  })
  .catch((err) => {
    console.log(err.message);
  });

//------------------ Connection to the Server --------------------------------------//
const server = http.createServer(app);
server.listen(5000, () => {
  console.log("app is running on port 5000".bold);
});

module.exports = app;
