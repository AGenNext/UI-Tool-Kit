# AI SDK UI Direction

Reference: https://ai-sdk.dev/docs/ai-sdk-ui

AI SDK UI is relevant for building streaming AI interfaces in React and other frontend frameworks.

## Role in AGenNext UI Tool Kit

Use AI SDK UI patterns for:

- streaming chat surfaces
- assistant/copilot panels
- tool-call display
- generative UI flows
- user approval loops
- coding-agent progress updates
- structured AI responses rendered as UI components

## Relationship to existing directions

- **A2UI**: schema/message-driven UI catalog and surfaces
- **AG-UI**: event-driven agent UI streams
- **CopilotKit**: embedded copilot experiences
- **AI SDK UI**: frontend hooks and streaming assistant UI patterns
- **Flutter AI Toolkit**: mobile AI UI direction

## Toolkit adapter goal

The toolkit should expose components that can work with AI SDK UI style state:

- messages
- streaming status
- tool calls
- actions
- errors
- attachments
- generated components

## First components

- `AIChatPanel`
- `AIMessageList`
- `AIMessageBubble`
- `AIToolCallCard`
- `AIActionSuggestion`
- `AIStreamingStatus`

## Coding-agent fit

For a coding agent, AI SDK UI can power:

1. task intake chat
2. streaming plan generation
3. tool-call timeline
4. patch explanation
5. approval request UI
6. PR summary generation

The backend/runtime remains responsible for actual file edits, command execution, sandboxing, commits, and pull requests.
