import * as React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

/**css  imports */
import "./App.css";
import "./pages/pageBasics/pageBasics.css";
import "./pages/home/home.css";
import "./pages/puzzleGamePage/puzzleGamesPage.css";
import "./games/wordGames/unscramble/unscramble.css";
import "./pages/wordGamesPage/wordPage.css";
import "./games/wordGames/wordsearch/wordsearch.css";
import "./games/puzzleGames/numberGuesser/numberGuesser.css";
import "./games/puzzleGames/avoidTheHoles/avoidHoles.css";

/**basic page imports */
import { Header } from "./pages/pageBasics/header/header.js";
import { Nav } from "./pages/pageBasics/nav/nav";
import { SearchBar } from "./pages/pageBasics/searchBar.js";

/**page imports */
import { Home } from "./pages/home/home";
import { PuzzlePage } from "./pages/puzzleGamePage/puzzleGamesPage";
import { WordPage } from "./pages/wordGamesPage/wordPage";

/**game imports */
import { Unscramble } from "./games/wordGames/unscramble/unscramble.js";
import { Wordsearch } from "./games/wordGames/wordsearch/Wordsearch";
import { NumberGuesser } from "./games/puzzleGames/numberGuesser/numberGuesser";
import { AvoidTheHoles } from "./games/puzzleGames/avoidTheHoles/avoidTheHoles";

export default function App() {
  
  return (
    <>
    <div className="App">
      <Nav />
      <Header />
      <SearchBar />
      <main>
        <Routes>
          <Route path="Home" index element={<Home />} />

          <Route path="PuzzlePage" exact element={<PuzzlePage />} />
          <Route path="NumberGuesser" exact element={<NumberGuesser />} />
          <Route path="AvoidTheHoles" exact element={<AvoidTheHoles />} />
          <Route path="WordPage" exact element={<WordPage />} />
          <Route path="Unscramble" exact element={<Unscramble />} />
          <Route path="Wordsearch" exact element={<Wordsearch />} />
        </Routes>
        <Outlet />
      </main>
    </div>
    </>
  );
}
