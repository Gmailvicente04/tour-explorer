export default function ErrorBanner({ message, onRetry }) {
    return (
      <div className="error-banner">
        <p>{message}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    )
  }