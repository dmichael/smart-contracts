var fs = require('fs');
var Web3 = require('web3');
// const solc = require('solc')

// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const addresses = web3.eth.accounts;

let source = fs.readFileSync('RevenueShare.sol', 'utf8');

// console.log(data.toString());

let compiledContract = web3.eth.compile.solidity(source.toString());

console.log(compiledContract)

let gasEstimate = web3.eth.estimateGas({data: compiledContract.code});
// let compiledContract = solc.compile(source, 1);
// let abi = compiledContract.contracts[':RevenueShare'].interface;
// let bytecode = compiledContract.contracts[':RevenueShare'].bytecode;
//  let gasEstimate = web3.eth.estimateGas({data: bytecode});
// let RevenueShare = web3.eth.contract(compiledContract.abiDefinition);


// var contractData = RevenueShare.new.getData(addresses, {data: bytecode});
// var gasEstimate = web3.eth.estimateGas({data: contractData})
// Create the contract
const RevenueShare = web3.eth.contract(compiledContract.info.abiDefinition);

console.log(`Price of gas is ${web3.eth.gasPrice}.`);
// let gasEstimate = web3.eth.estimateGas({data: compiledContract.data});
console.log(`Estimated gas for contract creation ${gasEstimate}.`);

const params = {
  from: web3.eth.accounts[0],
  data: compiledContract.code,
  gas: gasEstimate * 10
};

const callback = (e, contract) => {
  if(e){
    console.error(e);
  }

  if(!e){
    if (!contract.address) {
      console.log(`Contract transaction send: TransactionHash: ${contract.transactionHash} waiting to be mined ...`);
    } else {
      console.log(`Contract minded! Addess: ${contract.address}`);
    }

  }
}
const revenueShare = RevenueShare.new(addresses, params, callback)
