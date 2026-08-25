import "./StatusMessage.css";

export default function StatusMessage({ type, message }) {
  if (type === "loading") {
    return (
      <div className="status-message status-message--loading" role="status">
        <div className="spinner" aria-hidden="true" />
        <p>{message || "Fetching weather…"}</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="status-message status-message--error" role="alert">
        <span className="status-message__icon" aria-hidden="true">⚠️</span>
        <p>{message}</p>
      </div>
    );
  }

  return null;
}
