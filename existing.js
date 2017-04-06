const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const address = '0xc82506194f485f08894da606e0f402106047f000'

let source = fs.readFileSync('RevenueShare.sol', 'utf8');
const addresses = web3.eth.accounts;
// console.log(data.toString());

const compiled = web3.eth.compile.solidity(source.toString());
const RevenueShare = web3.eth.contract(compiled.info.abiDefinition);

// instantiate by address
const contract = RevenueShare.at(address);
// console.log(contract)
contract.shareRevenue.sendTransaction({
  from: web3.eth.accounts[0],
  to: contract.address,
  value: web3.toWei(1, "ether"),
  gas: 2000000
})

console.log(web3.fromWei(web3.eth.getBalance(addresses[0]), "ether"))
console.log(web3.fromWei(web3.eth.getBalance(addresses[1]), "ether"))
console.log(web3.fromWei(web3.eth.getBalance(addresses[2]), "ether"))

console.log(contract.numShareholders.call())
