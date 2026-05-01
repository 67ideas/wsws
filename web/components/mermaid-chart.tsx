"use client";

import { useEffect, useRef, useState } from "react";

let mermaidInitialized = false;

type MermaidChartProps = {
  chart: string;
  className?: string;
};

export function MermaidChart({ chart, className }: MermaidChartProps) {
  const uidRef = useRef<string>("");
  if (!uidRef.current) {
    uidRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `m-${Math.random().toString(36).slice(2)}`;
  }
  const seqRef = useRef(0);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    seqRef.current += 1;
    const renderId = `${uidRef.current}-${seqRef.current}`;

    void (async () => {
      const mermaid = (await import("mermaid")).default;
      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        });
        mermaidInitialized = true;
      }
      try {
        const { svg: out } = await mermaid.render(renderId, chart);
        if (!cancelled) setSvg(out);
      } catch {
        if (!cancelled) setSvg(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (!svg) {
    return (
      <div
        className={`flex min-h-[120px] items-center justify-center rounded-md border border-border/60 bg-muted/20 text-xs text-muted-foreground ${className ?? ""}`}
      >
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className={`mermaid-chart flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-none ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
