const path = require('path');
const envPath = path.join(__dirname, './.env');
require('dotenv').config({ path: envPath });

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  contracts_directory: "./contracts",
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200   // Optimize for how many times you intend to run the code
        }
        //,evmVersion: <string> // Default: "istanbul"
      },
    }
  },
  networks: {
    networkCheckTimeout: 999999,
    development: {
      // host: "127.0.0.1",
      // port: 8545,
      network_id: "*",
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `http://127.0.0.1:8545`
      ),
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://rinkeby.infura.io/v3/5dd88d5454464db1b3fef72c5bd3064c`
      ),
      network_id: 4,
      gasPrice: 5000000000, // 5 gwei,
      timeoutBlocks: 200,
    },
    testnet: {
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://data-seed-prebsc-2-s1.binance.org:8545`
      ),
      network_id: 97,
      gasPrice: 5100000000, // 5.1 gwei,
      // skipDryRun: true
      timeoutBlocks: 200,
    },
    mainnet: {
      networkCheckTimeout: 999999,
      provider: () => new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `http://52.220.8.73:8545`
          // `https://bsc-dataseed1.ninicoin.io/`
      ),
      network_id: 56,
      // skipDryRun: true,
      timeoutBlocks: 200,
      gasPrice: 5100000000, // 5.1 gwei,
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: process.env.BSCSCAN_API_KEY,
  }
};
