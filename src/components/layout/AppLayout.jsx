import { NavLink, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="shell">
      <header className="header">
        <div className="brand">Pixema</div>
        <nav className="topnav">
          <NavLink to="/main">Главная</NavLink>
          <NavLink to="/favorites">Избранное</NavLink>
          <NavLink to="/settings">Настройки</NavLink>
        </nav>
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

      <footer className="footer">Pixema • v2 layout + routing</footer>
    </div>
  )
}

