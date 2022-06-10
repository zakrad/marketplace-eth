const HDWalletProvider = require("@truffle/hdwallet-provider")
const keys = require("./keys.json")
module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `https://speedy-nodes-nyc.moralis.io/${keys.MORALIS_PROJECT_ID}/eth/ropsten`,
          addressIndex: 0
        }),
      network_id: 3,
      gas: 1500000, //Gas limit, how much gas we ware willing to spend
      gasPrice: 7000000000,//How much we are willing to spend for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, //number of blocks before deployment times out
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",
    },
  }
};


// > transaction hash:    0xbb93401d60588565dd11b8f52c4d8d387d7fb0fcc708c3239999b3e7e5666699
// > contract address:    0xa0DD372fE080a8C6Ee69ae9f54ed916e2Dfab7f5
