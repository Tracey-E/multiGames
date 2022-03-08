import { Select } from "@react-three/drei";
import React, { Fragment, useState } from "react";

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
  });

  const handleChange = (e) => {
    var userInput = e.target.value;

    return userInput;
  };

  /**get 30 words to use in search, check each word length >3*/
  const createListWords = () => {
    var word = RandomWord();
    if (word.length < 4) {
      word = RandomWord();
    }

    if (
      state.listOfWords.length < 25 &&
      state.listOfWords.indexOf(word) === -1
    ) {
      state.listOfWords.push(word);

      createListWords();
    } else if (state.listOfWords.length === 25) {
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
    state.rHeight = Math.floor(grid.clientHeight / 45);
    state.gWidth = Math.floor(grid.clientWidth / 45);
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

    //add new rows/columns to element

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
    var cellCount = state.gWidth * state.rHeight;
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

    /**x=row position y=colposition */
    const x = Math.floor((z + col) / colCount);
    const y = (z + col) % colCount;

    return { row: x, column: y };
  }

  function wordFit() {
    while (state.newList.length > 0) {
      /**get longest word in list */

      possStartCell();

      var word = state.newList[0];

      /**get startcell possition see if enough cells to fit word */

      /**left to right placement */
      var columnStart = startCellPosition(state.startCell).column;

      var colSum = columnStart + word.length;
      /**top to bottom placement */
      var rowStart = startCellPosition(state.startCell).row;
      var rowSum = rowStart + word.length;
      /**if theres enough room in row */
      if (colSum < state.gWidth) {
        rowLetterPlaceCheck(state.startCell);
        /**if theres enough room in column */
      } else if (rowSum < state.rHeight) {
        colLetterPlaceCheck(state.startCell);
      }
    }
    if (state.newList.length === 0) {
      blankSpaceFill();
    }
  }
  /**to check whole word fits on the row before placement */
  function rowLetterPlaceCheck(x) {
    var cellStart = x;

    while (state.newList[0].length !== "undefined") {
      var word = state.newList[0];
      var letterSplit = word.split("");
      var bin1 = [];
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          cellStart = cellStart + 1;
          var letter = letterSplit[i];
          if(letter.length !== 0 ){
          var cellToTry = document.getElementById(cellStart);

          if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
            bin1.push(letterSplit.shift());
          } else {
            wordFit();
          }
        }
        }
      }

      if (bin1.length === word.length) {
        rowLetterPlace(word, x);
        state.newList.shift();
      }
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

    wordFit();
  }

  /**to check whole word fits in columns */
  function colLetterPlaceCheck(x) {
    var cellStart = x;

    while (state.newList[0].length !== "undefined") {
      var word = state.newList[0];
      var letterSplit = word.split("");
      var bin1 = [];
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          cellStart = cellStart + state.gWidth;
          var letter = letterSplit[i];
          var cellToTry = document.getElementById(cellStart);
          if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
            bin1.push(letterSplit.shift());
          } else {
            wordFit();
          }
        }
      }

      if (bin1.length === word.length) {
        columnLetterPlace(word, x);
        state.newList.shift();
      }
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

    wordFit();
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
        userSelector();
      }
    }
  }
  /**user needs to highlight  words ,words in list marked as found */
  function userSelector(e) {
    let cell = document.getElementsByClassName("cell-count");
    var word = [];
   
    var selectionStart;
    var selected = [];
    var cells = [];
    document.onselectstart= function(){
      console.log('start')
    }

    document.onselectionchange = function () {
      console.log("change");
   selectionStart = document.getSelection().focusNode;
   console.log(selectionStart)
  word.push(selectionStart);
    };

    document.onmouseup = function (e) {
    console.log("ended");
    console.log(word)
      for (let i = 1; i < word.length; i++) {
        
        if (typeof word[i].data === "string") {
      
          selected.push(word[i].data);
          console.log(selected)
          console.log(selected);
        }
     else if (typeof { word: [i] === "object" }) {
       
          cells.push(word[i]);
          console.log(cells);

          for (let i = 0; i < cells.length; i++) {
            console.log(cells[i].id);
            var cellId = document.getElementById(cells[i].id);
            console.log(cellId);
            cellId.style.backgroundColor = "aqua";
            word[0].parentElement.style.backgroundColor = "aqua"
          }
        }
      }

      var findWord = selected.join("");
      console.log(findWord)
    };
  }
  /**  const letters = cellIdLetter.innerText;
    word.push(letters);

    var findWord = word.join("");
    console.log(findWord);
    const finder = state.listOfWords.indexOf(findWord);
    console.log(finder);
    if (finder > -1) {
      var listFinder = document.getElementById("wordList");
      console.log(listFinder);
      for (let i = 0; i < listFinder.childNodes.length; i++) {
        if (listFinder.childNodes[i].innerText === findWord) {
          console.log("match");
          console.log(listFinder.childNodes[i].innerText);

          listFinder.childNodes[i].style.setProperty("display", "none");
        } else {
          userSelector();
        }
      }
    }*/

  /**possible hint option of showing  1 first letter of hidden word */

  //render() {
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
          <div
            className="searchGrid"
            id="searchGrid"
            role="grid"
            ariarowindex=""
          ></div>{" "}
        </div>
      </div>
    </Fragment>
  );
}
