import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const SHIMMER_EVM_TESTNET_RPC_URL = "https://json-rpc.evm.testnet.shimmer.network";
const SHIMMER_EVM_MAINNET_RPC_URL = "https://json-rpc.evm.shimmer.network";

const IOTA_EVM_TESTNET_RPC_URL = "https://json-rpc.evm.testnet.iotaledger.net";
const IOTA_EVM_MAINNET_RPC_URL = "https://json-rpc.evm.iotaledger.net";

const ACCOUNTS = process.env.DEPLOYER_ACCOUNT_PRIV_KEY
  ? [`${process.env.DEPLOYER_ACCOUNT_PRIV_KEY}`]
  : [];

module.exports = {
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: false,
  },
  networks: {
    hardhat: { chainId: 31337 },
    sepolia: {
      chainId: 11155111,
      url: "https://sepolia.infura.io/v3/e03e4a06686b4c2eb0c5eb91de4759da",
      accounts: ACCOUNTS,
    },
    amoy: {
      chainId: 80002,
      url: "https://polygon-amoy.infura.io/v3/e03e4a06686b4c2eb0c5eb91de4759da",
      accounts: ACCOUNTS,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "G9142R7YENGEYRPX9RH8FH56QYYTTMHPJD",
      amoy: "AHW85A1UTQWJC99E477Q5C3UH2IYYWMRVV",
    },
    customChains: [
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",  
          browserURL: "https://amoy.polygonscan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  solidity: {
    version: "0.8.22",
    settings: {
      evmVersion: "paris",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
//OFT Adapter Contract Address on sepolia - 0x57E09F8D3E4E77C967F22Bc3cbD3511d458e6A2a
//OFT Contract address on amoy - 0x3a20ec5b7fe167450d6494A4FD541deC91c50c45