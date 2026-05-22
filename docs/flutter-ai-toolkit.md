# Flutter AI Toolkit Direction

Reference: https://pub.dev/packages/flutter_ai_toolkit

## Purpose

AGenNext UI Tool Kit should support reusable AI-native UI patterns across web and mobile.

Flutter AI Toolkit is relevant for Flutter/mobile clients where we need:

- AI chat surfaces
- copilot-style mobile UX
- prompt/action panels
- agent status cards
- human-in-the-loop review screens
- mobile execution timelines
- mobile workflow assistants

## Relationship to other UI directions

- **A2UI**: action-oriented agent interface patterns
- **CopilotKit**: React/web copilot surfaces
- **Flutter AI Toolkit**: Flutter/mobile AI interaction surfaces

## Proposed structure

```text
packages/
  react/
    src/
      components/
      tokens/
      copilot/
      actions/
  flutter/
    lib/
      src/
        tokens/
        widgets/
        chat/
        actions/
        agent_status/
```

## Flutter package goals

- `AgentChatShell`
- `AgentActionCard`
- `AgentStatusBadge`
- `ExecutionTimeline`
- `HumanReviewPanel`
- `ToolCallCard`
- `TrustScoreIndicator`
- `CopilotPromptBar`

## First milestone

Create a Flutter package under `packages/flutter` that wraps core AGenNext UI concepts and can optionally integrate `flutter_ai_toolkit` for LLM chat experiences.
