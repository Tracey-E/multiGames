import { CellDataState } from "./cellDataState";
import { OpenCells } from "./openCells";
import { PrevCheckedCells } from "./preChecked";
const Tiles_Status = {
  HIDDEN: "hidden",
  HOLE: "hole",
  NUMBER: "number",
  MARKED: "marked",
};
let cellsUsed=[]
/* checking if the surronding cell status has a hole*/
export function cellCheck(cells, id) {
 
  let cell = id;
 let cellsToCheck = cells;
  let num = 0;

  //CellDataState.props[0].cellData_surrondingCells.push(cellsToCheck);
  CellDataState.props = [
    {
      cellData: [parseInt(cell.id)],
      cellData_id: cell.id,
      celldata_status: cell.className,
      cellData_surrondingCells: cellsToCheck,
    },
  ];

  cellsUsed.push( cell.id)
  PrevCheckedCells.props = [
    {
      preChecked: cellsUsed
    },
   ];

  for (let i = 0; i < cellsToCheck.length; i++) {
    if (cellsToCheck[i].className === "hole") {
  /**for each hole status in surronding cells add 1 */
      // eslint-disable-next-line no-loop-func
      cellsToCheck.map((items) => {
        if (items.className === "hole") {
          num++;
        }
      });

      if (num === 0) {
        cell.innerText = num;
        cell.style.backgroundColor = "green";
      } else if (num > 0) {
        cell.innerText = num;
        cell.style.backgroundColor = "orange";
      }
      cell.className = "number";
      cell.dataset.status = Tiles_Status.NUMBER;

      return cell;
    } else {
      cell.className = "number";
      cell.dataset.status = Tiles_Status.NUMBER;
      cell.style.backgroundColor = "green";
      cell.innerHTML = num;
    }
  }
 OpenCells();
  cellsToCheck = [];
}
