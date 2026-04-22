import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, getPosterApiUrl } from '../Services/GlobalApi'
import useOmdbSearch from '../hooks/useOmdbSearch'
import MovieCard from '../components/movies/MovieCard'

function MoviePage({ favorites, onFavoriteToggle }) {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const rec = useOmdbSearch({ query: 'star', enabled: true })

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        setError('')
        const resp = await getMovieById(id)
        if (resp.data.Response === 'False') {
          setError(resp.data.Error || 'Movie not found')
          return
        }
        setMovie(resp.data)
      } catch {
        setError('Failed to load movie')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) return <p className='state-text'>Loading movie...</p>
  if (error) return <p className='state-text'>{error}</p>
  if (!movie) return null

  const recItems = rec.items.filter(item => item.imdbID !== id).slice(0, 5)

  return (
    <section>
      <h1 className='page-title'>Movie</h1>
      <div className='movie-details'>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : getPosterApiUrl(movie.imdbID)}
          alt={movie.Title}
          className='details-poster'
        />
        <div>
          <p className='movie-meta'>{movie.Genre}</p>
          <h2 className='details-title'>{movie.Title}</h2>
          <p className='movie-meta'>
            IMDb: {movie.imdbRating} · {movie.Runtime}
          </p>
          <p className='details-plot'>{movie.Plot}</p>
          <p className='details-item'>Released: {movie.Released}</p>
          <p className='details-item'>Country: {movie.Country}</p>
          <p className='details-item'>Actors: {movie.Actors}</p>
          <p className='details-item'>Director: {movie.Director}</p>
        </div>
      </div>

      <h3 className='recommend-title'>Recommendations</h3>
      <div className='movies-grid'>
        {recItems.map(item => (
          <MovieCard
            key={item.imdbID}
            movie={item}
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </section>
  )
}

export default MoviePage
