import hre, { ethers, upgrades, network } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';


async function main() {
  const LockFactory = await ethers.getContractFactory("Lock");
  const lock = await upgrades.deployProxy(LockFactory, ["Lock"], {
     initializer: 'initialize'
  });
  await lock.deployed();


  const currentImplAddress = await getImplementationAddress(network.provider, lock.address);
  await hre.run('verify:verify', {
    address: lock.address, 
  });
  console.log(
    `Lock is deployed to ${lock.address}, implementation address is ${currentImplAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
