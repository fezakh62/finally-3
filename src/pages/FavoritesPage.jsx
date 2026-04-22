import MovieCard from '../components/movies/MovieCard.jsx'

export default function FavoritesPage({ favorites, onFavoriteToggle }) {
  const hasItems = favorites && favorites.length > 0

  return (
    <section className="page">
      <h1>Избранное</h1>
      {!hasItems ? <p>Пока пусто.</p> : null}

      {hasItems ? (
        <div className="grid">
          {favorites.map(m => (
            <MovieCard key={m.imdbID} movie={m} isFavorite onFavoriteToggle={onFavoriteToggle} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

