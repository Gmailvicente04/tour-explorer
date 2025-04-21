import React, { useState } from 'react'

export default function TourCard({ name, info, image, price, onRemove }) {
  const [readMore, setReadMore] = useState(false)
  const excerpt = info.length > 250 ? info.slice(0, 250) + '…' : info

  return (
    <article className="tour-card">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-header">
          <h4>{name}</h4>
          <h4 className="price">${price}</h4>
        </div>
        <p>
          {readMore ? info : excerpt}
          {info.length > 250 && (
            <button
              className="read-more-btn"
              onClick={() => setReadMore(prev => !prev)}
            >
              {readMore ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
        <button className="not-interested-btn" onClick={onRemove}>
          Not Interested
        </button>
      </footer>
    </article>
  )
}

