import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function PuzzlePage() {
  return (
    <Fragment>
      <div className="puzzles" id="PuzzlePage">
        <h1>Puzz</h1>
        <ul tabIndex={-0} type="menu">
          <Link to="./MouseEscape">
            {""}
            <li>Mouse Escape</li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}
