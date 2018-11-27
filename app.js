const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const web3 = require('./getWeb3');
const jayson = require('jayson');

const indexRouter = require("./routes/index");
const blocksRouter = require("./routes/blocks");
const transactionsRouter = require("./routes/transactions");
const getNodeURL = require('./getNodeURL');
const getDiscoveryURL = require('./getDiscoveryURL');

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
  const client = jayson.client.http(getNodeURL());
  client.request('admin_nodeInfo', null, function(err, result){
    if(err){
      res.send('Error fetching enodeURL');
    } else {
      res.send(result.result.enode.replace('[::]', getDiscoveryURL().slice(7).slice(0,-5)));
    }
  })
}

function fund(req, res){
  const address = req.body.address;
  if(!address || !web3.isAddress(address.trim())){
    return res.send('Invalid address');
  } else {
    web3.eth.sendTransaction({from: "0x24dac5d8336883f97a068823971d5e7cf1b0ecf6", value: web3.toWei(1, 'ether'), to: address}, function(err, result){
      console.log(result);
      res.send(err ? "Something goes wrong ! Couldn't fund your account." : "Your account has been funded 1 Ether.");
    });
  }
}

app.use("/", indexRouter);
app.use("/api/blocks", blocksRouter);
app.use("/api/transactions", transactionsRouter);

app.get("/api/enodeurl", getEnodeURL);
app.post("/api/fund", fund);

app.use("/*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
