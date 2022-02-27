import React, { Fragment } from "react";

import RandomWord from "../../reusablecomps/wordGameParts/words";

export class Wordsearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfWords: [],
      newList: [],
      key: 0,
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

  /**get 20 words to use in search, check each word length >3*/
  listWords = () => {
    var word = RandomWord();
    if (word.length < 4) {
      word = RandomWord();
    }

    if (this.state.listOfWords.length < 30) {
      this.setState({ key: this.state.key + 1 });

      this.state.listOfWords.push(word);

      this.listWords();
    } else if (this.state.listOfWords.length === 30) {
      this.wordLength();
      this.makeGrid();
      return this.setState({ listOfWords: this.state.listOfWords.sort() });
    }
  };

  /**sort words into longest as needs to be placed first */
  wordLength = () => {
    this.setState({
      newList: (this.newList = this.state.listOfWords),
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

  /**check if word fits  */

  wordFit = () => {
    this.possStartCell();
    /**get longest word in list */
    var wordToFit = this.newList.sort(function (a, b) {
      return b.length - a.length;
    });
    /**length of word to fit */
    var i = wordToFit[0].length;

    /**get startcell poss c if enough cells to fit word */
    var colSum = this.startCellPosition(this.startCell).column + i;
    var rowSum = this.startCellPosition(this.startCell).row + i;
    if (colSum < this.gWidth) {
      this.rowLetterPlace();
    } else if (rowSum < this.rHeight) {
      this.colLetterPlace();
    }
  };

  /** place in grid row */
  rowLetterPlace = () => {
    var wordToFit = this.newList.sort(function (a, b) {
      return b.length - a.length;
    });

    //turn this into one call for all letters
    if (wordToFit.length > 0) {
      var x = this.startCell;
      for (let i = 0; i < wordToFit[0].length; i++) {
        var word = wordToFit[0].split("");
        console.log(word);

        if (word.length > 0) {
          while (typeof (i = word.shift()) !== "undefined") {
            var firstCell = document.getElementById(x);
            firstCell.innerText = i;
            x = x + 1;
          }
        }
      }
    }
  };
  /**to place words in columns */
  colLetterPlace = () => {
    var wordToFit = this.newList.sort(function (a, b) {
      return b.length - a.length;
    });

    if (wordToFit.length > 0) {
      var x = this.startCell;
      for (let i = 0; i < wordToFit[0].length; i++) {
        var word = wordToFit[0].split("");
        console.log(word);

        if (word.length > 0) {
          while (typeof (i = word.shift()) !== "undefined") {
            var firstCell = document.getElementById(x);
            firstCell.innerText = i;
            x = x + this.gWidth;
          }
        }
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
              {this.state.listOfWords.map((words) => (
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
