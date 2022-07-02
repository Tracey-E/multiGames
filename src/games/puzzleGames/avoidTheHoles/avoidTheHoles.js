import React, { Fragment, StrictMode } from "react";
import { CreateGame } from "./components/avoidHoles.js";
import { Reveal } from "./components/avoidHoles.js";
import { MineCounter } from "./components/avoidHoles.js";
import { handleClicks } from "./components/buttonEvents.js";

const Tiles_Status = {
  HIDDEN: "hidden",
  HOLE: "hole",
  NUMBER: "number",
  MARKED: "marked",
};

export function AvoidTheHoles() {
  let PlayBoard = CreateGame(10, 15);

  let cells = [];

  let gridTemplateColumns = "repeat(" + PlayBoard.length + ",8%)";

  PlayBoard.map((row) => {
    return row.forEach((cell) => {
      let data = cell.element.dataset.status;
      let Cells = cell.element;
      Cells.append(data);

      let newBoard = [];

      newBoard.push(Cells);

      cells.push(newBoard);
    });
  });
 
  return (
    <Fragment>
      <StrictMode>
        <div className="AvoidTheHoles">
          <h1>Avoid the holes</h1>
          <h3>
            Mines to find <span id="counter">15</span>{" "}
          </h3>

          <div className="outerBoard">
            <div
              className="innerBoard"
              id="innerBoard"
              style={(gridTemplateColumns = { gridTemplateColumns })}
            >
              {cells.map((Item, i) => {
                Item.id = i;
              
                return (
                  <button
                    name="cellButton"
                    id={Item.id}
                    key={Item.id}
                    className={Item[0].dataset.status}
                   
                    style={{ backgroundColor: " white" }}
                    {...Item}
                    onClick={handleClicks}
                    onContextMenu={(e) => e.preventDefault()}
                    onAuxClick={handleClicks}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </StrictMode>
    </Fragment>
  );
}
