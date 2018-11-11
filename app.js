const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jayson = require('jayson');

const indexRouter = require("./routes/index");
const blocksRouter = require("./routes/blocks");
const transactionsRouter = require("./routes/transactions");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

function getEnodeURL(req, res){
  const client = jayson.client.http(process.env.NODE_URL);
  client.request('admin_nodeInfo', null, function(err, result){
    if(err){
      res.send('Error fetching enodeURL');
    } else {
      res.send(res.result.enode)
    }
  })
}

app.use("/", indexRouter);
app.use("/api/enodeurl", getEnodeURL);
app.use("/api/blocks", blocksRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
