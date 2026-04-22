import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { setFavorites, setThemeDark, setProfile } from './redux/appSlice'

function App() {
  const dispatch = useDispatch()
  const themeDark = useSelector(state => state.app.themeDark)
  const favorites = useSelector(state => state.app.favorites)
  const profile = useSelector(state => state.app.profile)

  useEffect(() => {
    localStorage.setItem('pixema-dark', JSON.stringify(themeDark))
  }, [themeDark])

  useEffect(() => {
    localStorage.setItem('pixema-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('pixema-profile', JSON.stringify(profile))
  }, [profile])

  const onFavoriteToggle = updater => {
    const nextFavorites = typeof updater === 'function' ? updater(favorites) : updater
    dispatch(setFavorites(nextFavorites))
  }

  const onThemeChange = value => {
    dispatch(setThemeDark(value))
  }

  const onProfileChange = updater => {
    const nextProfile = typeof updater === 'function' ? updater(profile) : updater
    dispatch(setProfile(nextProfile))
  }

  return (
    <div className={themeDark ? 'pixema-shell dark' : 'pixema-shell'}>
      <Routes>
        <Route path='/' element={<Navigate to='/main' replace />} />
        <Route
          path='*'
          element={
            <AppLayout
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
              themeDark={themeDark}
              onThemeChange={onThemeChange}
              profile={profile}
              onProfileChange={onProfileChange}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
