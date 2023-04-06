import * as dotenv from 'dotenv';
dotenv.config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";


const { TESTBSC_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    bscTest: {
      chainId: 97,
      url: TESTBSC_RPC_URL,
      accounts: [PRIVATE_KEY!]
    },
  },
  defaultNetwork: "bscTest",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
  
};

export default config;
