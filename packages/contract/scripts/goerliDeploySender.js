const hre = require("hardhat");
const fs = require('fs');

const superPlaceContract = require('../contract-address.json');
const hyperlaneContract = require('../libs/constant.json');

async function main() {
  const _opGoerliRecipient = superPlaceContract.address;
  const _mailbox = hyperlaneContract.goerli.mailbox;
  const _interchainGasPaymaster = hyperlaneContract.goerli.interchainGasPaymaster;
  const superPlaceSender = await hre.ethers.deployContract("superPlaceSender", [_opGoerliRecipient, _mailbox, _interchainGasPaymaster]);

  await superPlaceSender.waitForDeployment();

  console.log(
    `Deployed to ${superPlaceSender.target}`
  );

  const contractAddress = {
    addess: superPlaceSender.target
  }

  // Save the updated array to the JSON file
  fs.writeFileSync('goerli-sender-address.json', JSON.stringify(contractAddress, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
