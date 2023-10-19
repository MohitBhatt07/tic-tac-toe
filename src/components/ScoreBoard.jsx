import React from "react";

import "./ScoreBoard.css";


export const ScoreBoard = ({ scores, xPlaying }) => {
  const { xScore, oScore } = scores;

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">ScoreBoard</div>
      <div className="score-both">
        <span className={`score x-score ${!xPlaying && "inactive-red"}`}>
          RED({scores.xScore}){" "}
        </span>
        <span className={`score o-score ${xPlaying && "inactive-blue"}`}>
          BLUE({scores.oScore}){" "}
        </span>
      </div>

    </div>
  );
};
