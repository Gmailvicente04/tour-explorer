import React, { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import DestinationSelector from './components/DestinationSelector'

function App() {
  const [tours, setTours] = useState([])
  const [filteredTours, setFilteredTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState('All')

  const fetchTours = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://course-api.com/react-tours-project')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setTours(data)
      setFilteredTours(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  useEffect(() => {
    if (selected === 'All') {
      setFilteredTours(tours)
    } else {
      setFilteredTours(tours.filter(t => t.name === selected))
    }
  }, [selected, tours])

  const handleRemove = id => {
    const updated = filteredTours.filter(t => t.id !== id)
    setFilteredTours(updated)
  }

  const uniqueNames = ['All', ...new Set(tours.map(t => t.name))]

  return (
    <div className="container">
      <h1>Tour Explorer</h1>
      <DestinationSelector
        destinations={uniqueNames}
        selected={selected}
        onSelect={setSelected}
      />
      <Gallery
        tours={filteredTours}
        loading={loading}
        error={error}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default App
