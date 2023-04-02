// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    console.log(tx.origin); // user address
    console.log(msg.sender); // contract address
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}