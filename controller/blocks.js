"use strict";

const web3 = require('../getWeb3');

const getBlocks = (req, res, next) => {
  web3.eth.getBlock("latest", function(err, block){
    if(err || ! block){
      console.log(err);
      return res.send({
        blocks: []
      });
    }
    
    const number = block.number;
    const batch = web3.createBatch();
    const blocks = [];

    for(var i = (number < 20 ? 0 : number - 20); i <= number ; i++){
      batch.add(web3.eth.getBlock.request(i, function(err, block){
        blocks.push(block);
      }));
    }

    batch.add(web3.eth.getBlockNumber.request(function(){
      res.send({
        blocks: blocks
      });
    }));

    batch.execute();
  })
};

const getBlockByHash = (req, res, next) => {
  const { hash } = req.params;

  if (!hash) {
    res.status(422).end({
      block: null,
      error: {
        code: "MISSING_PARAMETER",
        message: "Missing hash param"
      }
    });
  }

  // const block = mockBlocks.find(b => b.hash === hash);

  web3.eth.getBlock(hash, function(err, block){
    if (err) {
      res.status(404).send({
        block: null,
        error: {
          code: "NOT_FOUND",
          message: "Block not found"
        }
      });
    } else {
      res.send({
        block
      });
    }
  })

};

module.exports = {
  getBlocks,
  getBlockByHash
};
