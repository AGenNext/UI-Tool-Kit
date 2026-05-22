# Coding Agent Stack

AGenNext UI Tool Kit supports the frontend/UI layer for coding-agent products.

The backend/runtime already exists outside this UI toolkit boundary and should own repository access, code execution, sandboxing, file mutations, tests, commits, and pull requests.

## Recommended architecture

```text
User
  → UI Tool Kit components
  → Coding Agent frontend shell
  → Backend/runtime API
  → GitHub + sandbox + execution tools
```

## Backend responsibilities

The backend should own:

- repo loading
- branch creation
- file reads/writes
- patch generation/application
- command execution
- test/lint/build runs
- GitHub commits
- pull request creation
- secrets and credentials
- sandbox/container security
- long-running agent state

## UI toolkit responsibilities

This repository should own reusable frontend components for coding agents:

- repo picker
- branch selector
- task intake form
- plan panel
- file tree
- diff viewer
- patch status card
- command/run timeline
- tool-call cards
- approval modal
- test result panel
- PR summary card
- review comments panel
- error recovery panel
- agent memory/context panel

## UI protocol/event model

The backend can stream events to the UI in an AG-UI-style model:

```ts
type CodingAgentEvent =
  | { type: 'task.created'; taskId: string; title: string }
  | { type: 'repo.loaded'; repo: string; branch: string }
  | { type: 'plan.created'; steps: string[] }
  | { type: 'file.read'; path: string }
  | { type: 'patch.proposed'; path: string; diff: string }
  | { type: 'approval.requested'; reason: string }
  | { type: 'command.started'; command: string }
  | { type: 'command.completed'; command: string; exitCode: number }
  | { type: 'test.failed'; name: string; message: string }
  | { type: 'pr.created'; url: string };
```

## Stack mapping

- **Backend/runtime**: coding agent brain and execution layer
- **UI-Tool-Kit**: reusable agent/coding UI components
- **A2UI**: action-oriented UI patterns
- **AG-UI**: event-driven streaming agent UI protocol
- **CopilotKit**: embedded React copilot/chat direction
- **Dotprompt**: reusable prompt/action contracts
- **Flutter AI Toolkit**: later mobile AI UI direction

## First build target

Build a reusable coding-agent web shell:

1. task intake
2. plan display
3. event timeline
4. diff viewer
5. approval modal
6. run/test status
7. PR summary

The shell should work with mock events first, then connect to the existing backend/runtime API.
