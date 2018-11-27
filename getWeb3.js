const Web3 = require('web3');
const getNodeURL = require('./getNodeURL');
const web3 = new Web3(new Web3.providers.HttpProvider(getNodeURL()));

module.exports = web3;