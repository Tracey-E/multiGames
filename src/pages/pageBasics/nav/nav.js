import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function Nav() {
  const reveal = () => {
    let butt = document.getElementById("toggle");

    if (butt.children[0].textContent === "Open Menu") {
      butt.children[0].textContent = "Close Menu";
      document.getElementById("nav").classList.remove("unActive");
      document.getElementById("nav").classList.toggle("active");
    } else if (butt.children[0].textContent === "Close Menu") {
      butt.children[0].textContent = "Open Menu";
      document.getElementById("nav").classList.remove("active");
      document.getElementById("nav").classList.toggle("unActive");
    }
  };

  const close = () => {
    document.getElementById("nav").classList.remove("active");
    
      document.getElementById("nav").classList.toggle("unActive")
    let butt = document.getElementById("toggle");

    butt.children[0].innerHTML = "Open Menu";
  };

  return (
    <Fragment>
      <div className="nav" id="nav">
        <button
          aria-label="menu"
          className="toggle"
          id="toggle"
          type="button"
          onClick={reveal}
        >
          <p>Open Menu</p>
        </button>
        <ul tabIndex={-0} type="menu">
          <Link to="./Home" onClick={close}>
            <li>Home </li>
          </Link>

          <Link to="./PuzzlePage" onClick={close}>
            {" "}
            <li>Puzzle games </li>
          </Link>

          <Link to="./WordPage" onClick={close}>
            {" "}
            <li>Word games </li>
          </Link>
        </ul>
       
      </div>
    </Fragment>
  );
}
