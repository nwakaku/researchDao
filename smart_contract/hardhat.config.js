require("@nomicfoundation/hardhat-toolbox");

const ACCOUNT_PRIVATE_KEY =
  "2681881ef2ddd24cd569a5e5df1f34ac3f765f37ad7cffce76a9a7ee3c1fe7b8";
    
    
    /** @type import('hardhat/config').HardhatUserConfig */
    
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./src",
  },
  networks: {
    binance_testnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};
    

