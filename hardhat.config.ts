import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';

import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.PRIVATE_KEY}`,
      accounts: [process.env.METAMASK_KEY],
    },
    mainnet: {
      url: ``,
      accounts: [process.env.METAMASK_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
