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
  });
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

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
    } else {
      wordFit();
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
          if (letter.length !== 0) {
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
    //Stopwatch()
    let cell = document.getElementById("searchGrid");

    cell.addEventListener("mousedown", onmousedown, false);
  }

  function onmousedown(e) {
    console.log("start");

    /**getting each user selected element */
    var selectionStart;
    /**holder for user selected elements */
    var userSelectedElements = [];

    /**holder for user selected elements letters */
    var selected = [];
    /**holder for user selected cells */
    var cells = [];
    /**holder for user selected cells to be used if dont match */
    var cellIdStore = [];
    var selection;

    document.onselectstart = function (e) {
      console.log("started");
      selection = document.getSelection().anchorNode;

      setRunning(true);
    };

    document.onselectionchange = function (e) {
      console.log("change");
      selectionStart = document.getSelection().focusNode;

      userSelectedElements.push(selectionStart);
    };

    /**when user realeses mouse button  */
    document.onmouseup = function (e) {
      console.log("ended");

      for (let i = 1; i < userSelectedElements.length; i++) {
        /**getting letter of selected */
        if (typeof userSelectedElements[i].data === "string") {
          selected.push(userSelectedElements[i].data);

          /**getting the cell id */
        } else if (typeof { userSelectedElements: [i] === "object" }) {
          cells.push(userSelectedElements[i]);

          /**change the cell colour to show user selected letters */
          for (let i = 0; i < cells.length; i++) {
            var cellId = document.getElementById(cells[i].id);

            cellIdStore.push(cellId);

            cellId.style.backgroundColor = "aqua";
            userSelectedElements[0].parentElement.style.backgroundColor =
              "aqua";
          }
        }
      }
      /**join the user-selected letters to form word */
      var findWord = selected.join("");

      /**if user selected word check if in original word list */
      if (state.listOfWords.includes(findWord)) {
        const finder = state.listOfWords.indexOf(findWord);

        if (finder > -1) {
          var listFinder = document.getElementById("wordList");

          for (let i = 0; i < listFinder.childNodes.length; i++) {
            if (listFinder.childNodes[i].innerText === findWord) {
              console.log("match");
              /**if found remove word from find list and empty all arrays */
              //listFinder.childNodes[i].style.setProperty("display", "none");

              var num = state.listOfWords.indexOf(findWord);
              console.log(num);
              state.listOfWords.splice(num, 1);
              console.log(state.listOfWords);

              selected = [];

              findWord = "";

              userSelectedElements = [];

              cells = [];

              cellIdStore = [];

              selection = "";
            }
          }
          /**if index of word not found */
        } else {
          console.log("no matches");

          for (let i = 0; i < cellIdStore.length; i++) {
            var cellIds = document.getElementById(cellIdStore[i].id);
            cellIds.style.backgroundColor = "aliceblue";
            userSelectedElements[0].parentElement.style.backgroundColor =
              "aliceblue";
          }
          userSelector();
        }

        /**if user selected word not found in  list */
      } else {
        console.log("no match");

        for (let i = 0; i < cellIdStore.length; i++) {
          cellIds = document.getElementById(cellIdStore[i].id);
          cellIds.style.backgroundColor = "aliceblue";

          userSelectedElements[0].parentElement.style.backgroundColor =
            "aliceblue";
        }
        findWord = "";
        cellIdStore = [];
        cellIds = [];
        selection = "";
        selected = [];
        // word[0].parentElement.style.backgroundColor = "aliceblue";
        userSelector();
      }
      if (state.listOfWords.length === 0) {
        setRunning(false);
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
  }

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
          <Stopwatch />
        </div>
      </div>
    </Fragment>
  );
}
