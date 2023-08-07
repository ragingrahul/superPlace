require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    OPGoerli: {
      url: "https://optimism-goerli.publicnode.com",
      accounts: [PRIVATE_KEY],
    },
    BaseGoerli: {
      url: "https://goerli.base.org",
      accounts: [PRIVATE_KEY],
    },
    ZoraGoerli: {
      url: "https://testnet.rpc.zora.energy",
      accounts: [PRIVATE_KEY],
      // https://testnet.explorer.zora.energy
      // https://bridgetozora.world/
    },
    ModeSepolia: {
      url: "https://sepolia.mode.network",
      accounts: [PRIVATE_KEY],
      // https://sepolia.explorer.mode.network/
      // https://bridge.mode.network/
    },
  }
};
