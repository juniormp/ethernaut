  const { expect } = require("chai");
  
  describe("Telephone", function () {

    let contract;
    let owner;

    this.beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const Telephone = await ethers.getContractFactory("Telephone");
        contract = await Telephone.connect(owner).deploy();

        const TelephoneExploit = await ethers.getContractFactory("TelephoneExploit");
        contractExploit = await TelephoneExploit.connect(user).deploy(contract.address);

        console.log('Telephone address: ' + contract.address);
        console.log('TelephoneExploit address: ' + contractExploit.address);
        console.log('owner address: ' + owner.address);
        console.log('user address: ' + user.address);
    })

    describe("Telephone", function () {
      it("Should claim ownership of the contract", async function () {
        expect(await contract.owner()).to.be.eq(owner.address);
        expect(await contractExploit.contractAddrs()).to.be.eq(contract.address);

        await contractExploit.callChangeOwner();
        
        expect(await contract.owner()).to.be.eq(user.address);
      });
    });
  });
  