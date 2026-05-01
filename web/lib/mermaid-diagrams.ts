/** Mermaid sources mirrored from README.md Architecture section */

export const corePipeline = `flowchart LR
    subgraph alarmLoop [Alarm Retry Loop]
        A[Alarm Fires] -->|"attempt N"| B{Snooze?}
        B -->|Yes| C[Wait backoff_ms]
        C --> A
        B -->|No| D[Wake Phase Complete]
    end

    D --> E[Shower]
    E -->|"coffee.inject()"| F[Coffee Middleware]
    F --> G{Weather Check}
    G -->|Clear| H[Walk: Default Strategy]
    G -->|Rain| I[Walk: Umbrella Strategy]
    G -->|Extreme| J[Walk: Rideshare Fallback]
    H --> K[Sit]
    I --> K
    J --> K
    K --> L((Desk Achieved))`;

export const phaseStateMachine = `stateDiagram-v2
    [*] --> Pending
    Pending --> InProgress: trigger()
    InProgress --> Completed: success()
    InProgress --> Failed: error()
    Failed --> Retrying: retryPolicy.shouldRetry()
    Retrying --> InProgress: retry()
    Failed --> Abandoned: retryPolicy.exhausted()
    Completed --> [*]
    Abandoned --> [*]`;

export const proFullDuplex = `stateDiagram-v2
    state MorningPipeline {
        [*] --> Wake
        Wake --> Shower
        Shower --> MorningWalk
        MorningWalk --> Sit
    }

    state Workday {
        Sit --> Working
        Working --> Working: loop(tasks)
    }

    state EveningPipeline {
        EveningWalk --> Decompress
        Decompress --> Sleep
        Sleep --> [*]
    }

    MorningPipeline --> Workday
    Workday --> EveningPipeline: endOfDay()

    note right of MorningPipeline
        Energy: Depleting
        Hydration: Requires middleware
    end note

    note right of EveningPipeline
        Energy: Critical
        Motivation: Deprecated
    end note`;

export const integrationArchitecture = `flowchart TB
    subgraph ai [AI Integrations]
        CU[Cursor Skill + Rule]
        CL[Claude Code CLAUDE.md]
        CO[Codex Skill + Agent]
    end

    subgraph runtime [WSWS Runtime]
        SC[Scheduler] --> PM[Phase Manager]
        PM --> W1[Wake]
        PM --> S1[Shower]
        PM --> W2[Walk]
        PM --> S2[Sit]
        MW[Middleware Bus] -.->|inject| PM
    end

    subgraph obs [Observability]
        AL[Alertness Metrics]
        HY[Hydration Telemetry]
        CD[Commute Duration Traces]
    end

    CU -->|"phase.plan()"| runtime
    CL -->|"context.provide()"| runtime
    CO -->|"agent.orchestrate()"| runtime
    runtime --> obs`;
