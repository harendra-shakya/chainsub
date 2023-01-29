require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    //deploy Factory
    const Factory = await ethers.getContractFactory('Factory', wallet);
    console.log('Deploying Factory...');
    const factory = await Factory.deploy();
    await factory.deployed()
    console.log('Factory deployed to:', factory.address);
    

}