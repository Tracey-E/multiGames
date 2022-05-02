import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function PuzzlePage() {
  return (
    <Fragment>
      <div className="puzzles" id="PuzzlePage">
        <h1>Puzzle games</h1>
        <ul tabIndex={-0} type="menu">
          <Link to="/MouseEscape">
            {""}
            <li>Mouse Escape</li>
          </Link>
          <Link to="/numberGuesser">
            {""}
            <li>Number Guesser</li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}
