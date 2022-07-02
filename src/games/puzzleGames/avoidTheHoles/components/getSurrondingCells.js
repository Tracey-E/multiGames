import { cellCheck } from "./cellCheck";

/* function to check cells position and get the surronding cells from the position */
export function GetSurrondingCells(cell) {
  let cellWidth = cell.clientWidth;
  let cellHeight = cell.clientHeight;
  let cellPosition = cell.getBoundingClientRect();
  let cellPot = cell.parentElement.getBoundingClientRect();

  let bottom = cellPot.bottom - cellPosition.bottom;
  let top = Math.abs(cellPot.top - cellPosition.top);
  let left = Math.abs(cellPot.left - cellPosition.left);
  let right = cellPot.right - cellPosition.right;

  let nu = parseInt(cell.id);
  /* get the 8 possible cells that circle the current cell */
  const nextCell = cell.nextElementSibling;
  const preCell = cell.previousElementSibling;

  const nextRowNextColCell = document.getElementById(nu + 9);
  const preRowPreColCell = document.getElementById(cell.id - 9);

  const nextRowCell = document.getElementById(nu + 10);
  const preRowCell = document.getElementById(cell.id - 10);

  const preColCell = document.getElementById(cell.id - 11);
  const nextColCell = document.getElementById(nu + 11);

  let cellsToCheck = [];
  if (cell.className === "hole") {
    alert("you lose");

    /* check cells on left edge  but not corners*/
  } else if (left < cellWidth && top > cellHeight && bottom > cellHeight) {
   
    cellsToCheck.push(
      nextCell,
      nextRowCell,
      preRowCell,
      nextColCell,
      preRowPreColCell
    );
    cellCheck(cellsToCheck, cell);
    /* check cells on right edge  but not corners*/
  } else if (
    top > cellHeight &&
    right < cellWidth &&
    bottom > cellHeight &&
    left > cellWidth
  ) {

    cellsToCheck.push(
      preCell,
      nextRowCell,
      preRowCell,
      preColCell,
      nextRowNextColCell
    );
    cellCheck(cellsToCheck, cell);

    cellsToCheck = [];
    /* check cells on top edge  but not corners*/
  } else if (
    top < cellHeight &&
    right > cellWidth &&
    bottom > cellHeight &&
    left > cellWidth
  ) {

    cellsToCheck.push(
      nextCell,
      preCell,
      nextRowCell,
      nextRowNextColCell,
      nextColCell
    );
    cellCheck(cellsToCheck, cell);
    cellsToCheck = [];
    /* check cells on bottom edge  but not corners*/
  } else if (
    bottom < cellHeight &&
    right > cellWidth &&
    top > cellHeight &&
    left > cellWidth
  ) {
   
    cellsToCheck.push(
      nextCell,
      preCell,
      preRowPreColCell,
      preRowCell,
      preColCell
    );
    cellCheck(cellsToCheck, cell);
    cellsToCheck = [];

    /* check cells on top left corner */
  } else if (
    top < cellHeight &&
    right > cellWidth &&
    bottom > cellHeight &&
    left < cellWidth
  ) {
  
    cellsToCheck.push(nextCell, nextRowCell, nextColCell);
    cellCheck(cellsToCheck, cell);
    cellsToCheck = [];

    /* check cells on top right corner */
  } else if (
    top < cellHeight &&
    right < cellWidth &&
    bottom > cellHeight &&
    left > cellWidth
  ) {
  
    cellsToCheck.push(preCell, nextRowCell, nextRowNextColCell);
    cellCheck(cellsToCheck, cell);

    cellsToCheck = [];

    /* check cells on bottom left corner */
  } else if (
    top > cellHeight &&
    right > cellWidth &&
    bottom < cellHeight &&
    left < cellWidth
  ) {
 
    cellsToCheck.push(nextCell, preRowCell, preRowPreColCell);
    cellCheck(cellsToCheck, cell);

    cellsToCheck = [];
    /* check cells on bottom right corner */
  } else if (
    top > cellHeight &&
    right < cellWidth &&
    bottom < cellHeight &&
    left > cellWidth
  ) {
 
    cellsToCheck.push(preCell, preRowCell, preColCell);
    cellCheck(cellsToCheck, cell);

    cellsToCheck = [];

    /** check all others */
  } else {
  
    cellsToCheck.push(
      nextCell,
      preCell,
      nextRowCell,
      preRowCell,
      nextColCell,
      preRowPreColCell,
      nextRowNextColCell,
      preColCell
    );
    cellCheck(cellsToCheck, cell);

    cellsToCheck = [];
  }
}
