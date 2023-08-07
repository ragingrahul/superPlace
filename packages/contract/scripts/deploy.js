// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const superPlace = await hre.ethers.deployContract("SuperPlace");

  await superPlace.waitForDeployment();

  console.log(
    `Deployed to ${superPlace.target}`
  );

  const contractAddress = {
    address: superPlace.target
  }

  // Save the updated array to the JSON file
  fs.writeFileSync('contract-address.json', JSON.stringify(contractAddress, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
