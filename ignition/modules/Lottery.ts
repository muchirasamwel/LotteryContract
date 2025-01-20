import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Lottery = buildModule("Lottery", (m) => {
  const lottery = m.contract("Lottery");

  return { lottery };
});

export default Lottery;
