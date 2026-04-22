function SettingsPage({ themeDark, onThemeChange, profile, onProfileChange }) {
  const name = profile?.name ?? ''
  const email = profile?.email ?? ''

  return (
    <section>
      <h1 className='page-title'>Settings</h1>
      <div className='settings-card'>
        <h3>Profile</h3>
        <div className='settings-grid'>
          <input
            className='filter-input'
            value={name}
            onChange={e => onProfileChange?.(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            className='filter-input'
            value={email}
            onChange={e => onProfileChange?.(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <h3>Password</h3>
        <div className='settings-grid'>
          <input className='filter-input' type='password' placeholder='Your password' />
          <input className='filter-input' type='password' placeholder='New password' />
        </div>
        <h3>Color mode</h3>
        <label className='theme-row'>
          <span>{themeDark ? 'Dark' : 'Light'}</span>
          <input type='checkbox' checked={themeDark} onChange={e => onThemeChange(e.target.checked)} />
        </label>
      </div>
    </section>
  )
}

export default SettingsPage
