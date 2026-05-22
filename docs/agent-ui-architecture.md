# Agent UI Architecture Inputs

This toolkit is designed to support multiple emerging patterns for AI-native interfaces.

## Genkit Dotprompt

Reference: https://genkit.dev/docs/js/dotprompt/

Dotprompt is useful for keeping prompts and AI interaction contracts outside raw application code.

Potential role in this toolkit:

- prompt-backed UI actions
- reusable prompt templates
- schema-driven agent forms
- prompt versioning for UI flows
- design-time prompt assets for product teams

## AG-UI and Microsoft Agent Framework

Reference: https://techcommunity.microsoft.com/blog/azuredevcommunityblog/building-interactive-agent-uis-with-ag-ui-and-microsoft-agent-framework/4488249

AG-UI-style patterns are useful for interactive, event-driven agent interfaces.

Potential role in this toolkit:

- agent event streams
- tool-call cards
- human approval components
- progress timelines
- streaming output surfaces
- resumable workflow panels
- action-result displays

## Relationship to existing directions

- **A2UI**: action-oriented agent UI concepts
- **CopilotKit**: React copilot/chat integration direction
- **Flutter AI Toolkit**: mobile/cross-platform AI UI direction
- **Dotprompt**: reusable prompt/action contract layer
- **AG-UI**: event-driven agent UI protocol layer

## Toolkit principle

The UI toolkit should separate:

1. visual components
2. agent/action event models
3. prompt contracts
4. runtime adapters
5. web/mobile renderers

This lets AGenNext reuse the same interaction patterns across dashboards, mobile apps, copilots, workflows, and agent operations consoles.
