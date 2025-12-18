import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeRain from "../components/RecipeRain";

export default function NotFoundLanding() {
  const navigate = useNavigate();

  // Boot phase
  const [isBooting, setIsBooting] = useState(true);
  const [terminalText, setTerminalText] = useState("");

  // Main interaction
  const [password, setPassword] = useState("");
  const [buttonLabel, setButtonLabel] = useState<"ENTER" | "LOAD MENU">("LOAD MENU");
  const [buttonGlitch, setButtonGlitch] = useState(false);

  // Takeover
  const [isTakeover, setIsTakeover] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);

  const navigateTimer = useRef<number | null>(null);
  const dissolveTimer = useRef<number | null>(null);
  const buttonTimer = useRef<number | null>(null);

  const terminalScript = useMemo(
    () =>
      [
        "> boot: sandwich-runtime v0.404",
        "> mount: /recipes",
        "> index: /images/menupics",
        "> compile: brisket.brioche",
        "> compile: pho_dip.hoagie",
        "> compile: al_pastor.cheese_steak",
        "> execute: serve()",
        "E: SANDWICH_NOT_FOUND (404)",
        "> fallback: error_page()",
      ].join("\n"),
    []
  );

  // Boot typing (exactly 3s)
  useEffect(() => {
    const start = Date.now();
    const total = terminalScript.length;

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(1, elapsed / 3000);
      setTerminalText(terminalScript.slice(0, Math.floor(total * pct)));
      if (pct === 1) {
        window.clearInterval(tick);
        setIsBooting(false);
      }
    }, 40);

    return () => window.clearInterval(tick);
  }, [terminalScript]);

  // Button text loop
  useEffect(() => {
    if (isBooting) return;

    buttonTimer.current = window.setInterval(() => {
      setButtonGlitch(true);
      setTimeout(() => {
        setButtonLabel((p) => (p === "ENTER" ? "LOAD MENU" : "ENTER"));
        setButtonGlitch(false);
      }, 150);
    }, 3200);

    return () => {
      if (buttonTimer.current) window.clearInterval(buttonTimer.current);
    };
  }, [isBooting]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    // Start takeover ONCE
    setIsTakeover(true);

    // Dissolve near the end
    dissolveTimer.current = window.setTimeout(() => {
      setIsDissolving(true);
    }, 4200);

    // Navigate AFTER 5s — this WILL fire
    navigateTimer.current = window.setTimeout(() => {
      navigate("/order");
    }, 5000);
  }

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      if (dissolveTimer.current) window.clearTimeout(dissolveTimer.current);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="hero">
        {isBooting && (
          <div className="boot-overlay">
            <div className="terminal">
              <div className="terminal-header">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="terminal-title">sandwich://boot</span>
              </div>
              <pre className="terminal-body">
                {terminalText}
                <span className="cursor">█</span>
              </pre>
            </div>
          </div>
        )}

        {!isBooting && (
          <>
            <div className="stack">
              <div className="ghost-404">404</div>
              <img className="sandwich-icon" src="/images/sandwich.png" alt="" />
            </div>

            <div className="band">
              <h1>Sorry, Sandwich Not Found</h1>
              <p>The sandwich you requested could not be found</p>
            </div>

            <form className="access-form" onSubmit={handleSubmit}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className={`enter-btn ${buttonGlitch ? "glitching" : ""}`}
                disabled={!password.trim()}
              >
                {buttonLabel}
              </button>
            </form>
          </>
        )}

        {isTakeover && (
          <div className={`rain-takeover ${isDissolving ? "rain-dissolve" : ""}`}>
            <RecipeRain variant="full" columns={10} />
          </div>
        )}
      </div>
    </div>
  );
}