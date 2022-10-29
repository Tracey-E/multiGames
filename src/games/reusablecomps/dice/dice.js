import { DiceRoll } from "../../boardGames/ludo/ludoFunctions";

import "./dice.css";

export default function Dice() {
  return (
    <>
      <section className="container" id="container">
        <div
          id="cube"
          onClick={(e) => DiceRoll(e)}
          onTransitionEndCapture={(e) => e.currentTarget}
        >
          <div className="front " id="number1">
            <span className="dot dot1"></span>
          </div>
          <div className="back" id="number2">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
          </div>
          <div className="right" id="number3">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
          </div>
          <div className="left" id="number4">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
            <span className="dot dot4"></span>
          </div>
          <div className="top" id="number5">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
            <span className="dot dot4"></span>
            <span className="dot dot5"></span>
          </div>
          <div className="bottom" id="number6">
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
            <span className="dot dot4"></span>
            <span className="dot dot5"></span>
            <span className="dot dot6"></span>
          </div>
        </div>
      </section>
    </>
  );
}
