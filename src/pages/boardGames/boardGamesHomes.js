import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './boardGamePage.css'

export function BoardPage() {
  return (
    <Fragment>
      <div className="board" id="BoardPage">
        <h1>Board games</h1>
        <ul tabIndex={-0} type="menu">
        
          <Link to="/ludo">
            {""}
            <li>Ludo</li>
          </Link>
       
        </ul>
      </div>
    </Fragment>
  );
}
