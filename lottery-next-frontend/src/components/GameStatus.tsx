import React, { useEffect } from "react";

type Props = { manager?: string; players?: string[]; prize?: string };

const GameStatus = ({ manager, players, prize }: Props) => {
  return (
    <div className="p-4 border-2 border-gray-200 rounded-lg flex flex-col justify-center items-center">
      <div className="text-xl font-bold">Game Status</div>
      <div className="text-lg font-bold">Prize</div>
      <ul className="text-lg font-bold text-green-700">
        <li>{prize}</li>
      </ul>
      <div className="text-lg font-normal">Manager</div>
      <ul className="text-lg font-normal text-green-700">
        <li>{manager}</li>
      </ul>
      <div className="text-lg font-normal">Entries</div>
      <ul className="text-lg font-normal text-green-700">
        {players?.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameStatus;
