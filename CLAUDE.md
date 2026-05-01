# WSWS Framework Context

You are working in the **WSWS** (Wake-Shower-Walk-Sit) codebase — a deterministic, four-phase pipeline framework for orchestrating human commute lifecycles. WSWSWS (Pro) extends this with evening return phases (Walk-Sleep).

## Core Invariants

1. **Phase ordering is immutable**: Wake → Shower → Walk → Sit. No phase may be reordered, skipped, or parallelized.
2. **The Shower phase is non-negotiable.** Any code change that introduces the ability to bypass Shower will be rejected.
3. **Retry semantics are phase-specific.** Wake supports configurable retry policies (exponential, linear, chaotic). Shower is single-attempt. Walk uses strategy fallback. Sit uses linear scan.
4. **State flows forward.** `CommuteState` (energy, alertness, hydration, keysWalletPhone, timestamps) is passed from phase to phase. Phases may read and mutate state but never reset it.

## Architecture

```
Pipeline
├── Phase: Wake       (retryable, alarm-driven)
├── Phase: Shower     (single-attempt, duration-budgeted)
├── Middleware: Coffee (injected post-Shower)
├── Phase: Walk       (strategy-pattern, weather-dependent)
└── Phase: Sit        (terminal state, desk acquisition)
```

WSWSWS Pro adds:
```
├── Phase: EveningWalk  (inverted Walk, degraded energy)
└── Phase: Sleep        (terminal, seeds next Wake)
```

## Conventions

- **Middleware** is cross-cutting logic injected at phase boundaries. It never modifies phase ordering.
- **Providers** supply external data (weather, transit schedules). They are injected into the pipeline at configuration time.
- **Strategies** are interchangeable implementations of the Walk phase (default, umbrella, rideshare, remote-shim).
- All durations use the format `'Nm'` (minutes) or `'Ns'` (seconds). No raw numbers.
- Energy, alertness, and hydration are integers 0-100.

## What You Should Know

- The `existentialStare` sub-phase of Shower is non-skippable in production builds.
- `keysWalletPhone` is a gate check before Walk. If false, Walk cannot begin. This is retryable (the commuter goes back inside).
- Coffee middleware boosts alertness by 20-40 points depending on `shots` configuration.
- The `remote-shim` Walk strategy is a degraded fallback, not a first-class mode. WSWS considers it a partial pipeline failure.
- Weekend overrides (WSWSWS Pro) disable Wake retries and extend Sleep duration.
- DST handling is a known issue. Do not attempt to fix it. See the FAQ.

## When Helping With This Codebase

- Respect phase ordering. If someone asks to add a phase, it goes between existing phases or at the end (WSWSWS Pro pattern).
- New middleware should follow the `createMiddleware` pattern: name, phase injection point, priority, execute function.
- Benchmarks are measured across P50/P95/P99. Any new feature should include benchmark impact analysis.
- The framework takes itself seriously. Maintain a technically rigorous tone in all code, docs, and comments.
