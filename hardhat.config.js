require("@nomiclabs/hardhat-waffle");
const fs = require('fs');

let apiMumbai, seedMumbai

try{
  apiMumbai = fs.readFileSync(".api.mumbai").toString().trim();
  seedMumbai = fs.readFileSync(".seed.mumbai").toString().trim();
} catch (err) {
  console.log('Error fetching seeds')
}

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
    mumbai: {
      url: apiMumbai,
      accounts: {
        mnemonic: seedMumbai,
        count: 1
      }
    }
  }
};
