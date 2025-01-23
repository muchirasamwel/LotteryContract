import React, { useEffect } from "react";

type Props = {};

const GameStatus = (props: Props) => {
  useEffect(() => {}, []);
  return (
    <div>
      <div className="text-xl font-bold">Game Status</div>
      <div className="text-lg font-normal">Entries</div>
      <ul className="text-lg font-normal text-green-700">
        <li>0x1234</li>
        <li>0x5678</li>
      </ul>
    </div>
  );
};

export default GameStatus;
