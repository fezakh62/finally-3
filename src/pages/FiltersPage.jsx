import MovieGridPage from './MovieGridPage'

function FiltersPage({ favorites, onFavoriteToggle, filters, onRemoveFilter }) {
  return (
    <MovieGridPage
      title='Filters'
      initialQuery='wonder'
      favorites={favorites}
      onFavoriteToggle={onFavoriteToggle}
      allowSorting
      filters={filters}
      onRemoveFilter={onRemoveFilter}
    />
  )
}

export default FiltersPage
