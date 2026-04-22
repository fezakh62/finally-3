import { useMemo, useState } from 'react'
import MovieCard from '../components/movies/MovieCard.jsx'
import useOmdbSearch from '../hooks/useOmdbSearch'

export default function MovieGridPage({ title, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [draft, setDraft] = useState(initialQuery)

  const enabled = useMemo(() => Boolean(query && query.trim().length >= 2), [query])
  const { items, loading, error, canLoadMore, showMore } = useOmdbSearch({ query, enabled })

  const submit = e => {
    e.preventDefault()
    setQuery(draft.trim())
  }

  return (
    <section className="page">
      <div className="page__top">
        <h1>{title}</h1>
        <form className="searchline" onSubmit={submit}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Search movies (min 2 chars)"
            aria-label="Search movies"
          />
          <button type="submit" disabled={!draft.trim()}>
            Go
          </button>
        </form>
      </div>

      {!enabled ? <div className="hint">Введите минимум 2 символа для поиска.</div> : null}
      {error ? <div className="error">{error}</div> : null}

      <div className="grid">
        {items.map(m => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>

      <div className="actions">
        {loading ? <div className="hint">Loading...</div> : null}
        {!loading && canLoadMore ? (
          <button className="btn" type="button" onClick={showMore}>
            Show more
          </button>
        ) : null}
      </div>
    </section>
  )
}

