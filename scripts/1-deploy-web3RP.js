const fs = require('fs');
const {network, ethers} = require("hardhat");

async function main() {

    let object = {}
    const Web3RPFactory = await ethers.getContractFactory("Web3RPFactory");

    const web3RPFactory = await Web3RPFactory.deploy();
    await web3RPFactory.deployed();

    object.web3rp = web3RPFactory.address;
    console.log("🚀 web3RP Deployed:", web3RPFactory.address, 'at network ', network.name)

    fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(object, undefined, 2));
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});