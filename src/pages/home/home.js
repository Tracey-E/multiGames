import React from "react";
import { Fragment } from "react";

import {Dices} from "../../games/reusablecomps/dice";

export function Home() {
  return (
    <Fragment>
      <div className="home" id="Home">
        <h1>Home</h1>
        <Dices />
      </div>
    </Fragment>
  );
}
