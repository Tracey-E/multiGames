import { Reveal, RightClickReveal } from "./avoidHoles";

export function handleClicks(e) {
  MouseCalls(e);
}

export function MouseCalls(e) {
    let count = document.getElementById("counter")
    let number =count.childNodes[0].nodeValue 
if(number > 0){
    console.log(number)
} else{
    alert('You won')
}

  let cell = e.nativeEvent.which;

  if (cell === 1) {
    e.target.disabled = true;
    Reveal(e);
  } else if (cell === 3) {
    RightClickReveal(e);
  }
}
