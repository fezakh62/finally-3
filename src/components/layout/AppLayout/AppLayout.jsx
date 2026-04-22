import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Header from '../Header'
import FiltersDrawer from '../../filters/FiltersDrawer'
import MovieGridPage from '../../../pages/MovieGridPage'
import SearchPage from '../../../pages/SearchPage'
import FiltersPage from '../../../pages/FiltersPage'
import MoviePage from '../../../pages/MoviePage'
import FavoritesPage from '../../../pages/FavoritesPage'
import SettingsPage from '../../../pages/SettingsPage'
import { INITIAL_APPLIED_FILTERS, INITIAL_DRAFT_FILTERS } from '../../../constants/filters'

function AppLayout({ favorites, onFavoriteToggle, themeDark, onThemeChange, profile, onProfileChange }) {
  const navigate = useNavigate()
  const [globalSearch, setGlobalSearch] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_APPLIED_FILTERS)
  const [draftFilters, setDraftFilters] = useState(INITIAL_DRAFT_FILTERS)

  const updateDraftFilters = partial => {
    setDraftFilters(prev => ({ ...prev, ...partial }))
  }

  const onTopSearchSubmit = event => {
    event.preventDefault()
    const q = globalSearch.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const onShowFilterResults = () => {
    setAppliedFilters({
      type: draftFilters.type,
      yearFrom: draftFilters.yearFrom,
      yearTo: draftFilters.yearTo,
      ratingFrom: draftFilters.ratingFrom,
      ratingTo: draftFilters.ratingTo,
      country: draftFilters.country,
      sortBy: draftFilters.sortBy,
    })

    if (draftFilters.query.trim()) {
      const q = draftFilters.query.trim()
      setGlobalSearch(q)
      navigate(`/search?q=${encodeURIComponent(q)}`)
    }

    setIsFiltersOpen(false)
  }

  const onClearFilters = () => {
    setDraftFilters(INITIAL_DRAFT_FILTERS)
    setAppliedFilters(INITIAL_APPLIED_FILTERS)
  }

  const onRemoveAppliedFilter = key => {
    setDraftFilters(prev => {
      if (key === 'type') return { ...prev, type: '' }
      if (key === 'yearRange') return { ...prev, yearFrom: '', yearTo: '' }
      if (key === 'ratingRange') return { ...prev, ratingFrom: '', ratingTo: '' }
      if (key === 'country') return { ...prev, country: '' }
      return prev
    })
    setAppliedFilters(prev => {
      if (key === 'type') return { ...prev, type: '' }
      if (key === 'yearRange') return { ...prev, yearFrom: '', yearTo: '' }
      if (key === 'ratingRange') return { ...prev, ratingFrom: '', ratingTo: '' }
      if (key === 'country') return { ...prev, country: '' }
      return prev
    })
  }

  return (
    <div className='pixema-layout'>
      <Sidebar />

      <main className='pixema-main'>
        <Header
          globalSearch={globalSearch}
          onGlobalSearchChange={setGlobalSearch}
          onSubmit={onTopSearchSubmit}
          onOpenFilters={() => setIsFiltersOpen(true)}
          profile={profile}
        />

        <Routes>
          <Route
            path='/main'
            element={
              <MovieGridPage
                title='Main'
                initialQuery='avengers'
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
                filters={appliedFilters}
                onRemoveFilter={onRemoveAppliedFilter}
              />
            }
          />
          <Route
            path='/trends'
            element={
              <MovieGridPage
                title='Trends'
                initialQuery='popular'
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
                filters={appliedFilters}
                onRemoveFilter={onRemoveAppliedFilter}
              />
            }
          />
          <Route
            path='/search'
            element={
              <SearchPage
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
                filters={appliedFilters}
                onRemoveFilter={onRemoveAppliedFilter}
              />
            }
          />
          <Route
            path='/sorting'
            element={
              <MovieGridPage
                title='Sorting'
                initialQuery='star'
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
                allowSorting
                filters={appliedFilters}
                onRemoveFilter={onRemoveAppliedFilter}
              />
            }
          />
          <Route
            path='/filters'
            element={
              <FiltersPage
                favorites={favorites}
                onFavoriteToggle={onFavoriteToggle}
                filters={appliedFilters}
                onRemoveFilter={onRemoveAppliedFilter}
              />
            }
          />
          <Route
            path='/movie/:id'
            element={<MoviePage favorites={favorites} onFavoriteToggle={onFavoriteToggle} />}
          />
          <Route
            path='/favorites'
            element={<FavoritesPage favorites={favorites} onFavoriteToggle={onFavoriteToggle} />}
          />
          <Route
            path='/settings'
            element={<SettingsPage themeDark={themeDark} onThemeChange={onThemeChange} profile={profile} onProfileChange={onProfileChange} />}
          />
          <Route path='*' element={<Navigate to='/main' replace />} />
        </Routes>
      </main>

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        draftFilters={draftFilters}
        onDraftChange={updateDraftFilters}
        onClearFilters={onClearFilters}
        onShowFilterResults={onShowFilterResults}
      />
    </div>
  )
}

export default AppLayout
