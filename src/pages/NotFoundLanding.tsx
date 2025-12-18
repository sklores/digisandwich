import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundLanding() {
  const navigate = useNavigate();

  // Boot terminal overlay (3 seconds)
  const [isBooting, setIsBooting] = useState(true);
  const [terminalText, setTerminalText] = useState("");

  // Page states
  const [password, setPassword] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 404 glitch bursts (initial + occasional)
  const [glitch404On, setGlitch404On] = useState(false);

  // Glitch line between sandwich + band
  const NORMAL_LINE = "ERR: 404 SANDWICH_NOT_FOUND";
  const PROMPT_LINE = "ENTER PASSWORD // DELICIOUS SANDWICHES ACCESS";
  const [glitchLine, setGlitchLine] = useState(NORMAL_LINE);

  const bootTimer = useRef<number | undefined>(undefined);
  const bootTick = useRef<number | undefined>(undefined);

  const transitionTimer = useRef<number | undefined>(undefined);
  const microTimer = useRef<number | undefined>(undefined);
  const lineTimer = useRef<number | undefined>(undefined);

  const glitchMessages = useMemo(
    () => [
      "parsing recipe blocks…",
      "hydrating dough cache…",
      "toasting pipeline warmed…",
      "searing brisket vectors…",
      "pickling onions… OK",
      "rendering jalapeños… OK",
      "bbq checksum mismatch…",
      "pho broth handshake failed…",
      "access table updated…",
      "deleting evidence…",
    ],
    []
  );

  const charset = useMemo(
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./\\:;+=-*#@!?",
    []
  );

  const terminalScript = useMemo(() => {
    // “writing sandwich recipes” vibe
    return [
      "> boot: sandwich-runtime v0.404",
      "> mount: /recipes",
      "> compile: brisket.brioche",
      "  - seared_brisket()",
      "  - pickled_onions()",
      "  - jalapenos()",
      "  - tangy_bbq_sauce()",
      "> compile: pho_dip.hoagie",
      "  - hoisin_grilled_beef()",
      "  - cilantro()",
      "  - pho_mayo()",
      "  - dipping_broth()",
      "> compile: al_pastor.cheese_steak",
      "  - pepper_jack()",
      "  - pineapple_chutney()",
      "  - pickled_red_onion()",
      "> execute: serve()",
      "E: SANDWICH_NOT_FOUND (404)",
      "> fallback: error_page()",
    ].join("\n");
  }, []);

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
      const intensity = 0.78 - pct * 0.58; // ~0.78 -> ~0.20
      setGlitchLine(scramble(message, intensity));

      if (t >= durationMs) {
        window.clearInterval(lineTimer.current);
        lineTimer.current = undefined;
        setGlitchLine(message);
      }
    }, 70);
  }

  function scheduleMicroGlitch() {
    const next = 8000 + Math.floor(Math.random() * 4000); // 8–12 seconds
    microTimer.current = window.setTimeout(() => {
      if (!isBooting && !isTransitioning) {
        pulse404(520);

        runGlitchLineBurst(PROMPT_LINE, 1400);
        window.setTimeout(() => {
          if (!isTransitioning) runGlitchLineBurst(NORMAL_LINE, 650);
        }, 1750);
      }
      scheduleMicroGlitch();
    }, next);
  }

  // Boot overlay: type script for exactly 3 seconds
  useEffect(() => {
    const start = Date.now();
    const total = terminalScript.length;

    bootTick.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / 3000);
      const chars = Math.max(0, Math.floor(total * p));
      setTerminalText(terminalScript.slice(0, chars));
      if (p >= 1) {
        if (bootTick.current) window.clearInterval(bootTick.current);
        bootTick.current = undefined;
      }
    }, 40);

    bootTimer.current = window.setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    return () => {
      if (bootTimer.current) window.clearTimeout(bootTimer.current);
      if (bootTick.current) window.clearInterval(bootTick.current);
    };
  }, [terminalScript]);

  // After boot, kick off initial glitch + micro-glitch schedule
  useEffect(() => {
    if (isBooting) return;

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
  }, [isBooting]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setIsTransitioning(true);

    // punch + glitch-out before routing
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
        {isBooting && (
          <div className="boot-overlay" aria-hidden="true">
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

        <div className="stack" aria-hidden="true">
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