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

  /**get 20 words to use in search, check each word length >3*/
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
   while(this.newList.length > 0) {
      /**get longest word in list */
      this.newList.sort(function (a, b) {
        return b.length - a.length;
      });
    
      this.possStartCell();
      //var i = this.newList[0].length;
      var word = this.newList[0]
      
   
      /**get startcell poss see if enough cells to fit word */
      /**left to right placement */
       var colSum = this.startCellPosition(this.startCell).column + (word.length);
      /**top to bottom placement */
      var rowSum = this.startCellPosition(this.startCell).row + (word.length);
  

      if (colSum < this.gWidth) {
      
        this.rowLetterPlace(word);
      
        }  else if (rowSum < this.rHeight) {
       
        this.colLetterPlace(word);
     
      }
   
    }
  };

  /** place in grid row */
  rowLetterPlace = (word) => {
    if (word.length > 0) {
      var x = this.startCell;
      for (let i = 0; i < word.length; i++) {
        var wordSplit = word.split("");
       
        console.log(word);
      }
    }
    var letter 
          while (typeof (  letter = wordSplit.shift()) !== "undefined") {
            var firstCell = document.getElementById(x);
            console.log(letter)
            if (firstCell.innerText === "" || firstCell.innerText === letter) {
              console.log(firstCell.innerText)
              firstCell.innerText = letter;
              x = x + 1;
             // eslint-disable-next-line no-unused-vars
             var bin = this.newList.shift()
             console.log(bin)
            } else {
              this.wordFit();
            
            }
        
      
    }
  };
  /**to place words in columns */
  colLetterPlace = (word) => {
    if (word.length > 0) {
      var x = this.startCell;
      for (let i = 0; i < word.length; i++) {
        var wordSplit = word.split("");
        
        console.log(word)
      }
    }
    var letter 
          while (typeof (letter = wordSplit.shift()) !== "undefined") {
            var firstCell = document.getElementById(x);
          }
            if (firstCell.innerText === "" || firstCell.innerText === letter) {
            
              firstCell.innerText = letter;
              x = x + this.gWidth;
              // eslint-disable-next-line no-unused-vars
              var bin = this.newList.shift()
              console.log(bin)
            } else {
              console.log(this.newList)
              this.wordFit();
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
