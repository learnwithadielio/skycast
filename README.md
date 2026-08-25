<img width="948" height="426" alt="image" src="https://github.com/user-attachments/assets/4518eea0-895f-448c-9aa7-f7ef229a04f7" />

# SkyCast

A clean, minimal weather app built with React. Search any city to get real-time weather data — temperature, conditions, humidity, and wind speed — powered by Open-Meteo (no API key required).

## Features

- Search weather by city name
- Display current temperature, weather condition, humidity, and wind speed
- Weather condition icons via emoji
- Loading spinner while fetching data
- Error handling for invalid cities and network failures
- Responsive design (mobile + desktop)
- Clean, polished UI with subtle shadows and refined typography

## Tech Stack

- **React 18** — UI components and state management
- **Vite** — Build tooling and dev server
- **CSS** — Custom properties, flexbox, responsive design
- **Fetch API** — HTTP requests (no axios or other libraries)

## API

SkyCast uses [Open-Meteo](https://open-meteo.com/), a free, open-source weather API that requires no API key or authentication.

### Request Flow

```
User enters "London"
        │
        ▼
1. Geocode:  GET geocoding-api.open-meteo.com/v1/search?name=London&count=1
        │
        ▼  →  { latitude: 51.5, longitude: -0.12 }
2. Weather:  GET api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current=...
        │
        ▼  →  { temperature_2m, humidity, weather_code, wind_speed_10m }
3. Normalize:  Map WMO weather codes to human-readable conditions + emoji icons
        │
        ▼
4. Render:  WeatherCard with { city, temperature, condition, icon, humidity, windSpeed }
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/skycast.git
cd skycast

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root component, state owner
├── App.css                   # App layout
├── index.css                 # Global reset, CSS variables
├── components/
│   ├── SearchBar.jsx         # City input + submit
│   ├── SearchBar.css
│   ├── WeatherCard.jsx       # Weather display
│   ├── WeatherCard.css
│   ├── StatusMessage.jsx     # Loading / error states
│   └── StatusMessage.css
└── services/
    └── weatherService.js     # Open-Meteo API calls + normalization
```

## Project Status

**MVP Complete.** Core functionality is working: city search, current weather display, loading/error states, and responsive layout.

### Implemented

- City search with geocoding
- Current temperature, condition, humidity, wind speed
- Weather condition icons (emoji)
- Loading state with spinner
- Error state with messages
- Responsive design (mobile + desktop)
- Clean, polished UI

### Not Implemented (Future Ideas)

- Unit toggle (Celsius / Fahrenheit)
- Search history with localStorage
- Dark mode
- 7-day forecast
- Geolocation-based weather
- Hourly forecast

## License

MIT
