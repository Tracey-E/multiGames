import React, {Fragment} from "react";

export  function Header  () {
  

  return (
<Fragment>
    <div className="header">
     <input type="checkbox" data-animation-pause id="css-toggle" className="hidde" />
     <label htmlFor="css-toggle" className="chk">Toggle animations</label>
     <div className="name a-bounce" data-animation="stop" > GAMES</div>
    </div>
    </Fragment>
  );
};

