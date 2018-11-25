function getNodeURL(){
    var rgx = /^blockchain-explorer(-\w+)?-\w+-\w+$/;
    var podName = process.env.MY_POD_NAME;
    var match = podName.match(rgx);
    var extra = "";
    var nodeURL = "";

    if(match[1]){
        extra = match[1].replace('-', '_');
    }

    nodeURL = 'http://' + process.env['NODE_RPC_SERVICE' + extra + '_SERVICE_HOST'] + ':8545';

    console.log(nodeURL);

    return nodeURL;
}

module.exports = getNodeURL;