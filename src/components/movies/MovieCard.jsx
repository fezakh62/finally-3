export default function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null

  return (
    <article className="movie">
      <div className="movie__poster">
        {poster ? <img src={poster} alt={movie.Title} loading="lazy" /> : <div className="movie__empty">No poster</div>}
      </div>
      <div className="movie__body">
        <div className="movie__title" title={movie.Title}>
          {movie.Title}
        </div>
        <div className="movie__meta">
          <span>{movie.Year}</span>
          {movie.imdbRating ? <span>• ⭐ {movie.imdbRating}</span> : null}
        </div>
      </div>
    </article>
  )
}

