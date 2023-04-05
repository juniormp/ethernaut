const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
  
  describe("Vault", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        Vault = await ethers.getContractFactory("Vault");
        contract = await Vault.connect(owner).deploy(ethers.utils.formatBytes32String("abc123"));
    })

    describe("Vault", function () {
      it("Should unlock the vault", async function () {
        expect(await contract.locked()).to.be.true;

        const password = await ethers.provider.getStorageAt(contract.address, 1)
        
        await contract.unlock(password);

        expect(await contract.locked()).to.be.false;
      });
    });
  });
   