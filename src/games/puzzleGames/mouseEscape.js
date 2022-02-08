import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import "./mouseEscape.css";

import MouseBackground from "../reusablecomps/mouseBackground.js";
//import { Dices } from "../reusablecomps/dice.js";
import BlocksMixes from "../reusablecomps/blocks";
//import { Walls } from "../reusablecomps/walls";

function Scene() {
  return (
    <>
      <BlocksMixes />
   
    </>
  );
}
function CanvasAndScene() {
  const MouseEscape = useRef();
  return (
    <>
      <div className="MouseEscape">
        <Canvas ref={MouseEscape} dispose={null} name="MouseEscape">
          <Physics >
            <Scene />
            <MouseBackground />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

/**to put all mouse game pieces together blocks should be inside background */

export default function MouseEscape() {
  return (
    <>
      <CanvasAndScene />
    </>
  );
}
