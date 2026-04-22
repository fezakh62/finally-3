import { useEffect, useState } from 'react'
import { getMovieById } from '../Services/GlobalApi'
import MovieCard from '../components/movies/MovieCard'

function FavoritesPage({ favorites, onFavoriteToggle }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites.length) {
        setMovies([])
        return
      }

      setLoading(true)
      const settled = await Promise.all(
        favorites.map(async id => {
          try {
            const resp = await getMovieById(id)
            return resp.data?.Response === 'False' ? null : resp.data
          } catch {
            return null
          }
        }),
      )

      setMovies(settled.filter(Boolean))
      setLoading(false)
    }

    fetchFavorites()
  }, [favorites])

  return (
    <section>
      <h1 className='page-title'>Favorites</h1>
      {loading ? <p className='state-text'>Loading...</p> : null}
      {!loading && !movies.length ? <p className='state-text'>Favorites list is empty</p> : null}
      <div className='movies-grid'>
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </section>
  )
}

export default FavoritesPage
