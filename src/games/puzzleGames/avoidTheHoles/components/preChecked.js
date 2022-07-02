import { useState, useEffect } from "react";

export function PrevCheckedCells(props) {
 

  const [preChecked, setPreChecked] = useState([props]);

  this.state = [
    {
      
      preChecked: [[props]],
      preChecked_id: 0,
    },
    {
     
      preChecked: [[props]],
      preChecked_id: 0,
    },
  ];
  return setPreChecked(preChecked => preChecked.push( props))
}
