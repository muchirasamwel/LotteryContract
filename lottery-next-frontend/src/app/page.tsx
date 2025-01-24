"use client";
import GameStatus from "@/components/GameStatus";
import MetaMaskCard from "@/components/metaMASKCard";
import PlayerCard from "@/components/PlayerCard";
import { hooks, metaMask } from "@/utils/connectors/metaMASK";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address payable",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DrawClosed",
    type: "event",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      {
        internalType: "address payable[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joinDraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0x6cc78035CbF00111eB3fC03CE521e91000951C4D";

export default function Home() {
  const [prize, setPrize] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [manager, setManager] = useState("");
  const { useAccounts, useProvider } = hooks;
  const provider = useProvider();
  const accounts = useAccounts();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      metaMask.activate().catch(() => {});
    }, 1000);
  }, []);

  const joinDraw = async () => {
    try {
      const signer = provider?.getSigner(0);
      const lotteryContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      await lotteryContract.joinDraw({
        value: ethers.parseEther("0.001"),
      });
      const players = await lotteryContract.getPlayers();
      setPlayers(players);
      updateMessage("You have successfully joined Draw");
    } catch (e: any) {
      updateMessage(e.message);
    }
  };

  //pick winner
  const pickWinner = async () => {
    try {
      const signer = provider?.getSigner(0);
      const lotteryContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      await lotteryContract.pickWinner();
      const players = await lotteryContract.getPlayers();
      setPlayers(players);
      updateMessage("Winner picked successfully");
    } catch (e: any) {
      updateMessage(e.message);
    }
  };

  const updateMessage = (msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  useEffect(() => {
    const getManager = async () => {
      try {
        const signer = provider?.getSigner(0);
        const lotteryContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const manager = await lotteryContract.manager();
        setManager(manager);
        const players = await lotteryContract.getPlayers();
        setPlayers(players);

        const bal = await provider?.getBalance(contractAddress);
        setPrize(ethers.formatEther(bal?.toString() || "0"));
      } catch (e: any) {
        // console.error("initialization failed");
        console.log("Failed init", e);
      }
    };

    if (provider && accounts) {
      getManager();
    }
  }, [accounts, provider]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Lottery</h1>
        <p className="text-lg font-light">Join the lottery and win big</p>
      </header>
      {message && (
        <div
          className={
            "text-center " + message.includes("success")
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {message}
        </div>
      )}
      <main className="w-full flex flex-row items-center justify-between flex-wrap gap-8">
        <GameStatus players={players} manager={manager} prize={prize} />
        <PlayerCard joinDraw={joinDraw} pickWinner={pickWinner} />

        <MetaMaskCard />
      </main>
    </div>
  );
}
