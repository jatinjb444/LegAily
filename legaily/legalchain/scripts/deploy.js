const hre = require("hardhat");

async function main() {
  // Compile if needed (optional)
  await hre.run("compile");

  // Get the ContractFactory
  const LegalDocument = await hre.ethers.getContractFactory("LegalDocument");

  // Deploy contract with initial hash
  const contract = await LegalDocument.deploy("QmYourInitialHashHere");

  // Wait for the deployment to complete
  await contract.waitForDeployment(); // ← this line is important for newer Hardhat/Ethers versions

  console.log(`LegalDocument deployed to: ${contract.target}`); // contract.target is the deployed address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
