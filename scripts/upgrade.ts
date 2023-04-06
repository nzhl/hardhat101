import hre, { ethers, upgrades, network } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';

async function main() {
  const LockFactoryV2 = await ethers.getContractFactory("LockV2");
  const lock = await upgrades.upgradeProxy(process.env.LOCK as string, LockFactoryV2);
  const currentImplAddress = await getImplementationAddress(network.provider, lock.address);
  await hre.run('verify:verify', {
    address: lock.address, 
  });
  console.log(
    `Lock is upgraded to ${lock.address}, implementation address is ${currentImplAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
