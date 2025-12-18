import React, { useMemo } from "react";

type RecipeRainProps = {
  variant: "full" | "border";
  className?: string;
  columns?: number; // full: 10 default
};

export default function RecipeRain({
  variant,
  className = "",
  columns,
}: RecipeRainProps) {
  const recipeLines = useMemo(
    () => [
      "brioche bun :: seared brisket :: tangy bbq",
      "pickled onions + jalapeños :: fold + press",
      "hoagie roll :: hoisin grilled beef :: cilantro",
      "pho mayo :: dipping broth :: serve hot",
      "pepper jack :: pineapple chutney :: al pastor",
      "pickled red onion :: toast until crisp",
      "butter griddle :: melt stack :: repeat",
      "cheddar + fontina :: heat index +1",
      "slice diagonal :: wrap tight :: vanish",
      "salt :: acid :: fat :: heat :: bread",
      "compile recipe block :: OK",
      "render sandwich payload :: OK",
      "sauce checksum :: verified",
      "toasted edges :: locked",
      "inventory: infinite vibes",
      "ERR: sandwich_not_found",
      "fallback: delicious_sandwiches_access",
      "request: ENTER PASSWORD",
    ],
    []
  );

  const count =
    typeof columns === "number"
      ? columns
      : variant === "full"
      ? 10
      : 3; // borders use a few narrow columns

  const cols = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  // Duplicate lines so the loop feels continuous
  const content = useMemo(() => {
    const block = recipeLines.join("\n");
    return `${block}\n${block}\n${block}`;
  }, [recipeLines]);

  return (
    <div className={`recipe-rain ${variant} ${className}`.trim()} aria-hidden="true">
      {cols.map((i) => {
        // deterministic-ish variation per column
        const dur = 6 + ((i * 37) % 8); // 6–13s
        const delay = -((i * 53) % 12); // negative delays to desync
        const drift = ((i * 19) % 7) - 3; // -3..+3 px
        const intensity = 0.18 + (((i * 11) % 6) * 0.02); // 0.18..0.28

        return (
          <div
            key={i}
            className="recipe-col"
            style={
              {
                ["--dur" as any]: `${dur}s`,
                ["--delay" as any]: `${delay}s`,
                ["--drift" as any]: `${drift}px`,
                ["--alpha" as any]: intensity,
              } as React.CSSProperties
            }
          >
            <pre className="recipe-stream">{content}</pre>
          </div>
        );
      })}
    </div>
  );
}