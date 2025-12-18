import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundLanding() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 404 glitch bursts (initial + occasional)
  const [glitch404On, setGlitch404On] = useState(true);

  // Glitch line between 404+icon and the band
  const NORMAL_LINE = "ERR: 404 SANDWICH_NOT_FOUND";
  const PROMPT_LINE = "ENTER PASSWORD // DELICIOUS SANDWICHES ACCESS";
  const [glitchLine, setGlitchLine] = useState(NORMAL_LINE);

  const transitionTimer = useRef<number | undefined>(undefined);
  const microTimer = useRef<number | undefined>(undefined);
  const lineTimer = useRef<number | undefined>(undefined);

  const glitchMessages = useMemo(
    () => [
      "rerouting sandwich matrix…",
      "recompiling bread schema…",
      "decrypting sauce payload…",
      "aligning cheese vectors…",
      "hotfixing toasted edges…",
      "forcing cache refresh…",
      "negotiating with the void…",
    ],
    []
  );

  const charset = useMemo(
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./\\:;+=-*#@!?",
    []
  );

  function scramble(base: string, intensity = 0.35) {
    const chars = base.split("");
    for (let i = 0; i < chars.length; i++) {
      if (base[i] === " ") continue;
      if (Math.random() < intensity) {
        chars[i] = charset[Math.floor(Math.random() * charset.length)];
      }
    }
    return chars.join("");
  }

  function pulse404(ms = 420) {
    setGlitch404On(true);
    window.setTimeout(() => setGlitch404On(false), ms);
  }

  function runGlitchLineBurst(message: string, durationMs = 1300) {
    if (lineTimer.current) window.clearInterval(lineTimer.current);

    const start = Date.now();
    lineTimer.current = window.setInterval(() => {
      const t = Date.now() - start;
      const pct = Math.min(1, t / durationMs);

      // start wild, settle down
      const intensity = 0.72 - pct * 0.52; // ~0.72 -> ~0.20
      setGlitchLine(scramble(message, intensity));

      if (t >= durationMs) {
        window.clearInterval(lineTimer.current);
        lineTimer.current = undefined;
        setGlitchLine(message);
      }
    }, 80);
  }

  function scheduleMicroGlitch() {
    const next = 8000 + Math.floor(Math.random() * 4000); // 8–12 seconds
    microTimer.current = window.setTimeout(() => {
      if (!isTransitioning) {
        pulse404(520);

        // make the line do something eye-catching
        runGlitchLineBurst(PROMPT_LINE, 1400);
        window.setTimeout(() => {
          if (!isTransitioning) runGlitchLineBurst(NORMAL_LINE, 650);
        }, 1750);
      }
      scheduleMicroGlitch();
    }, next);
  }

  useEffect(() => {
    // initial boot punch
    pulse404(700);
    runGlitchLineBurst(PROMPT_LINE, 1200);
    window.setTimeout(() => runGlitchLineBurst(NORMAL_LINE, 700), 1500);

    scheduleMicroGlitch();

    return () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
      if (microTimer.current) window.clearTimeout(microTimer.current);
      if (lineTimer.current) window.clearInterval(lineTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setIsTransitioning(true);

    // one last punch before routing
    pulse404(520);
    runGlitchLineBurst(PROMPT_LINE, 520);

    transitionTimer.current = window.setTimeout(() => {
      navigate("/order");
    }, 560);
  }

  const transitionMessage =
    glitchMessages[Math.floor((Date.now() / 900) % glitchMessages.length)];

  return (
    <div className={`app-shell ${isTransitioning ? "is-transitioning" : ""}`}>
      <div className="hero">
        <div className="top-row" aria-hidden="true">
          <div className={`ghost-404 ${glitch404On ? "glitch-on" : ""}`}>404</div>

          <img
            className="sandwich-icon"
            src="/images/sandwich.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="glitch-line" aria-hidden="true">
          <span className="glitch-line-text">{glitchLine}</span>
        </div>

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

        {isTransitioning && (
          <div className="transition-overlay" aria-hidden="true">
            <div className="transition-panel">
              <div className="transition-title">ACCESS GRANTED</div>
              <div className="transition-sub">{transitionMessage}</div>
              <div className="transition-bar">
                <span className="transition-bar-glow" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotFoundLanding;