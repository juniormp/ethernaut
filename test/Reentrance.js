const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
  
  describe("Reentrance", function () {

    let contract;
    let owner;
    let attacker;

    this.beforeEach(async () => {
        [owner, user, user2] = await ethers.getSigners();

        const Reentrance = await ethers.getContractFactory("Reentrance");
        contract = await Reentrance.connect(owner).deploy();

        const AttackerReentrance = await ethers.getContractFactory("AttackerReentrance");
        attacker = await AttackerReentrance.connect(user2).deploy(contract.address);

        console.log('contract - ' + contract.address);
        console.log('attacker - ' + attacker.address);
    })

    describe("Reentrance", function () {
      it("Should steal all the funds from the contract", async function () {
        await contract.connect(owner).donate(user.address, { value: ethers.utils.parseEther("100") });
        expect(
          await contract.connect(owner).balanceOf(user.address)
        ).to.be.eq(ethers.utils.parseEther("100"));
        expect(
          await ethers.provider.getBalance(contract.address)
        ).to.be.eq(ethers.utils.parseEther("100"));

        await attacker.connect(user2).deposit({ value: ethers.utils.parseEther("2")})

        expect(
          await contract.connect(user2).balanceOf(attacker.address)
        ).to.be.eq(ethers.utils.parseEther("2"));
        expect(
          await ethers.provider.getBalance(contract.address)
        ).to.be.eq(ethers.utils.parseEther("102"));

        const balanceContractBefore = await ethers.provider.getBalance(contract.address);
        const balanceUserBefore = await ethers.provider.getBalance(user.address);

        console.log('start');
        await attacker.connect(user2).attack();
        console.log('finish');
      
        const balanceUserAfter = await ethers.provider.getBalance(user2.address);

        expect(
          await ethers.provider.getBalance(contract.address)
        ).to.be.eq(ethers.utils.parseEther("0"));        
      });
    });
  });
   