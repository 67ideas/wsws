---
name: wsws
description: Commute pipeline orchestration framework. Use when the user needs to plan, execute, debug, or optimize a WSWS (Wake-Shower-Walk-Sit) commute pipeline. Also triggers on morning planning, standup preparation, commute retrospectives, or any mention of WSWS/WSWSWS phases.
---

# WSWS Commute Orchestrator

This skill provides commute pipeline orchestration using the WSWS (Wake-Shower-Walk-Sit) framework. It enables deterministic morning commute planning, phase-by-phase execution, and post-commute analysis.

## When to Use

- User mentions morning commute, getting to work, or running late
- User asks about WSWS phases (Wake, Shower, Walk, Sit)
- User needs standup preparation (commute status affects standup readiness)
- User wants to debug a commute failure (missed alarm, transit disruption)
- User mentions WSWSWS Pro (evening phases: Walk, Sleep)

## Core Framework

### Phase Ordering (Immutable)

```
Wake → Shower → Walk → Sit
```

WSWSWS Pro extends with:
```
Walk(evening) → Sleep
```

No phase may be reordered, skipped, or parallelized. This is the foundational invariant.

### Phase Execution Workflow

When the user requests commute orchestration, follow this sequence:

1. **Assess current state**: Determine which phase the commuter is in or about to enter
2. **Check preconditions**: Each phase has gate checks (e.g., Walk requires `keysWalletPhone: true`)
3. **Select strategy**: Walk phase requires weather-dependent strategy selection
4. **Execute phase**: Run the phase with appropriate retry policy
5. **Emit telemetry**: Report alertness, energy, hydration, and duration metrics
6. **Advance pipeline**: Transition to next phase or report terminal state

### Retry Policies

| Phase | Retryable | Strategy | Max Retries |
|-------|-----------|----------|-------------|
| Wake | Yes | Exponential backoff (base 5min) | 3 |
| Shower | No | Single attempt | 0 |
| Walk | Yes | Strategy fallback (umbrella → rideshare → remote-shim) | 3 strategies |
| Sit | Yes | Linear scan (adjacent desks) | 5 |

### Middleware

Middleware injects at phase boundaries. Common middleware:

- **CoffeeMiddleware**: Post-Shower. Boosts alertness 20-40 points.
- **PodcastMiddleware**: Walk phase. Reduces perceived duration ~30%.
- **WeatherMiddleware**: Pre-Walk. Drives strategy selection.

### State Schema

The pipeline maintains `CommuteState`:

- `energy` (0-100): Depletes per phase. Coffee partially restores.
- `alertness` (0-100): Critical for Walk and Sit phases.
- `hydration` (0-100): Must be >20 before Shower exit.
- `keysWalletPhone` (boolean): Gate check for Walk entry.
- Timestamps for each phase transition.

## Diagnostics

When debugging a commute failure:

1. Identify the failed phase
2. Check the phase's state machine: was it Pending, InProgress, Failed, or Abandoned?
3. If Failed with retries remaining, check retry policy configuration
4. If Abandoned (retries exhausted), recommend pipeline restart for next business day
5. Check middleware injection — did Coffee execute? Was Weather provider responsive?

## Standup Preparation

Before standup, run a commute summary:

- Total pipeline duration (alarm → desk)
- Number of snooze retries
- Walk strategy used
- Current alertness level
- Any phase failures or degraded modes (remote-shim counts as degraded)
