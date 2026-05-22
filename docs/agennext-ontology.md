# AGenNext Ontology

The AGenNext ontology is the shared language of the platform.

It defines how agents, tools, data, actions, UI surfaces, events, workflows, policies, and outputs are described across the system.

## Core idea

Anyone should be able to create an agent by defining its ontology-backed contracts:

1. what the agent is
2. what the agent can do
3. what inputs it accepts
4. what outputs it produces
5. what tools it can call
6. what actions it can request
7. what UI it can render
8. what events it emits
9. what policies constrain it
10. what memory/context it uses

## Schema is the machine-readable layer

Schemas are how the ontology becomes executable.

```text
Ontology = meaning + relationships + platform concepts
Schema   = machine-readable contract for those concepts
Renderer = turns schema/messages into UI
Runtime  = executes schema-defined actions and tools
```

## Platform language

The ontology should allow every part of AGenNext to communicate without tight coupling:

```text
Agent → emits event schema
Runtime → executes action schema
Backend → streams message schema
Frontend → renders UI schema
Human → approves action schema
Audit → stores trace schema
```

## UI ontology

For UI Tool Kit, the ontology includes:

- Surface
- Component
- DataModel
- Action
- Event
- ToolCall
- Approval
- Timeline
- Diff
- Prompt
- AgentPlan
- HumanReview

## Coding-agent ontology

For coding agents, the ontology should include:

- Repository
- Branch
- File
- Patch
- Diff
- TestRun
- CommandRun
- PullRequest
- ReviewComment
- AgentStep
- ToolCall
- ApprovalRequest
- ExecutionTrace

## Design rule

Do not hardcode product-specific UI flows first.

Define the ontology first, then:

1. express it as JSON Schema
2. render it in React
3. render it in Flutter later
4. stream it from the backend/runtime
5. store it as auditable traces

## A2UI relationship

A2UI provides a useful pattern:

- catalog schema
- component definitions
- create surface messages
- update component messages
- update data model messages

AGenNext should extend this pattern with an ontology for agentic systems and coding agents.
