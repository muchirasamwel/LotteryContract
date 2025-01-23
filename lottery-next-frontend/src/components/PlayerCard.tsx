import React from "react";
import Button from "./Button";

type Props = {};

const PlayerCard = (props: Props) => {
  return (
    <div>
      <div className="text-xl font-bold">Player Options</div>
      <Button onClick={() => {}}>Join Draw</Button>
      <Button className={"bg-red-400"} onClick={() => {}}>
        Pick Winner
      </Button>
    </div>
  );
};

export default PlayerCard;
