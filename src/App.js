import React, { Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**css  imports */
import "./App.css";
import "./pages/pageBasics/pageBasics.css";
import "./pages/home/home.css";
import "./pages/puzzleGamePage/puzzleGamesPage.css";
import "./games/wordGames/unscramble/unscramble.css";
import "./pages/wordGamesPage/wordPage.css";
import "./games/puzzleGames/mouseEscape.css"

/**basic page imports */
import { Header } from "./pages/pageBasics/header/header.js";
import { Nav } from "./pages/pageBasics/nav/nav.js";
import { SearchBar } from "./pages/pageBasics/searchBar.js";

/**page imports */
import { Home } from "./pages/home/home";
import { PuzzlePage } from "./pages/puzzleGamePage/puzzleGamesPage";
import { WordPage } from "./pages/wordGamesPage/wordPage";

/**game imports */
import { Unscramble } from "./games/wordGames/unscramble/unscramble";
import  MouseEscape  from "./games/puzzleGames/mouseEscape.js";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <SearchBar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" exact element={<Home />} />

          <Route path="/PuzzlePage" exact element={<PuzzlePage />} />
          <Route path="/MouseEscape" exact element={<MouseEscape />} />

          <Route path="/WordPage" exact element={<WordPage />} />
          <Route path="/Unscramble" exact element={<Unscramble />} />
        </Routes>
     
    </div>
  );
}
