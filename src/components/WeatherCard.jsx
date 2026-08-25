import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  return (
    <article className="weather-card">
      <div className="weather-card__icon" aria-hidden="true">
        {data.icon}
      </div>

      <h2 className="weather-card__city">{data.city}</h2>

      <p className="weather-card__temp">{data.temperature}°C</p>
      <p className="weather-card__condition">{data.condition}</p>

      <div className="weather-card__details">
        <div className="weather-card__stat">
          <span className="weather-card__stat-icon">💧</span>
          <span className="weather-card__stat-label">Humidity</span>
          <span className="weather-card__stat-value">{data.humidity}%</span>
        </div>
        <div className="weather-card__stat">
          <span className="weather-card__stat-icon">💨</span>
          <span className="weather-card__stat-label">Wind</span>
          <span className="weather-card__stat-value">{data.windSpeed} km/h</span>
        </div>
      </div>
    </article>
  );
}
