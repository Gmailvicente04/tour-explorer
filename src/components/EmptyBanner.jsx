export default function EmptyBanner({ text, onAction, actionLabel }) {
    return (
      <div className="empty-banner">
        <p>{text}</p>
        <button onClick={onAction}>{actionLabel}</button>
      </div>
    )
  }