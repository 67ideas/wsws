import Link from "next/link";
import { MermaidChart } from "@/components/mermaid-chart";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  corePipeline,
  integrationArchitecture,
  phaseStateMachine,
  proFullDuplex,
} from "@/lib/mermaid-diagrams";

const phases = [
  {
    name: "Wake",
    trigger: "Alarm signal",
    success: "Feet on floor, eyes open >3s",
    retry: "Exponential backoff, max 3",
    note: "Primary failure surface; ~70% retry rate in winter weekdays.",
  },
  {
    name: "Shower",
    trigger: "Wake.completed",
    success: "Temperature normalized, hygiene SLO met",
    retry: "None — single attempt",
    note: "Includes non-skippable existentialStare sub-phase in production.",
  },
  {
    name: "Walk",
    trigger: "Shower.completed + coffee.injected",
    success: "Arrival at transit node or destination",
    retry: "Strategy fallback chain",
    note: "keysWalletPhone gate enforced before entry.",
  },
  {
    name: "Sit",
    trigger: "Walk.completed",
    success: "Desk occupied, laptop open, Slack green",
    retry: "Linear scan — adjacent desks",
    note: "Terminal phase; pipeline resolves here.",
  },
] as const;

const middlewareRows = [
  {
    name: "CoffeeMiddleware",
    point: "Post-Shower",
    effect: "Raises alertness by 20–40 pts (shots configurable).",
  },
  {
    name: "PodcastMiddleware",
    point: "Walk",
    effect: "Occupies audio channel; ~30% perceived duration reduction.",
  },
  {
    name: "WeatherMiddleware",
    point: "Pre-Walk",
    effect: "Injects weather context into Walk strategy selection.",
  },
  {
    name: "MusicMiddleware",
    point: "Any phase",
    effect: "Background mood uplift; genre by time-of-day.",
  },
  {
    name: "NewsMiddleware",
    point: "Post-Wake",
    effect: "Current events injection; may degrade mood — use cautiously.",
  },
] as const;

const benchmarkRows = [
  {
    metric: "Cold start (alarm → eyes open)",
    p50: "12min",
    p95: "27min",
    p99: "45min",
    notes: "Includes snooze retries; Monday P99 higher.",
  },
  {
    metric: "Shower duration",
    p50: "7min",
    p95: "14min",
    p99: "22min",
    notes: "P99 driven by existentialStare.",
  },
  {
    metric: "Walk throughput",
    p50: "18min",
    p95: "32min",
    p99: "51min",
    notes: "Rideshare fallback inflates tail.",
  },
  {
    metric: "Desk acquisition",
    p50: "30s",
    p95: "2min",
    p99: "8min",
    notes: "Open offices degrade P99.",
  },
  {
    metric: "Total pipeline",
    p50: "42min",
    p95: "68min",
    p99: "94min",
    notes: "Alarm fire → Slack status green.",
  },
] as const;

const sloRows = [
  { slo: "Commute success rate", target: "99.5%", actual: "97.2%" },
  { slo: "On-time desk arrival", target: "95.0%", actual: "89.1%" },
  { slo: "Shower phase completion", target: "99.9%", actual: "99.7%" },
  { slo: "Zero-snooze wake rate", target: "30.0%", actual: "12.4%" },
] as const;

const proFeatures = [
  "Full-duplex lifecycle across morning and evening pipelines",
  "Energy budgeting with predictive modeling across six phases",
  "Workday bridge — hydration and alertness telemetry through Sit → EveningWalk",
  "Sleep seeds next-day Wake alarm configuration",
  "Weekend overrides — extended Sleep; Wake retries disabled",
  "Holiday mode — phases suspended; state frozen until next business day",
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm tracking-tight text-wsws transition-colors hover:text-wsws-dim"
          >
            WSWS
          </Link>
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground sm:flex">
            <a href="#pipeline" className="hover:text-foreground">
              Pipeline
            </a>
            <a href="#phase-lifecycle" className="hover:text-foreground">
              Phase lifecycle
            </a>
            <a href="#phases" className="hover:text-foreground">
              Phases
            </a>
            <a href="#middleware" className="hover:text-foreground">
              Middleware
            </a>
            <a href="#benchmarks" className="hover:text-foreground">
              Benchmarks
            </a>
            <a href="#integrations" className="hover:text-foreground">
              Integrations
            </a>
          </nav>
          <Link
            href="#quickstart"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Quickstart
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-4 py-16 sm:px-6">
        <section className="space-y-8">
          <p className="text-xs uppercase tracking-[0.25em] text-wsws-dim">
            Production-grade human commute orchestration
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              <span className="text-wsws">Wake</span>
              <span className="text-muted-foreground"> → </span>
              <span className="text-wsws">Shower</span>
              <span className="text-muted-foreground"> → </span>
              <span className="text-wsws">Walk</span>
              <span className="text-muted-foreground"> → </span>
              <span className="text-wsws">Sit</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              WSWS is a deterministic morning pipeline with first-class retry
              semantics, middleware injection, observability, and graceful
              degradation when external providers fail.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[10px]">
              commutes orchestrated · 1.2B
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              snoozes retried · 4.7B
            </Badge>
            <Badge
              variant="outline"
              className="border-destructive/40 text-[10px] text-destructive"
            >
              showers skipped · 0
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              MIT License
            </Badge>
          </div>
        </section>

        <section id="pipeline" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Core pipeline
            </h2>
            <p className="max-w-xl text-xs text-muted-foreground">
              Sequential execution only. Parallel phase proposals rejected under
              RFC-0017.
            </p>
          </div>
          <Card className="border-border/80 bg-card/40">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              {(["Wake", "Shower", "Coffee", "Walk", "Sit"] as const).map(
                (step, i, arr) => (
                  <div key={step} className="flex flex-1 items-center gap-2">
                    <div className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
                      <span
                        className={`text-sm ${step === "Coffee" ? "text-wsws-dim" : "text-wsws"}`}
                      >
                        {step}
                      </span>
                      {step === "Coffee" && (
                        <span className="text-[10px] text-muted-foreground">
                          middleware
                        </span>
                      )}
                    </div>
                    {i < arr.length - 1 && (
                      <span className="hidden text-muted-foreground sm:inline">
                        ───►
                      </span>
                    )}
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">WSWS Core Pipeline</CardTitle>
              <CardDescription className="text-xs">
                Alarm retry loop through coffee middleware, weather-conditioned
                Walk strategies, and Sit terminal state — from the spec.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <MermaidChart chart={corePipeline} />
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Deterministic ordering",
                body: "Wake always precedes Shower. State flows forward; phases never reset CommuteState.",
              },
              {
                title: "Retry where it belongs",
                body: "Wake: exponential / linear / chaotic backoff. Shower: single attempt. Walk: strategy fallback ending in remote-shim as degraded mode.",
              },
              {
                title: "Observable commute",
                body: "Energy, alertness, hydration (0–100), phase timestamps, and duration traces out of the box.",
              },
              {
                title: "Middleware bus",
                body: "Coffee post-Shower; weather pre-Walk. Custom middleware via createMiddleware pattern.",
              },
              {
                title: "Walk strategies",
                body: "Default → umbrella → rideshare → remote-shim (remote-shim is last-resort partial failure).",
              },
              {
                title: "Durable state",
                body: "keysWalletPhone gate before Walk. Wardrobe and timestamps persist across boundaries.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-border/60 bg-card/30"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="phase-lifecycle" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Phase state machine
            </h2>
            <p className="max-w-2xl text-xs text-muted-foreground">
              Every WSWS phase shares the same lifecycle hooks: trigger,
              success, error, and retry policy exhaustion.
            </p>
          </div>
          <Card className="border-border/80 bg-card/40">
            <CardContent className="p-6">
              <MermaidChart chart={phaseStateMachine} />
            </CardContent>
          </Card>
        </section>

        <section id="phases" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Phase reference
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {phases.map((p) => (
              <Card key={p.name} className="border-border/60 bg-card/30">
                <CardHeader>
                  <CardTitle className="flex items-baseline gap-2 text-lg">
                    {p.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {p.note}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-muted-foreground">Trigger · </span>
                    {p.trigger}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Success · </span>
                    {p.success}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Retry · </span>
                    {p.retry}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="middleware" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Built-in middleware
          </h2>
          <Card className="border-border/60 bg-card/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="text-xs">Middleware</TableHead>
                  <TableHead className="text-xs">
                    Injection point
                  </TableHead>
                  <TableHead className="text-xs">Effect</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {middlewareRows.map((row) => (
                  <TableRow key={row.name} className="border-border/60">
                    <TableCell className="text-xs text-wsws">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-xs">
                      {row.point}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {row.effect}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section id="benchmarks" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Benchmarks
            </h2>
            <p className="text-xs text-muted-foreground">
              Measured across 10k commuters · 90 weekdays · excludes holidays
              and remote-shim invocations.
            </p>
          </div>
          <Card className="border-border/60 bg-card/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="text-xs">Metric</TableHead>
                  <TableHead className="text-xs text-right">
                    P50
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    P95
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    P99
                  </TableHead>
                  <TableHead className="text-xs">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkRows.map((row) => (
                  <TableRow key={row.metric} className="border-border/60">
                    <TableCell className="max-w-[200px] text-sm">
                      {row.metric}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {row.p50}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {row.p95}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {row.p99}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">
              Reliability SLOs
            </h3>
            <Card className="border-border/60 bg-card/30 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="text-xs">SLO</TableHead>
                    <TableHead className="text-xs text-right">
                      Target
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      Actual
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sloRows.map((row) => (
                    <TableRow key={row.slo} className="border-border/60">
                      <TableCell className="text-sm">{row.slo}</TableCell>
                      <TableCell className="text-right text-xs">
                        {row.target}
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        {row.actual}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        <section id="pro-lifecycle" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              WSWSWS Pro
            </h2>
            <Badge variant="outline" className="w-fit text-[10px]">
              Evening · Walk → Sleep
            </Badge>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Extends the core pipeline across the workday boundary with evening
            return phases and durable state into the next Wake cycle.
          </p>

          <Card className="border-border/80 bg-card/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Full-duplex lifecycle
              </CardTitle>
              <CardDescription className="text-xs">
                Morning pipeline, workday bridge, and evening pipeline with
                annotated energy and hydration notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <MermaidChart chart={proFullDuplex} />
            </CardContent>
          </Card>

          <ul className="grid gap-3 sm:grid-cols-2">
            {proFeatures.map((f) => (
              <li
                key={f}
                className="flex gap-3 text-xs leading-relaxed text-muted-foreground"
              >
                <span className="text-wsws">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="quickstart" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Quickstart</h2>
          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <CardDescription className="text-xs">
                From the npm package — individual phases or full pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg border border-border/60 bg-background/80 p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
                <code>{`npm run wake       # Wake phase only
npm run shower     # Shower phase only
npm run walk       # Walk phase only
npm run sit        # Sit phase only
npm run commute    # Full pipeline
npm run commute:pro # Pipeline + evening queue stub`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        <section id="integrations" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            AI environment integrations
          </h2>

          <Card className="border-border/80 bg-card/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Integration architecture
              </CardTitle>
              <CardDescription className="text-xs">
                AI tooling surfaces call into the WSWS runtime; observability
                consumes phase and commute telemetry.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <MermaidChart chart={integrationArchitecture} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Cursor",
                detail:
                  "Skill + always-on rule for commute-aware development and phase-gated reviews.",
              },
              {
                name: "Claude Code",
                detail:
                  "CLAUDE.md provides invariants: ordering, Shower non-skippable, retry semantics.",
              },
              {
                name: "Codex",
                detail:
                  "Skill + agent stub for pipeline planning and configuration generation.",
              },
            ].map((x) => (
              <Card key={x.name} className="border-border/60 bg-card/30">
                <CardHeader>
                  <CardTitle className="text-base text-wsws">
                    {x.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{x.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-border/60" />

        <section className="space-y-4 pb-8 text-xs text-muted-foreground">
          <p>
            CommuteState carries{" "}
            <span className="text-foreground">energy</span>,{" "}
            <span className="text-foreground">alertness</span>,{" "}
            <span className="text-foreground">hydration</span>, and{" "}
            <span className="text-foreground">keysWalletPhone</span> through
            every transition. Durations use string literals (
            <code className="font-mono text-wsws-dim">&apos;7m&apos;</code>,{" "}
            <code className="font-mono text-wsws-dim">&apos;30s&apos;</code>) — never raw
            numbers.
          </p>
          <p className="text-[10px]">
            DST handling is a known issue. See GitHub issue #47 in the upstream
            spec.
          </p>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>WSWS Framework · specification &amp; tooling</span>
          <Link
            href="https://github.com/67ideas/wsws"
            className="text-wsws hover:underline"
          >
            github.com/67ideas/wsws
          </Link>
        </div>
      </footer>
    </div>
  );
}
