export default function FiltersDrawer({ isOpen, onClose, draftFilters, onDraftChange, onApply, onReset }) {
  if (!isOpen) return null

  return (
    <div className="filters-overlay" onClick={onClose}>
      <aside className="filters-drawer" onClick={e => e.stopPropagation()}>
        <div className="filters-header">
          <h3>Filters</h3>
          <button className="filters-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="filters-section">
          <div className="filters-label">Sort by</div>
          <div className="filters-sort">
            <button
              type="button"
              className={draftFilters.sortBy === 'rating' ? 'active' : ''}
              onClick={() => onDraftChange({ sortBy: 'rating' })}
            >
              Rating
            </button>
            <button
              type="button"
              className={draftFilters.sortBy === 'year' ? 'active' : ''}
              onClick={() => onDraftChange({ sortBy: 'year' })}
            >
              Year
            </button>
            <button
              type="button"
              className={draftFilters.sortBy === 'title' ? 'active' : ''}
              onClick={() => onDraftChange({ sortBy: 'title' })}
            >
              Title
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters-label">Type</div>
          <select
            className="filter-input"
            value={draftFilters.type}
            onChange={e => onDraftChange({ type: e.target.value })}
          >
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
            <option value="game">Game</option>
          </select>
        </div>

        <div className="filters-section">
          <div className="filters-label">Year</div>
          <input
            className="filter-input"
            placeholder="e.g. 2014"
            value={draftFilters.year}
            onChange={e => onDraftChange({ year: e.target.value.replace(/[^\d]/g, '').slice(0, 4) })}
          />
        </div>

        <div className="filters-actions">
          <button className="filters-clear" type="button" onClick={onReset}>
            Reset
          </button>
          <button className="filters-show" type="button" onClick={onApply}>
            Apply
          </button>
        </div>
      </aside>
    </div>
  )
}

