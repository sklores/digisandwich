import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundLanding() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bootGlitch, setBootGlitch] = useState(true);

  // one-time glitch on first load
  useEffect(() => {
    const t = window.setTimeout(() => setBootGlitch(false), 650);
    return () => window.clearTimeout(t);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      navigate("/order");
    }, 500);
  }

  return (
    <div
      className={`app-shell ${
        bootGlitch && !isTransitioning ? "boot-glitch" : ""
      } ${isTransitioning ? "is-transitioning" : ""}`}
    >
      <div className="hero">
        <div className="ghost-404" aria-hidden="true">
          404
        </div>

        <img
          className="sandwich-icon"
          src="/images/sandwich.png"
          alt=""
          aria-hidden="true"
        />

        <div className="band">
          <h1>Sorry, Sandwich Not Found</h1>
          <p>The sandwich you requested could not be found</p>
        </div>

        <form className="access-form" onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}