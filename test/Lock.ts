import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const LockFactory = await ethers.getContractFactory("Lock");
    const lock = await upgrades.deployProxy(LockFactory, ["Lock"], {
       initializer: 'initialize'
      });


    return { lock, owner, otherAccount };
  }

  async function upgradeLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const {lock, ...others} = await loadFixture(deployLockFixture);
    const LockFactoryV2 = await ethers.getContractFactory("LockV2");
    const lockV2 = await upgrades.upgradeProxy(lock.address, LockFactoryV2);
    return {lock: lockV2, ...others};
  }


  describe("Deployment", function () {
    it("Should set the right lock name", async function () {
      const { lock } = await loadFixture(deployLockFixture);

      expect(await lock.getName()).to.equal("Lock");
    });
  });

  describe("Name", function () {
    it("Should ok to setName", async function () {
      const { lock } = await loadFixture(deployLockFixture);

      expect(await lock.getName()).to.equal("Lock");
      await lock.setName("CoolLock");
      expect(await lock.getName()).to.equal("CoolLock");

    });
  });

  describe("Upgarde", function () {
    it("Should ok to call getVersion", async function () {
      const { lock } = await loadFixture(upgradeLockFixture);

      expect(await lock.getName()).to.equal("Lock");
      expect(await lock.getVersion()).to.equal("2.0.0");

    });

    it("Name is stored after upgrade", async function () {
      const { lock } = await loadFixture(deployLockFixture);

      await lock.setName("OldLock");
      expect(await lock.getName()).to.equal("OldLock");
      const LockFactoryV2 = await ethers.getContractFactory("LockV2");
      const lockV2 = await upgrades.upgradeProxy(lock.address, LockFactoryV2);
      expect(await lockV2.getName()).to.equal("OldLock");
      expect(lock.address === lockV2.address).to.equal(true);
      expect(await lockV2.getVersion()).to.equal("2.0.0");

    });
  });
});
