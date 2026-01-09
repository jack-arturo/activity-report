# Codex Agent Instructions (activity-report)

These instructions apply to the entire repository.

## Autonomous Testing and Iteration Protocol (MANDATORY)

After ANY code change:
1. Immediately run tests (`npm test`, `pytest`, or appropriate command)
2. If tests FAIL:
   - Analyze the failure output
   - Identify the root cause
   - Fix the code
   - Run tests again
3. REPEAT steps 1-3 up to 5 times maximum
4. Only declare success AFTER tests pass
5. If still failing after 5 attempts, summarize what you tried and ask for help

## API/Endpoint Verification (MANDATORY)

When modifying API endpoints:
1. Use `curl` to test the endpoint after changes
2. If curl fails, fix and retry up to 3 times
3. Show the actual curl output in your response

## Prohibited Behaviors

- Do NOT declare victory without running verification
- Do NOT say "you should run tests" — run them
- Do NOT explain what tests would do — execute them
- Do NOT stop at "this should work" — prove it works

## AutoMem Persistent Memory (Codex + MCP)

If present locally, `.cursor/rules/automem.mdc` may contain similar guidance. The section below incorporates that rule, adapted to Codex MCP tool names.

### 3-phase memory pattern

#### 1) Conversation start: recall when it matters

Recall relevant context for:
- Project context (docs, tooling, deployment)
- Architecture discussions/decisions
- User preferences and choices
- Feature planning or strategy
- Debugging issues (search similar past problems)
- Performance optimization discussions
- Integration/API work (check past implementations)
- Refactors (understand why current structure exists)

Skip memory for:
- Pure syntax/language questions
- Trivial edits (typos/formatting/simple renames)
- Direct factual queries answerable by reading current files

Codex tool: `mcp__memory__recall_memory`

#### 2) During work: store only high-signal items

Store memories for:
- **Decisions** (importance ~0.9): architecture/library/approach choices
- **Insights** (importance ~0.8): root causes, key learnings, bug resolutions
- **Patterns** (importance ~0.7): reusable approaches/best practices
- **Preferences** (importance ~0.6–0.8): tools/config/style preferences
- **Context** (importance ~0.5–0.7): notable features/refactors/config changes

Avoid storing:
- Trivial changes (“fixed typo”)
- Secrets (API keys, passwords, tokens)
- Wall-of-text: split into atomic memories + associations

Codex tools: `mcp__memory__store_memory`, `mcp__memory__associate_memories`, `mcp__memory__update_memory`

#### 3) Conversation end: summarize significant work

If multiple files changed, a feature shipped, a refactor landed, or a key decision was made, store a short summary memory.

### Tagging convention

Always include:
1. `activity-report` (project)
2. `cursor` (platform tag from the original rule; keep for consistency)
3. Current month `YYYY-MM`
4. A component tag (e.g., `report`, `deploy`, `wrangler`, `ui`, `data`)

### Content guidelines

- Target: 150–300 characters
- Max: 500 characters (will be summarized)
- Hard limit: 2000 characters (rejected)
- Format: `Brief title. Context and details. Impact/outcome.`

### Memory associations

Link related memories for richer context using `mcp__memory__associate_memories` with types like:
`RELATES_TO`, `LEADS_TO`, `OCCURRED_BEFORE`, `EVOLVED_INTO`, `INVALIDATED_BY`, `EXEMPLIFIES`, `REINFORCES`.

### Error handling

- If recall fails/empty: continue without historical context (don’t announce the failure)
- If store fails: complete the task normally (memory is an enhancement)
- If memory service is unavailable: focus on solving the immediate problem
