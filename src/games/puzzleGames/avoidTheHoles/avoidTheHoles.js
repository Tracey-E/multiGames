import React, { Fragment } from "react";
import { CreateGame } from "./avoidHoles.js";

export function AvoidTheHoles() {
  let PlayBoard = CreateGame(5, 15);
  console.log(PlayBoard);

  //should get playboard and return a grid of cells and place into Fragment tags

 
      window.onload = function() {
  let board =  document.getElementById("board");
  console.log(board);
   board.append( PlayBoard.map(row => {
       return (
              <Fragment>
                {row.map(cell => {
                    return (
                        <div className="outerBoard">
                          <div className="board" id="board">
                              <div className="cell" data-status={cell.element.dataset.status}>
                            {cell.element}
                               </div>
                          </div>
                            <board/>
                        </div>
                    )
    })}
           </Fragment>
 );
}))
      }}
