import { ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  const Contract = await ethers.getContractFactory('DocumentAuthentication');
  const contract = await Contract.deploy();

  await contract.deployed();

  fs.writeFileSync(
    './src/shared/infra/blockchain/index.ts',
    `export const documentAddress = '${contract.address}';`,
  );

  console.log(
    `Lock with ETH and unlock timestamp deployed to ${contract.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
