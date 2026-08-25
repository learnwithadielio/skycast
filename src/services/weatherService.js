/**
 * Weather service using Open-Meteo (no API key required).
 *
 * Flow:
 *   1. Geocode city name → latitude/longitude
 *   2. Fetch current weather for those coordinates
 *   3. Normalize into a clean UI-friendly shape
 */

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * WMO Weather interpretation codes → human-readable condition + emoji icon.
 * https://open-meteo.com/en/docs#weathervariables
 */
const WMO_CODES = {
  0:  { condition: "Clear sky",           icon: "☀️" },
  1:  { condition: "Mainly clear",        icon: "🌤️" },
  2:  { condition: "Partly cloudy",       icon: "⛅" },
  3:  { condition: "Overcast",            icon: "☁️" },
  45: { condition: "Foggy",               icon: "🌫️" },
  48: { condition: "Depositing rime fog", icon: "🌫️" },
  51: { condition: "Light drizzle",       icon: "🌦️" },
  53: { condition: "Moderate drizzle",    icon: "🌦️" },
  55: { condition: "Dense drizzle",       icon: "🌧️" },
  56: { condition: "Freezing drizzle",    icon: "🌧️" },
  57: { condition: "Heavy freezing drizzle", icon: "🌧️" },
  61: { condition: "Slight rain",         icon: "🌦️" },
  63: { condition: "Moderate rain",       icon: "🌧️" },
  65: { condition: "Heavy rain",          icon: "🌧️" },
  66: { condition: "Freezing rain",       icon: "🌧️" },
  67: { condition: "Heavy freezing rain", icon: "🌧️" },
  71: { condition: "Slight snow",         icon: "🌨️" },
  73: { condition: "Moderate snow",       icon: "🌨️" },
  75: { condition: "Heavy snow",          icon: "❄️" },
  77: { condition: "Snow grains",         icon: "❄️" },
  80: { condition: "Slight showers",      icon: "🌦️" },
  81: { condition: "Moderate showers",    icon: "🌧️" },
  82: { condition: "Violent showers",     icon: "⛈️" },
  85: { condition: "Slight snow showers", icon: "🌨️" },
  86: { condition: "Heavy snow showers",  icon: "❄️" },
  95: { condition: "Thunderstorm",        icon: "⛈️" },
  96: { condition: "Thunderstorm with hail", icon: "⛈️" },
  99: { condition: "Thunderstorm with heavy hail", icon: "⛈️" },
};

function lookupWmo(code) {
  return WMO_CODES[code] ?? { condition: "Unknown", icon: "🌡️" };
}

/**
 * Step 1 — Geocode a city name to coordinates.
 * Returns { name, latitude, longitude } or throws.
 */
async function geocode(city) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding request failed.");

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }

  const { name, latitude, longitude } = data.results[0];
  return { name, latitude, longitude };
}

/**
 * Step 2 — Fetch current weather for coordinates.
 */
async function fetchCurrentWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    // No timezone — use the API default (UTC).
  });
  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Weather request failed.");
  return res.json();
}

/**
 * Step 3 — Normalize raw API data into the UI shape.
 */
function normalize(cityName, raw) {
  const current = raw.current;
  const { condition, icon } = lookupWmo(current.weather_code);

  return {
    city: cityName,
    temperature: Math.round(current.temperature_2m),
    condition,
    icon,
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
  };
}

/**
 * Public entry point — single call to go from city name to normalized weather.
 */
export async function getWeather(city) {
  const geo = await geocode(city);
  const raw = await fetchCurrentWeather(geo.latitude, geo.longitude);
  return normalize(geo.name, raw);
}
