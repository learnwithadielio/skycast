import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import StatusMessage from "./components/StatusMessage";
import { getWeather } from "./services/weatherService";
import "./App.css";

/**
 * App states:
 *   "idle"    — no search yet, show empty prompt
 *   "loading" — fetch in progress
 *   "success" — weatherData is populated
 *   "error"   — errorMessage is set
 */
export default function App() {
  const [status, setStatus] = useState("idle");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch(city) {
    setStatus("loading");
    setErrorMessage("");
    setWeatherData(null);

    try {
      const data = await getWeather(city);
      setWeatherData(data);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">🌤️ SkyCast</h1>
        <p className="app__subtitle">Simple weather, anywhere</p>
      </header>

      <main className="app__main">
        <SearchBar onSearch={handleSearch} disabled={status === "loading"} />

        {status === "idle" && (
          <p className="app__prompt">Search for a city to see the weather.</p>
        )}

        {status === "loading" && (
          <StatusMessage type="loading" message="Fetching weather…" />
        )}

        {status === "error" && (
          <StatusMessage type="error" message={errorMessage} />
        )}

        {status === "success" && weatherData && (
          <WeatherCard data={weatherData} />
        )}
      </main>
    </div>
  );
}
