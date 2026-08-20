require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//                 auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const allRoutes = require("./routes/allRoutes");

app.use(allRoutes);
//--------------------database connection---------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:3000/ ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);

  });
