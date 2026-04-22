import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'

export default function AppLayout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQ = searchParams.get('q') || ''
  const [q, setQ] = useState(currentQ)

  const submitToSearch = e => {
    e.preventDefault()
    const next = q.trim()
    if (!next) return
    navigate(`/search?q=${encodeURIComponent(next)}`)
  }

  const topLinks = useMemo(
    () => [
      { to: '/main', label: 'Главная' },
      { to: '/favorites', label: 'Избранное' },
      { to: '/settings', label: 'Настройки' },
    ],
    [],
  )

  return (
    <div className="shell">
      <header className="header">
        <div className="brand">Pixema</div>
        <nav className="topnav">
          {topLinks.map(x => (
            <NavLink key={x.to} to={x.to}>
              {x.label}
            </NavLink>
          ))}
        </nav>

        <form className="search" onSubmit={submitToSearch}>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <div className="content">
        <aside className="sidebar">
          <div className="sidebar__title">Меню</div>
          <NavLink to="/main">Каталог</NavLink>
          <NavLink to="/favorites">Избранное</NavLink>
          <NavLink to="/settings">Профиль</NavLink>
        </aside>

        <main className="main">
          <Outlet />
        </main>
      </div>

      <footer className="footer">Pixema • v3 movies grid + search</footer>
    </div>
  )
}

