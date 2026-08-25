import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Enter a city name…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        aria-label="City name"
      />
      <button
        className="search-bar__button"
        type="submit"
        disabled={disabled || !value.trim()}
      >
        Search
      </button>
    </form>
  );
}
