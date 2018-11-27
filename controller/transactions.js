"use strict";


const Web3 = require('web3');
const getNodeURL = require('../getNodeURL');
const web3 = new Web3(new Web3.providers.HttpProvider(getNodeURL()))

function getBlock(n, cb){
  web3.eth.getBlock(n, function(err, block){
    cb(block);
  })
}

function GetTxByHash(hash, cb){
  web3.eth.getTransaction(hash, function(err, tx){
    cb(tx);
  });
}

const getTransactions = (req, res, next) => {
  return res.send({
    transactions: []
  });

  //TODO: loop only through the latest 100 block, no more
  function getTxs(blockNumber, transactions){

    getBlock(blockNumber, function(block){

      console.log('getting transactions of block ' + block.number);
      if(block.transactions.length){
        transactions = transactions.concat(block.transactions);
      }
      if(block.number == 0 && transactions.length == 0){
        return res.send({
          transactions: []
        });
      }      
      if(transactions.length >= 20 || block.number == 0){
        let transactionsResult = []
        transactions.forEach(function(hash, index){
          GetTxByHash(hash, function(tx){
            transactionsResult.push(tx);
            if(transactions.length == 0 || transactions.length == index + 1){
              return res.send({
                transactions: transactionsResult
              });
            }
          });
        });
      } else {
        getTxs(block.number - 1, transactions);
      }

    });
    
  }

  getTxs("latest", []);
  
};

const getTransactionByHash = (req, res, next) => {
  const { hash } = req.params;

  if (!hash) {
    res.status(422).end({
      transaction: null,
      error: {
        code: "MISSING_PARAMETER",
        message: "Missing hash param"
      }
    });
  }

  web3.eth.getTransaction(hash, function(err, tx){
    if (err || !tx) {
      res.status(404).send({
        transaction: null,
        error: {
          code: "NOT_FOUND",
          message: "Transaction not found"
        }
      });
    } else {
      res.send({
        transaction: tx
      });
    }
  });
};


module.exports = {
  getTransactions,
  getTransactionByHash
};
