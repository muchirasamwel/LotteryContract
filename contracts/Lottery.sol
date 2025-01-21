// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
   address payable [] public players;
   address public manager;
   event DrawClosed(address payable,uint amount);

   constructor (){
      manager=msg.sender;
   }

   function joinDraw() external payable{
      require(msg.value > 0.0009 ether,"You need to send atleast 0.001 ether");
      players.push(payable (msg.sender));
   }

   function random() private view returns (uint) {
      return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
   }

   function pickWinner() external restricted {
      uint index = random() % players.length;
      players[index].transfer(address(this).balance);
      emit DrawClosed(players[index],address(this).balance);
      players = new address payable [](0);
   }

   function getPlayers() external view restricted returns (address payable [] memory){
      return players;
   }

   modifier restricted(){
      require(manager==msg.sender, "You are not the manager. Only the manager can trigger this method");
      _;
   }
}