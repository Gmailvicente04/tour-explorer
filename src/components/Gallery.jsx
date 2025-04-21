import React from 'react'
import TourCard from './TourCard.jsx'

export default function Gallery({ tours, onRemove }) {
  return (
    <section className="gallery">
      {tours.map(t => (
        <TourCard key={t.id} {...t} onRemove={() => onRemove(t.id)} />
      ))}
    </section>
  )
}
