pragma solidity ^0.4.6;

contract RevenueShare {
  address public creator;
  mapping (uint => address) public shareholders;
  uint public numShareholders;

  event Disburse(uint _amount, uint _numShareholders);

  function RevenueShare(address[] addresses) payable {
    creator = msg.sender;
    numShareholders = addresses.length;

    for (uint i = 0; i < numShareholders; i++) {
      shareholders[i] = addresses[i];
    }
  }

  function shareRevenue() payable returns (bool success) {
    uint amount = msg.value / numShareholders;

    for (uint i = 0; i < numShareholders; i++) {
      if (!shareholders[i].send(amount)) throw;
    }

    Disburse(msg.value, numShareholders);
    return true;
  }

  function kill() {
    if (msg.sender == creator) suicide(creator);
  }
}
