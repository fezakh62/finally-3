import { useLocation } from 'react-router-dom'
import MovieGridPage from './MovieGridPage.jsx'

export default function SearchPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('q') || ''

  return <MovieGridPage title="Search" initialQuery={query} />
}

