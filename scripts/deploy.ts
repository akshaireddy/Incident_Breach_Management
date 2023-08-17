const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const IncidentManagement = await ethers.getContractFactory('IncidentManagement');
  const incidentManagement = await IncidentManagement.deploy();

  console.log('Contract address:', incidentManagement.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
