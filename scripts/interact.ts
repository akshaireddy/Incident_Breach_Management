import { artifacts, ethers } from "hardhat";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

async function main() {
  const [deployer] = await ethers.getSigners();
  // const contractInfo = JSON.parse(fs.readFileSync('contract-info.json'));


  // const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractAddress = '0x0C963072c7d4140168F7C32861b0F41E89fcD2C7';

  const contractABI = JSON.parse(fs.readFileSync('./artifacts/contracts/IncidentManagement.sol/IncidentManagement.json', 'utf8'));

  const incidentManagement = new ethers.Contract(contractAddress, contractABI, deployer);

  // Report an incident
  const reportTx = await incidentManagement.reportIncident('Incident description', 1);
  await reportTx.wait();
  console.log('Incident reported:', reportTx.hash);

  // Update incident status
  const updateTx = await incidentManagement.updateIncidentStatus(1, 2);
  await updateTx.wait();
  console.log('Incident status updated:', updateTx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
