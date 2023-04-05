const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
  
  describe("King", function () {

    let contract;
    let owner, user;
    let balanceBefore;
    let balanceAfter;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        King = await ethers.getContractFactory("King");
        contract = await King.connect(owner).deploy({
          value: ethers.utils.parseEther('100')
        });

        Attacker = await ethers.getContractFactory("Attacker");
        contractAttaker = await Attacker.connect(user).deploy();
    })

    describe("King", function () {
      it("Should to break it", async function () {
        expect(await contract.owner()).to.be.eq(owner.address);
        expect(await contract._king()).to.be.eq(owner.address);
        expect(await contract.prize()).to.be.eq(ethers.utils.parseEther('100'));
        expect(await ethers.provider.getBalance(contract.address)).to.eq(ethers.utils.parseEther('100'))

        balanceBefore = await ethers.provider.getBalance(user.address);
        contractAttaker.connect(user).attack(contract.address, {
          value: ethers.utils.parseEther('102')
        })
        balanceAfter = await ethers.provider.getBalance(user.address);
        expect(balanceBefore).to.be.eq(balanceAfter)
        expect(await ethers.provider.getBalance(contract.address)).to.eq(ethers.utils.parseEther('100'));

        console.log('contract address - ' + contract.address);
        console.log('attacker address - ' + contractAttaker.address);
        console.log('owner address - ' + owner.address);
        console.log('user address - ' + user.address);

        expect(await contract.owner()).to.be.eq(owner.address);
        expect(await contract._king()).to.be.eq(contractAttaker.address);
        expect(await contract.prize()).to.be.eq(ethers.utils.parseEther('102'));
        expect(await ethers.provider.getBalance(contract.address)).to.eq(ethers.utils.parseEther('100'));

        owner.sendTransaction({
          to: contract.address,
          value: ethers.utils.parseEther('103')
        })

        // expect(await contract.owner()).to.be.eq(owner.address);
        // expect(await contract._king()).to.be.eq(contractAttaker.address);
        // expect(await contract.prize()).to.be.eq(ethers.utils.parseEther('103'));
      });
    });
  });
   