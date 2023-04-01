  const { expect } = require("chai");
const { ethers } = require("hardhat");
  
  describe("CoinFlip", function () {

    let contract,
        owner,
        user1,
        user2;

    this.beforeEach(async () => {
        [owner, user1, user2] = await ethers.getSigners();

        const CoinFlip = await ethers.getContractFactory("CoinFlip");
        contract = await CoinFlip.connect(owner).deploy();
    })

    describe("Exploit", function () {
      it("Should guess the correct outcome 10 times in a row", async function () {
        //lastHash,call contract
        const factor = new ethers.BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968");
        let lastHash = 0;
        let consecutiveWins = 0;

        for (let index = 0; index < 10; index++) {

          // Mine a block
          await ethers.provider.send("evm_mine");

          // Get the block hash
          const blockNumber = await ethers.provider.getBlockNumber();
          const block = await ethers.provider.getBlock(blockNumber - 1);
          const blockValue = block.hash;

          // Withhold block if necessary
          if (lastHash === blockValue) {
            console.log("Withholding block");
            continue;
          }
          console.log(blockValue)
          // Flip a coin
          const coinFlip = blockValue / factor;
          const side = coinFlip == 1;
      
          // Guess the outcome
          const guess = consecutiveWins === 0;
      
          // Play the game
          let result;
          if (side === guess) {
            consecutiveWins++;
            result = "win";
          } else {
            consecutiveWins = 0;
            result = "lose";
          }
      
          console.log(`Round ${index}: ${result}`);
        }
      });
    });
  });
  