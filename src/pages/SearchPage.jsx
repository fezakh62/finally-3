import { useLocation } from 'react-router-dom'
import MovieGridPage from './MovieGridPage'

function SearchPage({ favorites, onFavoriteToggle, filters, onRemoveFilter }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('q') || ''

  return (
    <MovieGridPage
      title='Search'
      initialQuery={query}
      favorites={favorites}
      onFavoriteToggle={onFavoriteToggle}
      filters={filters}
      onRemoveFilter={onRemoveFilter}
    />
  )
}

export default SearchPage
