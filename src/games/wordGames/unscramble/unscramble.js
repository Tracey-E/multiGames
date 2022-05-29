import React, { Fragment } from "react";

import RandomWord from "../../reusablecomps/wordGameParts/words";

export class Unscramble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: 0,
      userInput: "",
      count: 0,
      newWord: "",
      scramble: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /**change level of play */
  level() {
    const levels = document.getElementById("level");

    if (levels.innerText === "Choose your level") {
      levels.innerText = "Easy";
      document.getElementById("level").style.backgroundColor = "green";
    } else if (levels.innerText === "Easy") {
      levels.innerText = "Medium";
      document.getElementById("level").style.backgroundColor = "orange";
    } else if (levels.innerText === "Medium") {
      levels.innerText = "Hard";
      document.getElementById("level").style.backgroundColor = "red";
    } else if (levels.innerText === "Hard") {
      levels.innerText = "Choose your level";
      document.getElementById("level").style.backgroundColor = "antiqueWhite";
    }
  }
  /**shuffle letters in the word */
  Shuffle = (x) => {
    var a = x.split(""),
      n = a.length;
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };
  /**get a new word =>CheckWordLength */
  Scrambled = () => {
    this.newWord = RandomWord();
   
    const hints = document.getElementById("hintReveal");

    if (hints.hasChildNodes()) {
      hints.removeChild(hints.firstChild);
      document.getElementById("hint").disabled = false;
    }

    this.CheckWordLength();

    return this.state.newWord;
  };
  /**to check word length against level selected => showScrambled if right length */
  CheckWordLength() {
    const levels = document.getElementById("level");
    if (this.newWord.length < 3) {
      this.newWord = RandomWord();
    } else if (levels.innerText === "Easy" && this.newWord.length > 5) {
      this.Scrambled();
    } else if (levels.innerText === "Easy" && this.newWord.length < 6) {
      this.scramble = this.Shuffle(this.newWord);

      this.ShowScrambled();
    } else if (levels.innerText === "Medium" && this.newWord.length > 7) {
      this.Scrambled();
    } else if (levels.innerText === "Medium" && this.newWord.length < 8) {
      this.scramble = this.Shuffle(this.newWord);

      this.ShowScrambled();
    } else if (levels.innerText === "Hard" && this.newWord.length < 8) {
      this.Scrambled();
    } else if (levels.innerText === "Hard" && this.newWord.length >= 8) {
      this.scramble = this.Shuffle(this.newWord);

      this.ShowScrambled();
    } else if (
      levels.innerText === "Choose your level" &&
      this.newWord.length > 5
    ) {
      alert("Please choose a level");
    }

    return this.scramble;
  }
  /**show the scrambled word on screen */
  ShowScrambled() {
    if (this.state.words < 20) {
      var newTry = (document.getElementById(
        "scrambledLetters"
      ).childNodes[0].data = this.scramble);
      this.setState({ words: this.state.words + 1 });

      document.getElementById("letsNeed").style.outline = "none";

      return this.newTry;
    } else {
      this.score();
    }
  }

  /**check users  word for  correct */

  checkInput = () => {
    if (this.state.words < 20 && this.userInput !== this.newWord) {
      document.getElementById("letsNeed").value = "";
      document.getElementById("letsNeed").style.outline = "3px solid red";
    } else if (this.state.words < 20 && this.userInput === this.newWord) {
      this.setState({ count: this.state.count + 1 });
      document.getElementById("letsNeed").value = "";
      document.getElementById("letsNeed").style.outline = "3px solid green";
      document.getElementById("hintReveal").innerText = "";
      document.getElementById("hint").disabled = false;
      this.Scrambled();
    } else if (this.state.words === 20 && this.userInput === this.newWord) {
      this.setState({ count: this.state.count + 1 });
      this.score();
    }
  };
  /**to show finale score */
  score() {
    alert(" you scored " + this.state.count + " out of " + this.state.words);
  }
  /**to get users input/try */
  handleChange(e) {
    this.userInput = e.target.value;

    return this.userInput;
  }
  /**for user to get a hint */
  Hint = () => {
    const hintLetter = this.newWord[0];
    document
      .getElementById("hintReveal")
      .append("The first letter is  " + hintLetter);
    document.getElementById("hint").disabled = "true";
  };
  /**refresh the page without loosing page data to start new game */
  NewGame() {
    //window.location.reload();
    document.location.href = "/";

  }

  render() {
    return (
      <>
        <Fragment>
          <div className="unscramble">
            <p>
              How many words can you unscramble.
              <br />
              Words include names and places.
              <br /> Click "Choose you level" an then "Get a new word" to start{" "}
              <br />
              or "New game" to start over.
              <br /> LEVELS,
              <br />
              EASY words are up to 5 letters long,
              <br />
              MEDIUM words are up to 7 letters long,
              <br />
              HARD words are 8 letters or more.
              <br /> The HINT button will only give you the first letter of the
              word.
            </p>
            <button
              tabIndex={0}
              id="newGame"
              aria-label="new Game"
              type="button"
              onClick={this.NewGame}
            >
              New game
            </button>
            <button
              tabIndex={0}
              id="level"
              aria-label="choose a level"
              type="button"
              onClick={this.level}
            >
              Choose your level
            </button>

            <h2>The word to unscramble is</h2>
            <div id="scrambledLetters">
              Unscramble me
              <button
                tabIndex={0}
                aria-label="get a new word"
                id="newWord"
                onClick={this.Scrambled}
              >
                Get a new word
              </button>
            </div>
            <div>
              <label htmlFor="typing guess">
                Type your guess
                <input
                  tabIndex={0}
                  id="letsNeed"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  input={this.state.userInput}
                  onKeyUp={(e) =>
                    e.key === "Enter" ? this.checkInput() : null
                  }
                  spellCheck="false"
                ></input>
              </label>
              <button
                tabIndex={0}
                aria-label="try"
                id="try"
                type="button"
                onClick={this.checkInput}
              >
                {" "}
                Try{" "}
              </button>
            </div>
            <div id="score">
              Your score is {this.state.count}/{this.state.words}
            </div>

            <br />
            <button
              tabIndex={0}
              aria-label="hint"
              id="hint"
              type="button"
              onClick={this.Hint}
            >
              Hint
            </button>
            <div id="hintReveal"></div>
          </div>
        </Fragment>
      </>
    );
  }
}
