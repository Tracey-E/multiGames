let cube;
let current;

export function Start(e) {
  e.preventDefault();
  LudoCounters();
  let face1 = document.getElementById("number1");
  cube = document.getElementById("cube");
  current = face1.getBoundingClientRect();

  
  cube.addEventListener("transitionend", (e) => {
    console.log(e.currentTarget)
    NumberGet(cube);
  });
  console.log(current, 'cur');
  console.log(cube,'cube')
 
}

export const LudoCounters = () => {
  let buttons = document.querySelectorAll("button[name=counter]");

  buttons.forEach((button) => {
    button.addEventListener("click", getCounter);
  });
};

function getCounter(e) {
  console.log(e.target.value);
}

export function DiceRoll(e) {
  let cube = document.getElementById("cube");

  var min = 1;
  var max = 24;

  var xRand = getRandom(max, min);
  var yRand = getRandom(max, min);

  // cube.style.webkit-transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
  cube.style.transform = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";

  function getRandom(max, min) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }
}

function NumberGet(e) {
  console.log(cube.childNodes);
  console.log(cube);
  console.log(current);


  for (let i = 0; i < cube.childNodes.length; i++) {
    console.log(cube.childNodes[i].getBoundingClientRect());

    if (current.x === cube.childNodes[i].x) {
      console.log(current.x, cube.childNodes[i].x);
    }
  }

  function calculateFront() {}
}
