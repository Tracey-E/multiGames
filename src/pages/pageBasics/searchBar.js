import React from "react";

/**to search for either game types or  game */
/**still need to do function search  */
export function SearchBar() {
  const inputChange = () => {
    var input = document.querySelector("input");
    let text = input.value;
    console.log(text);
  };

  function search() {
    return search;
  }

  return (
    <div className="searchbar">
      <input
        tabIndex={0}
        id="input"
        type="searchbox"
        placeholder="search........"
        onKeyUp={(e) => (e.key === "Enter" ? search() : null)}
      ></input>
      <button
        tabIndex={0}
        aria-label="search"
        type="submit"
        onClick={inputChange}
      >
        search
      </button>
    </div>
  );
}
