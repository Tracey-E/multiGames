import { CellDataState } from "./cellDataState";

import { GetSurrondingCells } from "./getSurrondingCells";
import { PrevCheckedCells } from "./preChecked";


export function OpenCells() {
  let cells = [];
  let count = CellDataState.props[0].cellData_surrondingCells.length;
  for (
    let i = 0;
    i < CellDataState.props[0].cellData_surrondingCells.length;
    i++
  ) {
    let cell = CellDataState.props[0].cellData_surrondingCells[i];
    if (cell.className === "hole") {
      count--;

      return;
    } else if (cell.className === "hidden" || cell.className === "number") {
    }
    if (count > 0) {
      cells.push(cell);
      count--;
      
    }
    if (count === 0) {
    

      cells.map((cell) => {
        if (PrevCheckedCells.props[0].preChecked.length > 0) {
          if (PrevCheckedCells.props[0].preChecked.indexOf(cell.id) > -1) {
          } else {
            GetSurrondingCells(cell);
          }
        }
      });
    }
  }
  let counters = document.getElementById("counter")
  let number =counters.childNodes[0].nodeValue 
  console.log(number)
if(number=== 0){
  alert('You won')
}
}
