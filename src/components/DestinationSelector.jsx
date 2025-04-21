import React from 'react'

export default function DestinationSelector({ options, value, onChange }) {
  return (
    <div className="selector">
      <label htmlFor="destination">Choose destination:</label>
      <select
        id="destination"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === 'All' ? 'All Destinations' : opt}
          </option>
        ))}
      </select>
    </div>
  )
}
