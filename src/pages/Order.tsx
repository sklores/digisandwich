import { Link } from 'react-router-dom'

function Order() {
  return (
    <div className="app-shell">
      <div className="page">
        <div className="hero">
          <div className="ghost-404" aria-hidden>
            404
          </div>
        </div>

        <div className="band">
          <div>
            <h1>Ordering Page</h1>
            <p>This is where the ordering UI will go.</p>
          </div>
        </div>

        <p className="subtext">Thanks for stopping by.</p>
        <Link className="helper-button" to="/">
          Back to landing
        </Link>
      </div>
    </div>
  )
}

export default Order
