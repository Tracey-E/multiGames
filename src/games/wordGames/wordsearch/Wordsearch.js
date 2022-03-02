import React, { Fragment } from "react";

import RandomWord from "../../reusablecomps/wordGameParts/words";

export class Wordsearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfWords: [],
      newList: [],
      count: 0,
      rHeight: 0,
      gWidth: 0,
      startCell: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.userInput = e.target.value;

    return this.userInput;
  };

  /**get 30 words to use in search, check each word length >3*/
  listWords = () => {
    var word = RandomWord();
    if (word.length < 4) {
      word = RandomWord();
    }

    if (
      this.state.listOfWords.length < 30 &&
      this.state.listOfWords.indexOf(word) === -1
    ) {
      this.state.listOfWords.push(word);

      this.listWords();
    } else if (this.state.listOfWords.length === 30) {
      this.wordLength();
      this.makeGrid();
      return this.setState({ listOfWords: this.state.listOfWords.sort() });
    } else {
      this.listWords();
    }
  };

  /**copy list of words so able to alter  */
  wordLength = () => {
    this.setState({
      newList: (this.newList = this.state.listOfWords.map((words) => words)),
    });
  };

  /** create random grid to put words in */
  makeGrid = () => {
    //get element need to change
    var grid = document.getElementById("searchGrid");

    //height to work with for rows
    this.setState({
      rHeight: (this.rHeight = Math.floor(grid.clientHeight / 30)),
    });
    // get sizing for number of columns
    this.setState({
      gWidth: (this.gWidth = Math.floor(grid.clientWidth / 33)),
    });

    //add new rows/columns to element

    grid.style.setProperty("--grid-row", this.rHeight);
    grid.style.setProperty("--grid-column", this.gWidth);

    grid.ariaRowCount = this.rHeight;
    grid.ariaColCount = this.gWidth;

    for (let i = 0; i < this.gWidth * this.rHeight; i++) {
      var cell = document.createElement("button");
      var num = i;

      grid.appendChild(cell).ariaRoleDescription = "gridcell";
      grid.appendChild(cell).id = num;
      grid.appendChild(cell).className = "cell-count";
    }
    this.wordFit();
  };

  /**make a random cell for word to try to be placed */
  possStartCell = () => {
    /**number of cells in grid */
    var cellCount = this.gWidth * this.rHeight;
    /**get random cell number  */

    this.setState({
      startCell: (this.startCell = Math.floor(Math.random() * cellCount)),
    });
  };

  /**find position of start cell   */
  startCellPosition = (z) => {
    var grid = document.getElementById("searchGrid");
    let col = Number(window.getComputedStyle(grid.children[0]).gridColumnStart);
    let colCount = this.gWidth;

    /**x=row position y=colposition */
    const x = Math.floor((z + col) / colCount);
    const y = (z + col) % colCount;

    return { row: x, column: y };
  };

  wordFit = () => {
    while (this.newList.length > 0) {
      /**get longest word in list */
      this.newList.sort(function (a, b) {
        return b.length - a.length;
      });

      this.possStartCell();
      var word = this.newList[0];

      /**get startcell possition see if enough cells to fit word */

      /**left to right placement */
      var columnStart = this.startCellPosition(this.startCell).column;
      var colSum = columnStart + word.length;
      /**top to bottom placement */
      var rowStart = this.startCellPosition(this.startCell).row;
      var rowSum = rowStart + word.length;
      /**if theres enough room in row */
      if (colSum < this.gWidth) {
        this.rowLetterPlaceCheck(this.startCell);
        /**if theres enough room in column */
      } else if (rowSum < this.rHeight) {
        this.colLetterPlaceCheck(this.startCell);
      }
    }
    if (this.newList.length === 0) {
      this.blankSpaceFill();
    }
  };
  /**to check whole word fits on the row before placement */
  rowLetterPlaceCheck = (x) => {
    var cellStart = x;

    while (this.newList[0].length !== "undefined") {
      var word = this.newList[0];
      var letterSplit = word.split("");
      var bin1 = [];
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          cellStart = cellStart + 1;
          var letter = letterSplit[i];
          var cellToTry = document.getElementById(cellStart);

          if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
            bin1.push(letterSplit.shift());
          } else {
            this.wordFit();
          }
        }
      }

      if (bin1.length === word.length) {
        this.rowLetterPlace(word, x);
        this.newList.shift();
      }
    }
  };
  /**to place word in row */
  rowLetterPlace = (word, x) => {
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
    this.newList.shift();
    this.wordFit();
  };

  /**to check whole word fits in columns */
  colLetterPlaceCheck = (x) => {
    var cellStart = x;

    while (this.newList[0].length !== 0) {
      var word = this.newList[0];
      var letterSplit = word.split("");
      var bin1 = [];
      while (letterSplit.length !== 0) {
        for (let i = 0; i < letterSplit.length; i++) {
          cellStart = cellStart + this.gWidth;
          var letter = letterSplit[i];
          var cellToTry = document.getElementById(cellStart);
          if (cellToTry.innerText === "" || cellToTry.innerText === letter) {
            bin1.push(letterSplit.shift());
          } else {
            this.wordFit();
          }
        }
      }

      if (bin1.length === word.length) {
        this.columnLetterPlace(word, x);
        this.newList.shift();
      }
    }
  };
  /**to place word in column */
  columnLetterPlace = (word, x) => {
    var cellNumber = x;

    while (word.length > 0) {
      for (let i = 0; i < word.length; i++) {
        var letters = word.split();
        var letterSplit = letters[0].split("");

        while (letterSplit.length > 0) {
          cellNumber = cellNumber + this.gWidth;
          var cell = document.getElementById(cellNumber);
          cell.innerText = letterSplit[0];
          letterSplit.shift();
        }
        letters.shift();
        word = "";
      }
    }

    this.newList.shift();

    this.wordFit();
  };
  /**to fill any spaces left in grid */
  blankSpaceFill = () => {
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
    const cellNum = this.gWidth * this.rHeight;

    for (let i = 0; i < cellNum; i++) {
      var checkCells = document.getElementById(i);

      if (checkCells.innerText === "") {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];

        checkCells.innerText = randomLetter;
      }
    }
  };
  /**user needs to highlight  words ,words in list marked as found */

  /**possible hint option of showing  1 first letter of hidden word */

  render() {
    return (
      <Fragment>
        <div className="wordsearch">
          <h1>Wordsearch</h1>
          <button
            tabIndex={0}
            id="start"
            aria-label="start"
            type="button"
            onClick={this.listWords}
          >
            Start
          </button>
          <div className="listWords">
            <h2 className="list">Words to find </h2>
            <ul id="wordList">
              {this.state.listOfWords.sort().map((words) => (
                <li id="wList" key={this.state.listOfWords.indexOf(words)}>
                  {words}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="searchGrid"
            id="searchGrid"
            role="grid"
            ariarowindex=""
          ></div>
        </div>
      </Fragment>
    );
  }
}
