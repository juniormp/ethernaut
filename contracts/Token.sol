// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    console.log(balances[msg.sender]);
    console.log(_value);
    console.log(balances[msg.sender] - _value);
    console.log(balances[msg.sender] - _value >= 0);
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    console.log(balances[msg.sender]);
    balances[_to] += _value;
    console.log(balances[_to]);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}