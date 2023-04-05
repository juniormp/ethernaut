  const { expect } = require("chai");
const { ethers } = require("hardhat");
  
  describe("Delegate", function () {

    let contract;
    let owner;
    let Delegate;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        Delegate = await ethers.getContractFactory("Delegate");
        contract = await Delegate.connect(owner).deploy(owner.address);

        const Delegation = await ethers.getContractFactory("Delegation");
        contractDelegation = await Delegation.connect(owner).deploy(contract.address);

        console.log("owner address - " + owner.address);
        console.log("user address - " + owner.address);
        console.log("contract address - " + contract.address);
        console.log("contract delegation address - " + contractDelegation.address);
    })

    describe("Delegate", function () {
      it("Should claim ownership of the contract", async function () {
        expect(await contract.owner()).to.be.eq(owner.address);
        
        const result = await user.sendTransaction({
          to: contractDelegation.address,
          data: ethers.utils.formatBytes32String("pwn()")
        });
        //expect(result).to.be.equal(contractDelegation.address);
        
        expect(await contract.owner()).to.be.eq(owner.address);
        expect(await contractDelegation.owner()).to.be.eq(owner.address);
      });
    });
  });
  