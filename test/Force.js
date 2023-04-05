const { expect } = require("chai");
const { ethers } = require("hardhat");
  
  describe("Force", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        Force = await ethers.getContractFactory("Force");
        contract = await Force.connect(owner).deploy();
    })

    describe("Force", function () {
      it("Should make the balance of the contract greater than zero", async function () {
        expect(await ethers.provider.getBalance(contract.address)).to.be.eq(0);

        const ForceAttack = await ethers.getContractFactory("ForceAttack");
        const contractAttack = await ForceAttack.deploy(contract.address, {
          value: ethers.utils.parseEther("100"),
        });
        await contractAttack.deployTransaction.wait();

        expect(await ethers.provider.getBalance(contract.address)).to.be.eq(ethers.utils.parseEther("100"));
      });
    });
  });
   