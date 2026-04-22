import { useMemo, useState } from 'react'
import MovieCard from '../components/movies/MovieCard.jsx'
import FiltersDrawer from '../components/filters/FiltersDrawer.jsx'
import { INITIAL_FILTERS } from '../constants/filters.js'
import useOmdbSearch from '../hooks/useOmdbSearch'

export default function MovieGridPage({ title, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [draft, setDraft] = useState(initialQuery)

  const enabled = useMemo(() => Boolean(query && query.trim().length >= 2), [query])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS)
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS)

  const { items, loading, error, canLoadMore, showMore } = useOmdbSearch({
    query,
    enabled,
    type: appliedFilters.type,
    year: appliedFilters.year,
  })

  const sortedItems = useMemo(() => {
    const copy = [...items]
    const by = appliedFilters.sortBy

    if (by === 'title') {
      copy.sort((a, b) => String(a.Title || '').localeCompare(String(b.Title || '')))
    } else if (by === 'rating') {
      copy.sort((a, b) => Number(b.imdbRating || 0) - Number(a.imdbRating || 0))
    } else {
      copy.sort((a, b) => Number(b.Year || 0) - Number(a.Year || 0))
    }

    return copy
  }, [items, appliedFilters.sortBy])

  const submit = e => {
    e.preventDefault()
    setQuery(draft.trim())
  }

  const onDraftChange = patch => setDraftFilters(prev => ({ ...prev, ...patch }))
  const applyFilters = () => {
    setAppliedFilters(draftFilters)
    setFiltersOpen(false)
  }

  const resetFilters = () => {
    setDraftFilters(INITIAL_FILTERS)
    setAppliedFilters(INITIAL_FILTERS)
    setFiltersOpen(false)
  }

  const chips = useMemo(() => {
    const list = []
    if (appliedFilters.type) list.push({ key: 'type', label: `type: ${appliedFilters.type}` })
    if (appliedFilters.year) list.push({ key: 'year', label: `year: ${appliedFilters.year}` })
    if (appliedFilters.sortBy !== 'year') list.push({ key: 'sortBy', label: `sort: ${appliedFilters.sortBy}` })
    return list
  }, [appliedFilters])

  return (
    <section className="page">
      <div className="page__top">
        <h1>{title}</h1>
        <div className="page__controls">
          <button className="btn btn--ghost" type="button" onClick={() => setFiltersOpen(true)}>
            Filters
          </button>
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
      </div>

      {!enabled ? <div className="hint">Введите минимум 2 символа для поиска.</div> : null}
      {error ? <div className="error">{error}</div> : null}

      {chips.length ? (
        <div className="chips">
          {chips.map(c => (
            <span key={c.key} className="chip">
              {c.label}
            </span>
          ))}
        </div>
      ) : null}

      <div className="grid">
        {sortedItems.map(m => (
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

      <FiltersDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        draftFilters={draftFilters}
        onDraftChange={onDraftChange}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </section>
  )
}

