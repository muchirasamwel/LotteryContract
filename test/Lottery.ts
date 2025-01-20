import hre from "hardhat";
import { expect } from "chai";
import { Lottery } from "../typechain-types";
import { ContractTransactionResponse } from "ethers";

describe("Lottery contract", function () {
  let lotteryContract: Lottery & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  this.beforeEach(async () => {
    const lotteryFactory = await hre.ethers.getContractFactory("Lottery");
    lotteryContract = await lotteryFactory.deploy();
    await lotteryFactory.getDeployTransaction();

    console.log("deployed...", lotteryContract.target);
  });

  it("Manager to be the contrant owner", async () => {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    expect(await lotteryContract.manager()).to.equal(owner);
  });
});
