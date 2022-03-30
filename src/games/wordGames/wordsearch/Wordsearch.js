import React, { Fragment, useState, useEffect } from "react";

import RandomWord from "../../reusablecomps/wordGameParts/words";

export function Wordsearch() {
  const [state, setState] = useState({
    listOfWords: [],
    newList: [],
    key: 0,
    count: 0,
    rHeight: 0,
    gWidth: 0,
    startCell: 0,
    keepHighlight:[]
  });
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  /**get 30 words to use in search, check each word length >3*/
  const createListWords = () => {
    var word = RandomWord();
    if (word.length < 4) {
      word = RandomWord();
    }

    if (
      state.listOfWords.length < 20 &&
      state.listOfWords.indexOf(word) === -1
    ) {
      state.listOfWords.push(word);
      createListWords();
    } else if (state.listOfWords.length === 20) {
      wordLength();
      makeGrid();
      setState((prev) => ({ ...prev, listOfWords: state.listOfWords.sort() }));
    } else {
      createListWords();
    }
  };

  /**copy list of words so able to alter  */
  const wordLength = () => {
    var newList = state.listOfWords.map((words) => words);
    state.newList = newList.sort(function (a, b) {
      return b.length - a.length;
    });
    setState((prev) => ({
      ...prev,
      newList: state.newList,
    }));
  };

  /** create random grid to put words in */
  const makeGrid = () => {
    //get element need to change
    var grid = document.getElementById("searchGrid");
    /**find screen width and height sizing */
    state.rHeight = Math.floor(grid.clientHeight / 50);
    state.gWidth = Math.floor(grid.clientWidth / 55);

    //height to work with for rows

    setState((prev) => ({
      ...prev,
      rHeight: state.rHeight,
    }));

    // get sizing for number of columns

    setState((prev) => ({
      ...prev,
      gWidth: state.gWidth,
    }));

    //add new rows/columns to grid

    grid.style.setProperty("--grid-row", state.rHeight);
    grid.style.setProperty("--grid-column", state.gWidth);

    grid.ariaRowCount = state.rHeight;
    grid.ariaColCount = state.gWidth;

    for (let i = 0; i < state.gWidth * state.rHeight; i++) {
      var cell = document.createElement("button");
      var num = i;

      grid.appendChild(cell).ariaRoleDescription = "gridcell";
      grid.appendChild(cell).id = num;
      grid.appendChild(cell).className = "cell-count";
    }
    wordFit();
  };

  /**make a random cell for word to try to be placed */
  function possStartCell() {
    /**number of cells in grid */
    var cellCount = state.gWidth * state.rHeight - 1;

    /**get random cell number  */
    state.startCell = Math.floor(Math.random() * cellCount);
    setState((prev) => ({
      ...prev,
      startCell: state.startCell,
    }));
  }

  /**find position of start cell   */
  function startCellPosition(z) {
    var grid = document.getElementById("searchGrid");
    let col = Number(window.getComputedStyle(grid.children[0]).gridColumnStart);
    let colCount = state.gWidth;

    /** x = row position, y = colposition */
    const x = Math.floor((z + col) / colCount);
    const y = (z + col) % colCount;

    return { row: x, column: y };
  }

  /**check if enough room for the word */
  function wordFit() {
    if (state.newList.length > 0) {
      possStartCell();

      var word = state.newList[0];

      /**get startcell possition see if enough cells to fit word */

      /**left to right placement */
      var columnStart = startCellPosition(state.startCell).column;

      var colSum = columnStart + word.length;
      console.log(colSum);
      /**top to bottom placement */
      var rowStart = startCellPosition(state.startCell).row;

      var rowSum = rowStart + word.length;
      console.log(rowSum);
      /**if theres enough room in row and column math random to choose position*/
      if (colSum < state.gWidth && rowSum < state.rHeight) {
        console.log("both");
        let position = Math.floor(Math.random() * 2);
        console.log(position);
        if (position === 0) {
          /**left to right placement */
          rowLetterPlaceCheck(state.startCell);
          console.log(state.startCell);
        } else if (position === 1) {
          /**top to bottom placement */
          colLetterPlaceCheck(state.startCell);
        }
        /**if only enough room in row */
      } else if (rowSum < state.rHeight && colSum > state.gWidth) {
        colLetterPlaceCheck(state.startCell);
      } /**if theres enough room in column */ else if (
        colSum < state.gWidth &&
        rowSum > state.rHeight
      ) {
        rowLetterPlaceCheck(state.startCell);
      } else if (colSum > state.gWidth && rowSum > state.rHeight) {
        wordFit();
      }
    }
    if (state.newList.length === 0) {
      blankSpaceFill();
    } else {
      wordFit();
    }
  }
  /**to check word and individual letters  fits on the row before placement */
  function rowLetterPlaceCheck(x) {
    //possible cell position
    var cellStart = x;
    //checking if still words to fit
    if (state.newList.length > 0) {
      //word trying to fit
      var word = state.newList[0];
      //word split down into letters
      var letterSplit = word.split("");

      //used to store letter that have tried to be placed
      var bin1 = [];

      //check each letter in word to see if fits in adjacent cells
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          //using +1 for adjacent cell to right
          cellStart = cellStart + 1;
          //individual letter of each word
          var letter = letterSplit[i];

          if (letter.length !== 0) {
            var cellToTry = document.getElementById(cellStart);

            if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
              bin1.push(letterSplit.shift());
            } else {
              wordFit();
            }
          } else {
            wordFit();
          }
        }
      }
      //once bin1 length  same length as original word all letters will fit,empty letter,lettersplit,bin1 and remove fitted word from wordlist

      if (bin1.length === word.length) {
        console.log("fitted");
        rowLetterPlace(word, x);
        state.newList.shift();

        bin1 = [];
        letter = "";
        letterSplit = [];
      } else if (state.newList.length === 0) {
        console.log("empty");
        console.log(state.newList.length);
        blankSpaceFill();
      }
    } else if (state.newList.length === 0) {
      blankSpaceFill();
    }
  }
  /**to place word in row */
  function rowLetterPlace(word, x) {
    var cellNumber = x;

    while (word.length > 0) {
      for (let i = 0; i < word.length; i++) {
        var letters = word.split();
        var letterSplit = letters[0].split("");

        while (letterSplit.length > 0) {
          cellNumber = cellNumber + 1;
          var cell = document.getElementById(cellNumber);
          cell.innerText = letterSplit[0];
          letterSplit.shift();
        }
        letters.shift();
        word = "";
      }
    }
    state.newList.shift();
    if (state.newList.length === 0) {
      blankSpaceFill();
    } else {
      wordFit();
    }
  }

  /**to check whole word and individual letters fits in columns */
  function colLetterPlaceCheck(x) {
    //possible cell position
    var cellStart = x;
    //checking still words to fit
    if (state.newList.length > 0) {
      //word trying to fit
      var word = state.newList[0];
      //word split down into letters
      var letterSplit = word.split("");
      //used to store letter that have tried to be placed
      var bin1 = [];

      //check each letter in word to see if fits in adjacent cells
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          //using gWidth as need to go in cell below
          cellStart = cellStart + state.gWidth;
          var letter = letterSplit[i];

          if (letter.length !== 0) {
            var cellToTry = document.getElementById(cellStart);

            if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
              bin1.push(letterSplit.shift());
            } else {
              wordFit();
            }
          } else {
            wordFit();
          }
        }
      }
      //once bin1 length  same length as original word all letters will fit,empty letter,lettersplit,bin1 and remove fitted word from wordlist

      if (bin1.length === word.length) {
        console.log("fitted");
        columnLetterPlace(word, x);
        state.newList.shift();
        bin1 = [];
        letter = "";
        letterSplit = [];
      }
    } else if (state.newList.length === 0) {
      console.log("empty");
      console.log(state.newList.length);
      blankSpaceFill();
    }
  }

  /**to place word in column */
  function columnLetterPlace(word, x) {
    var cellNumber = x;

    while (word.length > 0) {
      for (let i = 0; i < word.length; i++) {
        var letters = word.split();
        var letterSplit = letters[0].split("");

        while (letterSplit.length > 0) {
          cellNumber = cellNumber + state.gWidth;
          var cell = document.getElementById(cellNumber);
          cell.innerText = letterSplit[0];
          letterSplit.shift();
        }
        letters.shift();
        word = "";
      }
    }
    state.newList.shift();
    if (state.newList.length === 0) {
      blankSpaceFill();
    } else {
      wordFit();
    }
  }

  /**to fill any spaces left in grid */
  function blankSpaceFill() {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const cellNum = state.gWidth * state.rHeight;

    for (let i = 0; i < cellNum; i++) {
      var checkCells = document.getElementById(i);

      if (checkCells.innerText === "") {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];

        checkCells.innerText = randomLetter;
      }
      if (cellNum - 1 === i) {
        userSelector();
      }
    }
  }

  /**to get user selected cells and match against words in list if there is a match remove word */
  function userSelector() {
    console.log("start");
    var cellCount = state.gWidth * state.rHeight;

    for (let i = 0; i < cellCount; i++) {
      var num = i;
      var cell = document.getElementById(num);
    }
    //holder for selected text
    var selected = [];
    // holder for selected cell ids
    var selectedCellId = [];

    //holder for highlighted cells
    var highlightSelectedCell = [];

    let mousedown = false;
   
   
    //only when mousedown active fire the mouse over event
    cell.addEventListener("mousedown", onmousedown);

    onmousedown = function (e) {
      mousedown = true;

      cell.addEventListener("mouseover", onmouseover);
      cell.addEventListener("mouseup", onmouseup);
      cell.addEventListener("mouseenter", onmouseenter);
    };
    onmouseover = function (e) {
      var grid = document.getElementById("searchGrid");
      if (mousedown && e.target !== grid) {
        setRunning(true);
        //letters selected
        selected.push(e.target.innerText);
        //selected cellids
        selectedCellId.push(e.target.id);

        //change selected cell color to aqua
        for (let i = 0; i < selectedCellId; i++) {
          highlightSelectedCell.push(selectedCellId.shift());
          for (let y = 0; y < highlightSelectedCell.length; y++) {
            document.getElementById(
              highlightSelectedCell[y]
            ).style.backgroundColor = "aqua";
          }
        }
      }
    };
    onmouseup = function (e) {
   

      mousedown = false;
   
      //join selected letters
      var selectedWord = selected.join("");
      console.log(selectedWord);
      //check selected word against wordlist
      if (state.listOfWords.includes(selectedWord)) {
       
        setState((prev) => ({ ...prev, keepHighlight: state.keepHighlight.push(highlightSelectedCell) }));
        console.log(state.keepHighlight);
        //if word is in wordlist remove word from wordlist
        state.listOfWords.splice(state.listOfWords.indexOf(selectedWord), 1);

        //remove selectedWord from display in wordList
        var wordList = document.getElementById("wordList");

        for (let i = 0; i < wordList.length; i++) {
          if (wordList[i].innerText === selectedWord) {
            wordList[i].style.display = "none";
          }
        }
        selected = [];
        selectedCellId = [];
        highlightSelectedCell = [];
      } else {
        //if no match
        //remove background color 
        for (let i = 0; i < highlightSelectedCell.length; i++) {
          //if cell is in keephighlight  keep background color
          setState((prev) => ({ ...prev, keepHighlight: state.keepHighlight.concat() }));
          console.log(state.keepHighlight)
          if (  state.keepHighlight.length >0 &&  state.keepHighlight[0].includes(highlightSelectedCell[i]) ) {
            document.getElementById(
              highlightSelectedCell[i]
            ).style.backgroundColor = "aqua";
              //remove background color from selected cells
          } else {
            document.getElementById(
              highlightSelectedCell[i]
            ).style.backgroundColor = "aliceblue";
          }
        }
        selected = [];
        selectedCellId = [];
        highlightSelectedCell = [];
      }
      /**once all words found show options  */
      if (state.listOfWords.length === 0) {
        setRunning(false);
        var options = (document.getElementById("complete").style.display =
          "block");
      }
    };
  }
  /**timer to say how long took to find words */
  function Stopwatch() {
    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    return (
      <div className="timer">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
    );
    /**if user wants to play again from options */
  }
  function reload() {
    window.location.reload();
  }
  /**if user doesn't want to play again from options */
  function returnPage() {
    window.location.href = "./wordPage";
  }

  /**display properties */
  return (
    <Fragment>
      <h1>Wordsearch</h1>
      <div className="wordsearch">
        <div className="listWords">
          <button
            tabIndex={0}
            id="start"
            aria-label="start"
            type="button"
            onClick={createListWords}
          >
            Start
          </button>
          <h2 className="list">Words to find </h2>
          <ul id="wordList">
            {state.listOfWords.sort().map((words) => (
              <li id="wList" key={state.listOfWords.indexOf(words)}>
                {words}
              </li>
            ))}
          </ul>
          <div id="complete">
            <h4>
              Congratulations!!!
              <br />
              Do you want to play again
            </h4>
            <button
              aria-label="restart"
              id="restart"
              type="button"
              onClick={reload}
            >
              yes
            </button>

            <button
              aria-label="return to word page"
              id="returnToWordPage"
              type="button"
              onClick={returnPage}
            >
              no
            </button>
          </div>
          <div
            className="searchGrid"
            id="searchGrid"
            role="grid"
            ariarowindex=""
          ></div>{" "}
          <Stopwatch />
        </div>
      </div>
    </Fragment>
  );
}
