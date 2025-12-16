import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sandwichIcon from '../assets/sandwich-icon.svg'

function NotFoundLanding() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password.trim()) {
      navigate('/order')
    }
  }

  return (
    <div className="app-shell">
      <div className="page">
        <div className="hero">
          <div className="ghost-404" aria-hidden="true">
            404
          </div>
          <img
            className="sandwich-icon"
            src={sandwichIcon}
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="band">
          <div>
            <h1>Sorry, Sandwich Not Found</h1>
            <p>The sandwich you requested could not be found</p>
          </div>
        </div>

        <form className="access-form" onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}

export default NotFoundLanding
