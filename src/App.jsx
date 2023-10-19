import React, { useState,useEffect } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';


const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [gameOver, setGameOver] = useState(false);
  const [iswinner,setWinner] = useState('');
  const [scores, setScores] = useState({xScore : 0 ,oScore : 0});

  useEffect(() => {
    const score = localStorage.getItem("scores");
    if (score) {
      setScores(JSON.parse(score));
    }
  }, []);
  

  

  const handleBoxClick = (boxIdx) => {
    
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    
    const winner = checkWinner(updatedBoard);
    console.log(winner);
    setWinner(winner);
    if (winner) {
      if (winner === "O") {
        let { oScore ,xScore} = scores;
        oScore += 1;
        localStorage.setItem("scores", JSON.stringify({"oScore" : oScore , "xScore" :xScore}));
        setScores({ ...scores, oScore })
      } else {
        let { oScore, xScore } = scores;
        xScore += 1;
        localStorage.setItem("scores", JSON.stringify({"oScore" : oScore , "xScore" :xScore}));
        setScores({ ...scores, xScore })
      }
    }
    
    
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      
      {(gameOver) && <p className="winner-status">
          {
           (iswinner ==='O')? "blue wins" : "red wins" 
        }</p>}
      <ResetButton resetBoard={resetBoard} />
      
      
    </div>
  );
}

export default App;
