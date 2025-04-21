// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react'
import DestinationSelector from './components/DestinationSelector'
import Gallery             from './components/Gallery'
import Spinner             from './components/Spinner'
import ErrorBanner         from './components/ErrorBanner'
import EmptyBanner         from './components/EmptyBanner'

const API_URL = '/api/react-tours-project'

export default function App() {
  const [tours, setTours]       = useState([])
  const [selected, setSelected] = useState('All')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // fetch function, so we can retry or reload
  const fetchTours = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      setTours(data)
    } catch {
      setError('Failed to load tours. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // on mount, load tours
  useEffect(() => {
    fetchTours()
  }, [])

  // derive unique list of tour names for the dropdown
  const destinations = useMemo(() => {
    const names = tours.map(t => t.name)
    return ['All', ...new Set(names)]
  }, [tours])

  // derive the filtered set based on selection
  const filteredTours = useMemo(() => {
    return selected === 'All'
      ? tours
      : tours.filter(t => t.name === selected)
  }, [tours, selected])

  // remove a single tour
  const removeTour = id => {
    setTours(prev => prev.filter(t => t.id !== id))
  }

  // top‐level render logic
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorBanner message={error} onRetry={fetchTours} />
  }

  return (
    <main className="container">
      <h1>Tour Explorer</h1>

      <DestinationSelector
        options={destinations}
        value={selected}
        onChange={setSelected}
      />

      {tours.length === 0 ? (
        <EmptyBanner
          text="No tours left."
          actionLabel="Reload Tours"
          onAction={fetchTours}
        />
      ) : filteredTours.length === 0 ? (
        <EmptyBanner
          text={`No tours found for "${selected}".`}
          actionLabel="Show All"
          onAction={() => setSelected('All')}
        />
      ) : (
        <Gallery tours={filteredTours} onRemove={removeTour} />
      )}
    </main>
  )
}
