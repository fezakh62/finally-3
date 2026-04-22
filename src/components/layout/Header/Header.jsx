import { InterfaceFilterIcon } from '../../icons/AppIcons'

function Header({ globalSearch, onGlobalSearchChange, onSubmit, onOpenFilters, profile }) {
  const name = profile?.name || 'User'
  const initials = name
    .split(' ')
    .map(part => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className='pixema-top'>
      <form onSubmit={onSubmit} className='pixema-search-row'>
        <input
          value={globalSearch}
          onChange={event => onGlobalSearchChange(event.target.value)}
          className='pixema-search'
          placeholder='Search'
        />
        <button className='pixema-filter-btn' type='button' onClick={onOpenFilters}>
          <InterfaceFilterIcon />
        </button>
        <button className='pixema-search-btn' type='submit'>
          Go
        </button>
      </form>
      <div className='pixema-profile'>
        <span className='pixema-avatar'>{initials || 'U'}</span>
        <span>{name}</span>
      </div>
    </header>
  )
}

export default Header
