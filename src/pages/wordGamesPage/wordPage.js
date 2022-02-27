import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function WordPage() {
  return (
    <Fragment>
      <div className="words">
        <h1>Word games</h1>
        <ul tabIndex={-0} type="menu">
          <Link to="/Unscramble">
            {""}
            <li>Unscramble </li>
          </Link>
          <Link to="/Wordsearch">
            {""}
            <li>WordSearch </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
}
