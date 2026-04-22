import { useMemo } from 'react'
import useOmdbSearch from '../hooks/useOmdbSearch'
import MovieCard from '../components/movies/MovieCard'

function MovieGridPage({
  title,
  initialQuery,
  favorites,
  onFavoriteToggle,
  allowSorting = false,
  filters,
  onRemoveFilter,
}) {
  const normalizedQuery = (initialQuery || '').trim()
  const isQueryReady = normalizedQuery.length > 0

  const { items, loading, error, canLoadMore, showMore, setItems } = useOmdbSearch({
    query: normalizedQuery,
    type: filters?.type || '',
    year: '',
    enabled: isQueryReady,
  })

  const filteredItems = useMemo(() => {
    const yearFrom = Number(filters?.yearFrom || 0)
    const yearTo = Number(filters?.yearTo || 9999)
    const ratingFrom = Number(filters?.ratingFrom || 0)
    const ratingTo = Number(filters?.ratingTo || 10)
    const country = (filters?.country || '').trim().toLowerCase()

    return items.filter(movie => {
      const movieYear = Number((movie.Year || '').slice(0, 4))
      const movieRating = Number(movie.imdbRating || 0)
      const movieCountry = String(movie.Country || '').toLowerCase()

      const matchesYear = Number.isNaN(movieYear) ? false : movieYear >= yearFrom && movieYear <= yearTo
      const matchesRating =
        Number.isNaN(movieRating) ? ratingFrom === 0 && ratingTo === 10 : movieRating >= ratingFrom && movieRating <= ratingTo
      const matchesCountry = !country || movieCountry.includes(country)

      return matchesYear && matchesRating && matchesCountry
    })
  }, [items, filters])

  const sortedItems = useMemo(() => {
    const cloned = [...filteredItems]
    const sortBy = filters?.sortBy || ''

    if (sortBy === 'year') {
      cloned.sort((a, b) => Number(b.Year?.slice(0, 4) || 0) - Number(a.Year?.slice(0, 4) || 0))
    }

    if (sortBy === 'rating') {
      const toNumber = value => {
        const n = Number(value)
        return Number.isFinite(n) ? n : 0
      }
      cloned.sort((a, b) => toNumber(b.imdbRating) - toNumber(a.imdbRating))
    }

    return cloned
  }, [filteredItems, filters?.sortBy])

  const sortByYearDesc = () => {
    const cloned = [...items]
    cloned.sort((a, b) => Number(b.Year?.slice(0, 4) || 0) - Number(a.Year?.slice(0, 4) || 0))
    setItems(cloned)
  }

  const prettifyType = value => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '')

  return (
    <section>
      <h1 className='page-title'>{title}</h1>
      {filters?.type || filters?.yearFrom || filters?.yearTo || filters?.ratingFrom || filters?.ratingTo || filters?.country ? (
        <div className='active-filters'>
          {filters?.type ? (
            <button type='button' className='filter-chip' onClick={() => onRemoveFilter?.('type')}>
              {prettifyType(filters.type)}
              <span className='filter-chip-close'>×</span>
            </button>
          ) : null}
          {filters?.yearFrom || filters?.yearTo ? (
            <button type='button' className='filter-chip' onClick={() => onRemoveFilter?.('yearRange')}>
              {filters.yearFrom || '...'} - {filters.yearTo || '...'}
              <span className='filter-chip-close'>×</span>
            </button>
          ) : null}
          {filters?.ratingFrom || filters?.ratingTo ? (
            <button type='button' className='filter-chip' onClick={() => onRemoveFilter?.('ratingRange')}>
              {filters.ratingFrom || '...'} - {filters.ratingTo || '...'}
              <span className='filter-chip-close'>×</span>
            </button>
          ) : null}
          {filters?.country ? (
            <button type='button' className='filter-chip' onClick={() => onRemoveFilter?.('country')}>
              {filters.country}
              <span className='filter-chip-close'>×</span>
            </button>
          ) : null}
        </div>
      ) : null}

      {allowSorting ? (
        <div className='page-controls'>
          <button type='button' onClick={sortByYearDesc} className='action-btn'>
            Sort by year
          </button>
        </div>
      ) : null}

      {!isQueryReady ? <p className='state-text'>Введите запрос в строке поиска сверху</p> : null}
      {isQueryReady && error ? <p className='state-text'>{error}</p> : null}
      {isQueryReady && !error && !loading && sortedItems.length === 0 ? <p className='state-text'>Movie not found!</p> : null}
      <div className='movies-grid'>
        {sortedItems.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>

      <div className='page-bottom'>
        {loading ? <p className='state-text'>Loading...</p> : null}
        {!loading && canLoadMore ? (
          <button onClick={showMore} className='show-more-btn'>
            Show more
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default MovieGridPage
