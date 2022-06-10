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
            phrase: ""
          },
          providerOrUrl: `https://speedy-nodes-nyc.moralis.io/${keys.MORALIS_PROJECT_ID}/eth/ropsten`,
          addressIndex: 0
        }),
      network_id: 3,
      gas: 5500000, //Gas limit, how much gas we ware willing to spend
      gasPrice: 20000000000,//How much we are willing to spend for unit of gas
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
