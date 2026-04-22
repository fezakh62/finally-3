import { Link, NavLink } from 'react-router-dom'
import pixemaLogo from '../../../assets/фото/logo.png'
import { MAIN_MENU_ITEMS } from '../../../constants/menu'
import Footer from '../Footer'

function Sidebar() {
  return (
    <aside className='pixema-sidebar'>
      <Link to='/main' className='pixema-logo'>
        <img src={pixemaLogo} alt='Pixema' className='pixema-logo-image' />
      </Link>

      <nav className='pixema-menu'>
        {MAIN_MENU_ITEMS.map(item => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) => `pixema-menu-item ${isActive ? 'active' : ''}`}
          >
            <span className='pixema-menu-icon'>
              <item.icon />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Footer />
    </aside>
  )
}

export default Sidebar
