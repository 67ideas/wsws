---
name: wsws
description: Orchestrate human commute pipelines using the WSWS (Wake-Shower-Walk-Sit) framework. Use when planning commutes, debugging phase failures, optimizing pipeline duration, or extending to WSWSWS Pro (evening phases). Provides deterministic phase ordering, retry policies, middleware injection, and observability.
metadata:
  short-description: Commute pipeline orchestration
---

# WSWS Commute Pipeline Orchestrator

Orchestrate morning commute pipelines using the WSWS framework — a deterministic, four-phase system for getting from bed to desk with full observability and retry semantics.

## Framework Overview

WSWS defines four sequential, non-parallelizable phases:

| # | Phase | Description | Retryable |
|---|-------|-------------|-----------|
| 1 | **Wake** | Alarm-to-consciousness transition | Yes (exponential backoff, max 3) |
| 2 | **Shower** | Hygiene execution with temperature negotiation | No (single attempt) |
| 3 | **Walk** | Transit to destination with weather-dependent strategy | Yes (strategy fallback) |
| 4 | **Sit** | Terminal state: desk acquisition and system boot | Yes (linear desk scan) |

**WSWSWS Pro** adds evening return phases:

| # | Phase | Description |
|---|-------|-------------|
| 5 | **Walk** (evening) | Return transit with degraded energy budget |
| 6 | **Sleep** | Consciousness teardown; seeds next Wake phase |

## When to Invoke This Skill

- Planning a morning commute or optimizing an existing pipeline
- Debugging commute failures (missed alarm, transit disruption, desk unavailable)
- Generating pipeline configurations for new commuters
- Running pre-standup commute diagnostics
- Configuring WSWSWS Pro evening phases
- Analyzing commute benchmarks or SLO compliance

## Pipeline Execution

### Step 1: Configure Commuter Agent

```typescript
const commuter = new Commuter({
  name: string,
  timezone: string,           // IANA timezone
  alarmStrategy: 'exponential' | 'linear' | 'chaotic' | 'none',
  maxSnoozes: number,         // 0-5 recommended
  showerDuration: { min: string, target: string, max: string },
  walkStrategy: 'auto',       // inferred from WeatherProvider
  coffeeMiddleware: 'enabled' | 'disabled',
});
```

### Step 2: Build Pipeline

```typescript
const pipeline = new Pipeline({
  phases: [Wake, Shower, Walk, Sit],
  middleware: [CoffeeMiddleware({ shots: 2 })],
  providers: [WeatherProvider({ source: 'openweathermap' })],
});
```

### Step 3: Execute

```typescript
const result = await pipeline.execute();
// Returns: PhaseResult[] with duration, retries, strategy, and state snapshots
```

## Middleware Reference

| Middleware | Injection Point | Config |
|-----------|----------------|--------|
| Coffee | post-Shower | `{ shots: number, milk: string, temperature: string }` |
| Podcast | Walk entry | `{ feed: string, playbackSpeed: number }` |
| Weather | pre-Walk | `{ source: string, refreshInterval: string }` |
| Music | any phase | `{ genre: 'auto' \| string, volume: number }` |
| Breakfast | post-Shower | `{ calories: number, prepTime: string }` |

## Debugging Commute Failures

When a phase fails:

1. Identify the phase and its current state (Failed vs Abandoned)
2. Check retry policy — has it been exhausted?
3. For Walk failures: was weather provider responsive? Which strategy was attempted?
4. For Wake failures: how many snooze retries occurred? Was alarm volume set to escalating?
5. Check `CommuteState` — is energy or alertness below operating threshold?
6. Recommend configuration adjustments or middleware additions

## Key Constraints

- Phase ordering is immutable: Wake → Shower → Walk → Sit
- The Shower phase cannot be skipped or made optional
- `remote-shim` is always the last Walk strategy (degraded fallback only)
- Duration values use string format: `'7m'`, `'30s'` — never raw numbers
- Energy, alertness, hydration are integers 0-100
- The `existentialStare` Shower sub-phase is non-skippable in production
