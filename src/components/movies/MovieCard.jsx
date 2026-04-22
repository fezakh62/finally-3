import { Link } from 'react-router-dom'
import { getPosterApiUrl } from '../../Services/GlobalApi'

function MovieCard({ movie, favorites, onFavoriteToggle }) {
  const inFav = favorites.includes(movie.imdbID)
  const ratingValue = Number(movie.imdbRating)
  const ratingText = Number.isFinite(ratingValue) && ratingValue > 0 ? ratingValue.toFixed(1) : '—'

  const toggleFavorite = () => {
    onFavoriteToggle(prev =>
      prev.includes(movie.imdbID) ? prev.filter(id => id !== movie.imdbID) : [...prev, movie.imdbID],
    )
  }

  return (
    <article className='movie-card'>
      <Link to={`/movie/${movie.imdbID}`} className='movie-poster-link'>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : getPosterApiUrl(movie.imdbID)}
          alt={movie.Title}
          className='movie-poster'
          loading='lazy'
        />
      </Link>
      <button className={`fav-btn ${inFav ? 'active' : ''}`} onClick={toggleFavorite}>
        ★
      </button>
      <h3 className='movie-title'>{movie.Title}</h3>
      <p className='movie-meta'>
        {movie.Type} · {movie.Year} · IMDb: {ratingText}
      </p>
    </article>
  )
}

export default MovieCard
