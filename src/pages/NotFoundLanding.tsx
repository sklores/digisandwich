import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeRain from "../components/RecipeRain";

type BootFlash = {
  on: boolean;
  src: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
};

export default function NotFoundLanding() {
  const navigate = useNavigate();

  // Boot terminal overlay (3 seconds)
  const [isBooting, setIsBooting] = useState(true);
  const [terminalText, setTerminalText] = useState("");

  // Boot flashes (thumbnails that flicker)
  const [bootFlash, setBootFlash] = useState<BootFlash>({
    on: false,
    src: "",
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
  });

  // Main page
  const [password, setPassword] = useState("");

  // 404 glitch bursts (initial + occasional)
  const [glitch404On, setGlitch404On] = useState(false);

  // Glitch line under 404/icon
  const NORMAL_LINE = "ERR: 404 SANDWICH_NOT_FOUND";
  const PROMPT_LINE = "ENTER PASSWORD // DELICIOUS SANDWICHES ACCESS";
  const [glitchLine, setGlitchLine] = useState(NORMAL_LINE);

  // Password flow takeover
  const [isRainTakeover, setIsRainTakeover] = useState(false);
  const [isRainDissolving, setIsRainDissolving] = useState(false);

  const bootTimer = useRef<number | undefined>(undefined);
  const bootTick = useRef<number | undefined>(undefined);

  const microTimer = useRef<number | undefined>(undefined);
  const lineTimer = useRef<number | undefined>(undefined);

  const takeoverTimer = useRef<number | undefined>(undefined);
  const dissolveTimer = useRef<number | undefined>(undefined);

  const flashTimers = useRef<number[]>([]);

  const charset = useMemo(
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./\\:;+=-*#@!?",
    []
  );

  const menuPics = useMemo(
    () => [
      "/images/menupics/brisket.jpg",
      "/images/menupics/phodip.jpg",
      "/images/menupics/alpastorcheesesteak.jpg",
      "/images/menupics/Michelada%20Mixto.jpg",
      "/images/menupics/berberegyro.jpg",
      "/images/menupics/ultimaterye.jpg",
      "/images/menupics/chinesepork.jpg",
    ],
    []
  );

  const terminalScript = useMemo(() => {
    return [
      "> boot: sandwich-runtime v0.404",
      "> mount: /recipes",
      "> index: /images/menupics",
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

  function runGlitchLineBurst(message: string, durationMs = 1200) {
    if (lineTimer.current) window.clearInterval(lineTimer.current);

    const start = Date.now();
    lineTimer.current = window.setInterval(() => {
      const t = Date.now() - start;
      const pct = Math.min(1, t / durationMs);
      const intensity = 0.82 - pct * 0.60; // wild -> calm

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
      if (!isBooting && !isRainTakeover) {
        pulse404(520);
        runGlitchLineBurst(PROMPT_LINE, 1350);
        window.setTimeout(() => {
          if (!isRainTakeover) runGlitchLineBurst(NORMAL_LINE, 650);
        }, 1650);
      }
      scheduleMicroGlitch();
    }, next);
  }

  // Boot overlay: type script for exactly 3 seconds + 4 quick thumbnail flashes
  useEffect(() => {
    const start = Date.now();
    const total = terminalScript.length;

    // typing
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

    // schedule 4 flashes inside the 3s window
    const flashAt = [420, 1020, 1680, 2320]; // ms after boot start
    const flashDur = 170; // ms visible each flash

    flashAt.forEach((t) => {
      const id = window.setTimeout(() => {
        // random image + random-ish placement inside terminal box
        const src = menuPics[Math.floor(Math.random() * menuPics.length)];
        const x = 12 + Math.floor(Math.random() * 56); // % (left)
        const y = 10 + Math.floor(Math.random() * 55); // % (top)
        const rot = -10 + Math.floor(Math.random() * 21); // -10..+10 deg
        const scale = 0.92 + Math.random() * 0.24; // ~0.92..1.16

        setBootFlash({ on: true, src, x, y, rot, scale });

        const offId = window.setTimeout(() => {
          setBootFlash((prev) => ({ ...prev, on: false }));
        }, flashDur);

        flashTimers.current.push(offId);
      }, t);

      flashTimers.current.push(id);
    });

    // boot ends at 3s
    bootTimer.current = window.setTimeout(() => {
      setBootFlash((prev) => ({ ...prev, on: false }));
      setIsBooting(false);
    }, 3000);

    return () => {
      if (bootTimer.current) window.clearTimeout(bootTimer.current);
      if (bootTick.current) window.clearInterval(bootTick.current);

      flashTimers.current.forEach((id) => window.clearTimeout(id));
      flashTimers.current = [];
    };
  }, [menuPics, terminalScript]);

  // After boot, kick initial glitch + schedule micro-glitches
  useEffect(() => {
    if (isBooting) return;

    pulse404(700);
    runGlitchLineBurst(PROMPT_LINE, 1150);
    window.setTimeout(() => runGlitchLineBurst(NORMAL_LINE, 700), 1400);
    scheduleMicroGlitch();

    return () => {
      if (microTimer.current) window.clearTimeout(microTimer.current);
      if (lineTimer.current) window.clearInterval(lineTimer.current);
      if (takeoverTimer.current) window.clearTimeout(takeoverTimer.current);
      if (dissolveTimer.current) window.clearTimeout(dissolveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooting]);

  function startRainSequence() {
    setIsRainTakeover(true);
    setIsRainDissolving(false);

    dissolveTimer.current = window.setTimeout(() => {
      setIsRainDissolving(true);
    }, 4200);

    takeoverTimer.current = window.setTimeout(() => {
      navigate("/order");
    }, 5000);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    pulse404(520);
    runGlitchLineBurst(PROMPT_LINE, 520);

    startRainSequence();
  }

  return (
    <div className="app-shell">
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

              {/* flash layer sits above the terminal text */}
              {bootFlash.on && (
                <div
                  className="boot-flash"
                  style={{
                    left: `${bootFlash.x}%`,
                    top: `${bootFlash.y}%`,
                    transform: `translate(-50%, -50%) rotate(${bootFlash.rot}deg) scale(${bootFlash.scale})`,
                  }}
                >
                  <img src={bootFlash.src} alt="" />
                </div>
              )}

              <pre className="terminal-body">
                {terminalText}
                <span className="cursor">█</span>
              </pre>
            </div>
          </div>
        )}

        {/* Normal landing content */}
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

        {/* 5s recipe-rain takeover after password */}
        {isRainTakeover && (
          <div
            className={`rain-takeover ${
              isRainDissolving ? "rain-dissolve" : ""
            }`}
            aria-hidden="true"
          >
            <RecipeRain variant="full" columns={10} />
          </div>
        )}
      </div>
    </div>
  );
}