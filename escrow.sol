pragma solidity ^0.4.9;

contract Escrow {
  address public buyer;
  address public seller;
  uint public deposit;
  uint public timeToExpiry;
  uint public startTime;

  // Buyer sets up the escrow contract and pays the deposit
  function Escrow(address _seller, uint _timeToExpiry) payable {
    buyer = msg.sender;
    seller = _seller;
    deposit = msg.value;
    timeToExpiry = _timeToExpiry;
    startTime = now;
  }

  // Buyer releases deposit to seller
  function releaseToSeller(){
    if(msg.sender == buyer) {
      // Finish the contract and send all funds to the seller
      suicide(seller);
    } else {
      throw;
    }
  }
  // Buyer can withdraw deposit if escrow is expired
  function withdraw(){
    if(!isExpired()){
      throw;
    }
  }

  // Seller can cancel escrow and return all funds to buyer
  function cancel() {
    if(msg.sender == seller) {
      // Finish the contract and send all funds to the seller
      suicide(buyer);
    } else {
      throw;
    }
  }

  function isExpired() constant returns (bool){
    return (now > startTime + timeToExpiry);
    /*if (now > startTime + timeToExpiry) {
      return true;
    } else {
      return false;
    }*/
  }

}
