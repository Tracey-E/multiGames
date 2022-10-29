import { BoardArea } from "../components/board";

import { LudoCounters } from "./ludoFunctions";
import { Start } from "./ludoFunctions";
import Dice from "../../reusablecomps/dice/dice";

import "./ludo.css";



export function Ludo() {


  return (
    <>
      <div className="ludo">
        <h1>Ludo</h1>
        <p>Rules for ludo here</p>
<button onClick={(e) => Start(e)} >START</button>
        <div className="boardArea">
          <BoardArea />
          <LudoCounters/>
          <Dice />
        </div>
    
      </div>
    </>
  );
}
