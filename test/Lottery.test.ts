import { ethers } from "hardhat";
import { expect } from "chai";
import { Lottery } from "../typechain-types";
import { ContractTransactionResponse } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Lottery contract", function () {
  let owner: HardhatEthersSigner;
  let account1: HardhatEthersSigner;
  let account2: HardhatEthersSigner;

  let lotteryContract: Lottery & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  this.beforeEach(async () => {
    [owner, account1, account2] = await ethers.getSigners();

    const lotteryFactory = await ethers.getContractFactory("Lottery");
    lotteryContract = await lotteryFactory.deploy();
    await lotteryFactory.getDeployTransaction();

    console.log("deployed...", lotteryContract.target);
  });

  it("Manager is the contrant owner", async () => {
    expect(await lotteryContract.manager()).to.equal(owner);
  });

  it("An address can join draw", async () => {
    await lotteryContract
      .connect(account1)
      .joinDraw({ value: ethers.parseEther("0.001") });
    const players = await lotteryContract.getPlayers();
    expect(players).to.include(account1.address);
  });

  it("An address cant join draw without enough ether", async () => {
    try {
      await lotteryContract
        .connect(account2)
        .joinDraw({ value: ethers.parseEther("0.000001") });
    } catch (error: any) {
      // console.log("error.message", error.message);
      expect(error.message).to.include("reverted");
    }
    const players = await lotteryContract.getPlayers();
    expect(players).not.to.include(account2.address);
  });
});
