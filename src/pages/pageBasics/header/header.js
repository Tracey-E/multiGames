import React from "react";

export  function Header  () {
  

  return (
    <div className="header">
     <input type="checkbox" data-animation-pause id="css-toggle" className="hidden" />
     <label htmlFor="css-toggle" className="chk">Toggle animations</label>
     <div className="name a-bounce" data-animation="stop" > GAMES</div>
    </div>
  );
};

