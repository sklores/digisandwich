import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sandwichIcon from '../assets/sandwich-icon.svg'

function NotFoundLanding() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [glitchIndex, setGlitchIndex] = useState(0)
  const transitionTimer = useRef<number | undefined>(undefined)
  const glitchTimer = useRef<number | undefined>(undefined)

  const glitchMessages = [
    'rerouting sandwich matrix…',
    'recompiling bread schema…',
    'decrypting sauce payload…',
    'stabilizing crunchy portal…',
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!password.trim() || isTransitioning) {
      return
    }

    setIsTransitioning(true)
    glitchTimer.current = window.setInterval(() => {
      setGlitchIndex((index) => (index + 1) % glitchMessages.length)
    }, 220)
    transitionTimer.current = window.setTimeout(() => {
      navigate('/order')
    }, 1400)
  }

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current)
      }
      if (glitchTimer.current) {
        window.clearInterval(glitchTimer.current)
      }
    }
  }, [])

  return (
    <div className={`app-shell ${isTransitioning ? 'is-transitioning' : ''}`}>
      <div className={`page ${isTransitioning ? 'glitch-out' : ''}`}>
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
            <h1 className="headline-glitch">Sorry, Sandwich Not Found</h1>
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

      {isTransitioning && (
        <div className="glitch-transition" role="status" aria-live="polite">
          <div className="glitch-panel">
            <div className="glitch-panel__heading">system breach acknowledged</div>
            <div className="glitch-panel__noise">
              <span className="noise-bar" />
              <span className="noise-bar" />
              <span className="noise-bar" />
            </div>
            <div className="glitch-panel__feed">
              <div className="feed-lines">
                {glitchMessages.map((message, index) => (
                  <span
                    key={message}
                    className={`feed-line ${index === glitchIndex ? 'is-active' : ''}`}
                  >
                    {message}
                  </span>
                ))}
              </div>
              <div className="feed-progress">
                <span className="progress-glow" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotFoundLanding
