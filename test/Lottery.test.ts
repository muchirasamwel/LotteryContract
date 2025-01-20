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
});
