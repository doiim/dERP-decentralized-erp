require('@nomiclabs/hardhat-waffle')
const fs = require('fs')

let apiMumbai, seedMumbai
let temp = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
  },
}

try {
  apiMumbai = fs.readFileSync('.api.mumbai').toString().trim()
  seedMumbai = fs.readFileSync('.seed.mumbai').toString().trim()
  temp.mumbai = {
    url: apiMumbai,
    accounts: {
      mnemonic: seedMumbai,
      count: 1,
    },
  }
} catch (err) {
  console.log('Error fetching seeds')
}

module.exports = temp
