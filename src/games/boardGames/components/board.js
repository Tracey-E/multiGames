import { Children } from "react";
import { DiceRoll } from "../ludo/ludoFunctions";

export function BoardArea() {
  return (
    <>
      <div className="OuterBoard">
        <div className="centerHome">HOME</div>

        {/*home routes */}
        <div className="home1"></div>

        <div className="home1Path1"></div>
        <div className="home1Path2"></div>
        <div className="home1Path3"></div>
        <div className="home1Path4"></div>

        <div className="home2"></div>

        <div className="home2Path1"></div>

        <div className="home2Path2"></div>
        <div className="home2Path3"></div>
        <div className="home2Path4"></div>

        <div className="home3"></div>

        <div className="home3Path1"></div>
        <div className="home3Path2"></div>
        <div className="home3Path3"></div>
        <div className="home3Path4"></div>

        <div className="home4"></div>

        <div className="home4Path1"></div>
        <div className="home4Path2"></div>
        <div className="home4Path3"></div>
        <div className="home4Path4"></div>

        {/*board route */}

        <div className="routePath one" id="1"></div>
        <div className="routePath two" id="2"></div>
        <div className="routePath three" id="3"></div>
        <div className="routePath four" id="4"></div>
        <div className="routePath five" id="5"></div>
        <div className="routePath six" id="6"></div>
        <div className="routePath seven" id="7"></div>
        <div className="routePath eight" id="8"></div>
        <div className="routePath nine" id="9"></div>
        <div className="routePath ten" id="10"></div>
        <div className="routePath eleven" id="11"></div>
        <div className="routePath twelve" id="12"></div>
        <div className="routePath thirteen" id="13"></div>
        <div className="routePath fourteen" id="14"></div>
        <div className="routePath fifthteen" id="15"></div>
        <div className="routePath sixteen" id="16"></div>
        <div className="routePath seventeen" id="17"></div>
        <div className="routePath eighteen" id="18"></div>
        <div className="routePath nineteen" id="19"></div>
        <div className="routePath twenty" id="20"></div>
        <div className="routePath twentyone" id="21"></div>
        <div className="routePath twentytwo" id="22"></div>
        <div className="routePath twentythree" id="23"></div>
        <div className="routePath twentyfour" id="24"></div>
        <div className="routePath twentyfive" id="25"></div>
        <div className="routePath twentysix" id="26"></div>
        <div className="routePath twentyseven" id="27"></div>
        <div className="routePath twentyeight" id="28"></div>
        <div className="routePath twentynine" id="29"></div>
        <div className="routePath thirty" id="30"></div>
        <div className="routePath thirtyone" id="31"></div>
        <div className="routePath thirtytwo" id="32"></div>
        <div className="routePath thirtythree" id="33"></div>
        <div className="routePath thirtyfour" id="34"></div>
        <div className="routePath thirtyfive" id="35"></div>
        <div className="routePath thirtysix" id="36"></div>
        <div className="routePath thirtyseven" id="37"></div>
        <div className="routePath thirtyeight" id="38"></div>
        <div className="routePath thirtynine" id="39"></div>
        <div className="routePath forty" id="40"></div>
        <div className="routePath fortyone" id="41"></div>
        <div className="routePath fortytwo" id="42"></div>
        <div className="routePath fortythree" id="43"></div>
        <div className="routePath fortyfour" id="44"></div>
        {/* Counters*/}
        <button className="yellow1" name="counter" value="y1"></button>
        <button className="yellow2" name="counter" value="y2"></button>
        <button className="yellow3" name="counter" value="y3"></button>
        <button className="yellow4" name="counter" value="y4"></button>
        <button className="red1" name="counter" value="r1"></button>
        <button className="red2" name="counter" value="r2"></button>
        <button className="red3" name="counter" value="r3"></button>
        <button className="red4" name="counter" value="r4"></button>
        <button className="blue1" name="counter" value="b1"></button>
        <button className="blue2" name="counter" value="b2"></button>
        <button className="blue3" name="counter" value="b3"></button>
        <button className="blue4" name="counter" value="b4"></button>
        <button className="green1" name="counter" value="g1"></button>
        <button className="green2" name="counter" value="g2"></button>
        <button className="green3" name="counter" value="g3"></button>
        <button className="green4" name="counter" value="g4"></button>
      </div>
    
     
    </>
  );
}
