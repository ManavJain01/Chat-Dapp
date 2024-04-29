const hre = require("hardhat");

async function main(){
  // const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  // const chatApp = await ChatApp.deploy();

  // await chatApp.deployed();

  // console.log(
  //   `Contract Address ${chatApp.address}`
  // );

  const ChatApp = await hre.ethers.deployContract("ChatApp");

  await ChatApp.waitForDeployment();

  console.log(`ChatApp deployed to ${await ChatApp.getAddress()}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
})