"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("playing");
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const checkWinner = board => {
  const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // columns
  [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== "")) {
    return "draw";
  }
  return null;
}
  const makeMove = index => {
  if (board[index] !== "" || gameStatus !== "playing" || isComputerTurn) return;
  const newBoard = [...board];
  newBoard[index] = "X";
  setBoard(newBoard);
  const result = checkWinner(newBoard);
  if (result) {
    setGameStatus("finished");
    setWinner(result);
    return;
  }
  setIsComputerTurn(true);

  // Computer move after a delay
  setTimeout(() => {
    const emptyCells = newBoard.map((cell, i) => cell === "" ? i : null).filter(i => i !== null);
    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[randomIndex] = "O";
      setBoard([...newBoard]);
      const computerResult = checkWinner(newBoard);
      if (computerResult) {
        setGameStatus("finished");
        setWinner(computerResult);
      }
    }
    setIsComputerTurn(false);
  }, 500);
}
  const resetGame = () => {
  setBoard(["", "", "", "", "", "", "", "", ""]);
  setCurrentPlayer("X");
  setGameStatus("playing");
  setWinner(null);
  setIsComputerTurn(false);
}


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8 flex flex-col items-center justify-center"
        data-component-id="root-panel">
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
          data-component-id="game-container">
          <h1
            className="text-4xl font-bold text-center mb-6 text-gray-800"
            data-component-id="game-title">
            Tic-Tac-Toe
          </h1>
          <div
            className="text-center mb-6 text-lg font-semibold"
            data-component-id="status-display">
            {gameStatus === 'playing' ? isComputerTurn ? 'Computer thinking...' : 'Your turn (X)' : winner === 'X' ? 'You Win! 🎉' : winner === 'O' ? 'Computer Wins! 🤖' : 'It\'s a Draw! 🤝'}
          </div>
          <div
            className="grid grid-cols-3 gap-2 mb-6 bg-gray-200 p-4 rounded-lg"
            data-component-id="game-board">
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(0)}
              disabled={board[0] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-0">
              {board[0]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(1)}
              disabled={board[1] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-1">
              {board[1]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(2)}
              disabled={board[2] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-2">
              {board[2]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(3)}
              disabled={board[3] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-3">
              {board[3]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(4)}
              disabled={board[4] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-4">
              {board[4]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(5)}
              disabled={board[5] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-5">
              {board[5]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(6)}
              disabled={board[6] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-6">
              {board[6]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(7)}
              disabled={board[7] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-7">
              {board[7]}
            </button>
            <button
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg h-20 w-20 flex items-center justify-center text-3xl font-bold text-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => makeMove(8)}
              disabled={board[8] !== '' || gameStatus !== 'playing' || isComputerTurn}
              data-component-id="cell-8">
              {board[8]}
            </button>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
            onClick={resetGame}
            data-component-id="reset-button">
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}