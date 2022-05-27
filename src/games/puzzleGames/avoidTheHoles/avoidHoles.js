/** creating a game like minesweeper */
import React, { Suspense, Fragment } from "react";
// export game
export function CreateGame(boardSize, numberOfHoles) {
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
        const element = document.createElement("div");
       element.dataset.status = Tiles_Status.HIDDEN;
      const cell = {
          element,
        i,
        j,
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
}

const Tiles_Status = {
    HIDDEN: "hidden",
    HOLE: "hole",
    NUMBER: "number",
    MARKED: "marked",
   
}
