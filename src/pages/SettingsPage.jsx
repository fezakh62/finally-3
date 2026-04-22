import { useState } from 'react'

export default function SettingsPage({ profile, onProfileChange }) {
  const [name, setName] = useState(profile?.name || '')
  const [email, setEmail] = useState(profile?.email || '')

  const submit = e => {
    e.preventDefault()
    onProfileChange({ name: name.trim(), email: email.trim() })
  }

  return (
    <section className="page">
      <h1>Настройки</h1>
      <form className="settings" onSubmit={submit}>
        <label className="field">
          <div className="field__label">Name</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        </label>

        <label className="field">
          <div className="field__label">Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

