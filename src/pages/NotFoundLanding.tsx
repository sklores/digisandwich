import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sandwichIcon from '../assets/sandwich.svg'

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
          <div className="ghost-404">404</div>
          <img className="sandwich-icon" src={sandwichIcon} alt="Sandwich icon" />
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
          <button className="primary-button" type="submit">
            GO TO ORDERING
          </button>
        </form>
      </div>
    </div>
  )
}

export default NotFoundLanding
