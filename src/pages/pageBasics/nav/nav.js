import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  const reveal = () => {
    document.getElementById("nav").classList.toggle("active");
  };

  return (
    <div className="nav" id="nav">
      <button
        aria-label="menu"
        className="toggle"
        id="toggle"
        type="button"
        onClick={reveal}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul tabIndex={-0} type="menu">
        <Link to="./Home">
          <li>Home </li>
        </Link>

        <Link to="./PuzzlePage">
          {" "}
          <li>Puzzle games </li>
        </Link>

        <Link to="./WordPage">
          {" "}
          <li>Word games </li>
        </Link>
      </ul>
    </div>
  );
}
