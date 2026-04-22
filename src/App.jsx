import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from './components/layout/AppLayout.jsx'
import MovieGridPage from './pages/MovieGridPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { setFavorites, setProfile, setThemeDark } from './redux/appSlice.js'

export default function App() {
  const dispatch = useDispatch()
  const themeDark = useSelector(s => s.app.themeDark)
  const favorites = useSelector(s => s.app.favorites)
  const profile = useSelector(s => s.app.profile)

  useEffect(() => {
    localStorage.setItem('pixema-dark', JSON.stringify(themeDark))
  }, [themeDark])

  useEffect(() => {
    localStorage.setItem('pixema-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('pixema-profile', JSON.stringify(profile))
  }, [profile])

  const onFavoriteToggle = movie => {
    const exists = favorites.some(x => x.imdbID === movie.imdbID)
    dispatch(setFavorites(exists ? favorites.filter(x => x.imdbID !== movie.imdbID) : [movie, ...favorites]))
  }

  const onThemeChange = value => dispatch(setThemeDark(value))
  const onProfileChange = patch => dispatch(setProfile({ ...profile, ...patch }))

  return (
    <div className={themeDark ? 'theme theme--dark' : 'theme'}>
      <Routes>
        <Route
          element={<AppLayout themeDark={themeDark} onThemeChange={onThemeChange} profile={profile} />}
        >
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route
          path="/main"
          element={<MovieGridPage title="Main" initialQuery="batman" favorites={favorites} onFavoriteToggle={onFavoriteToggle} />}
        />
        <Route path="/search" element={<SearchPage favorites={favorites} onFavoriteToggle={onFavoriteToggle} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onFavoriteToggle={onFavoriteToggle} />} />
        <Route path="/settings" element={<SettingsPage profile={profile} onProfileChange={onProfileChange} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </div>
  )
}

