import React, { Fragment } from "react";
import { Canvas } from "@react-three/fiber";

import "./mouseEscape.css";

import { MouseBackground } from "../reusablecomps/mouseBackground.js";
import { Dices } from "../reusablecomps/dice.js";
import { BlocksMixes } from "../reusablecomps/blocks";

/**to put all mouse game pieces together blocks should be inside background */
export function MouseEscape() {
  return (
    <Fragment>
      <div className="mouseEscape">
        <h1>Mouse escape</h1>
        <Dices />

        <MouseBackground />
        <BlocksMixes />
      </div>
    </Fragment>
  );
}
