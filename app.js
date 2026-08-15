const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

//                 auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
})
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


const allRoutes = require('./routes/allRoutes');


//--------------------database connection---------------
mongoose.connect(
  "mongodb+srv://arj181612_db_user:QJIppnzJcKkxZUkj@cluster0.y2nuaxh.mongodb.net/all-dataa?appName=Cluster0",
)
.then(() => {
app.listen(port, () => {
console.log(`http://localhost:3000/ ${port}`);
});
})
.catch((err) => {
console.log(err);
});
app.use(allRoutes);
