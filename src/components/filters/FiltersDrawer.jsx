function FiltersDrawer({
  isOpen,
  onClose,
  draftFilters,
  onDraftChange,
  onClearFilters,
  onShowFilterResults,
}) {
  if (!isOpen) return null

  return (
    <div className='filters-overlay' onClick={onClose}>
      <aside className='filters-drawer' onClick={event => event.stopPropagation()}>
        <div className='filters-header'>
          <h3>Filters</h3>
          <button className='filters-close' onClick={onClose}>
            ×
          </button>
        </div>

        <p className='filters-label'>Sort by</p>
        <div className='filters-sort'>
          <button
            className={draftFilters.sortBy === 'rating' ? 'active' : ''}
            onClick={() => onDraftChange({ sortBy: 'rating' })}
          >
            Rating
          </button>
          <button
            className={draftFilters.sortBy === 'year' ? 'active' : ''}
            onClick={() => onDraftChange({ sortBy: 'year' })}
          >
            Year
          </button>
        </div>

        <p className='filters-label'>Full or short movie name</p>
        <input
          className='filter-input'
          placeholder='Your text'
          value={draftFilters.query}
          onChange={e => onDraftChange({ query: e.target.value })}
        />

        <p className='filters-label'>Type</p>
        <select
          className='filter-input'
          value={draftFilters.type}
          onChange={e => onDraftChange({ type: e.target.value })}
        >
          <option value=''>All</option>
          <option value='movie'>Movie</option>
          <option value='series'>Series</option>
          <option value='episode'>Episode</option>
          <option value='game'>Game</option>
        </select>

        <p className='filters-label'>Years</p>
        <div className='filters-two'>
          <input
            className='filter-input'
            placeholder='From'
            value={draftFilters.yearFrom}
            onChange={e => onDraftChange({ yearFrom: e.target.value.replace(/[^\d]/g, '').slice(0, 4) })}
          />
          <input
            className='filter-input'
            placeholder='To'
            value={draftFilters.yearTo}
            onChange={e => onDraftChange({ yearTo: e.target.value.replace(/[^\d]/g, '').slice(0, 4) })}
          />
        </div>

        <p className='filters-label'>Rating</p>
        <div className='filters-two'>
          <input
            className='filter-input'
            placeholder='From'
            value={draftFilters.ratingFrom}
            onChange={e => onDraftChange({ ratingFrom: e.target.value })}
          />
          <input
            className='filter-input'
            placeholder='To'
            value={draftFilters.ratingTo}
            onChange={e => onDraftChange({ ratingTo: e.target.value })}
          />
        </div>

        <p className='filters-label'>Country</p>
        <input
          className='filter-input'
          placeholder='Select country'
          value={draftFilters.country}
          onChange={e => onDraftChange({ country: e.target.value })}
        />

        <div className='filters-actions'>
          <button className='filters-clear' onClick={onClearFilters}>
            Clear filter
          </button>
          <button className='filters-show' onClick={onShowFilterResults}>
            Show results
          </button>
        </div>
      </aside>
    </div>
  )
}

export default FiltersDrawer
