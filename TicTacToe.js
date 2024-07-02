import React, { useState } from "react";
import "./TicTacToe.css"; // Import your CSS file for styling

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  const handleClick = (index) => {
    if (board[index] || winner) return; // If the cell is already filled or there's a winner, return

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard, index);
  };

  const checkWinner = (board, index) => {
    const winningConditions = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells(condition);
        return;
      }
    }

    // Check for tie
    if (board.every((cell) => cell !== null)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningCells([]);
  };

  // Function to determine if a cell index is part of a winning combination
  const isWinningCell = (index) => {
    return winningCells.includes(index) ? "winning-cell" : "";
  };

  return (
    <div className="tic-tac-toe">
      <h1>TIC-TAC-TOE</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? "filled" : ""} ${isWinningCell(index)}`}
            onClick={() => handleClick(index)}
          >
            {cell && <span className="symbol">{cell}</span>}
          </div>
        ))}
      </div>
      {winner && (
        <p
          className="result"
          style={{ color: winner === "X" ? "green" : "orange" }}
        >
          {winner === "Tie" ? "It's a Tie!" : `Player ${winner} won!`}
        </p>
      )}
      <button className="reset-button" onClick={resetGame}>
        RESET
      </button>
    </div>
  );
};

export default TicTacToe;
