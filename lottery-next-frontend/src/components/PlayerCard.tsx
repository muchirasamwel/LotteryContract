import React, { useState } from "react";
import Button from "./Button";

type Props = {
  joinDraw: () => Promise<void>;
  pickWinner: () => Promise<void>;
};

const PlayerCard = ({ joinDraw, pickWinner }: Props) => {
  const [joining, setjoining] = useState(false);
  const [pickingWinner, setpickingWinner] = useState(false);
  const handleJoinDraw = async () => {
    console.log("Join Draw");
    setjoining(true);
    await joinDraw();
    setjoining(false);
    console.log("Join Draw Done");
  };

  const handlePickWinner = async () => {
    console.log("Pick Winner");
    setpickingWinner(true);
    await pickWinner();
    setpickingWinner(false);
    console.log("Pick Winner Done");
  };
  return (
    <div className="p-4 border-2 border-gray-200 rounded-lg flex flex-col justify-center items-center">
      <div className="text-xl font-bold">Player Options</div>
      <Button loading={joining} onClick={handleJoinDraw}>
        Join Draw
      </Button>
      <Button
        loading={pickingWinner}
        className={"bg-red-400"}
        onClick={handlePickWinner}
      >
        Pick Winner
      </Button>
    </div>
  );
};

export default PlayerCard;
