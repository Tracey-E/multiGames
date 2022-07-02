/** creating a game like minesweeper */
import { GetSurrondingCells } from "./getSurrondingCells";
import { useState } from "react";
import { CellDataState } from "./cellDataState";
import { MouseCalls } from "./buttonEvents";
/**possible tile status */
const Tiles_Status = {
  HIDDEN: "hidden",
  HOLE: "hole",
  NUMBER: "number",
  MARKED: "marked",
};

document.addEventListener("oncontextmenu", this, false);

let counter;
/** creating the board  and tiles */
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
  if (numberOfHoles > 0) {
    console.log(numberOfHoles);
    for (let k = 0; k < numberOfHoles; k++) {
      const randomRow = Math.floor(Math.random() * boardSize);
      const randomCol = Math.floor(Math.random() * boardSize);
      const randomCell = board[randomRow][randomCol];
    
      if(randomCell.element.dataset.status === 'hidden'){
      randomCell.element.dataset.status = Tiles_Status.HOLE;
    } else {
      
    }
  }
  }
  counter = numberOfHoles;

  return board;
}

/** used to check what the tile status of clicked cell */
export function RightClickReveal(e) {
  let id = e.target.id;

  let cel = document.getElementById(id);
  console.log(counter);
  if (counter === 0) {
    alert("Congratulations you avoided all the holes");
  }

  if (cel.style.backgroundColor === "white") {
    cel.style.backgroundColor = "blue";
    cel.dataset.status = Tiles_Status.MARKED;
    counter--;
    console.log(counter);

    let count = document.getElementById("counter");
    count.innerHTML = counter;
    return;
  } else if (cel.style.backgroundColor === "blue") {
    cel.style.backgroundColor = "white";
    cel.dataset.status = Tiles_Status.HIDDEN;
    counter++;
    console.log(counter);
    let count = document.getElementById("counter");
    count.innerHTML = counter;

    return;
  }
}

export function Reveal(e) {
  const cell = document.getElementById(e.target.id);
  const status = e.target.className;

  if (status === "hole") {
    alert("you lose");
  } else if (status === "hidden" || status === "number") {
  }
  GetSurrondingCells(cell);
}
