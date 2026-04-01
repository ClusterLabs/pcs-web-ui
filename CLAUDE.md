# CLAUDE.md

## Before you start

**CRITICAL — read documentation before exploring code.** Before you plan or
begin any codebase exploration (grepping, globbing, reading source files), you
MUST first read the potentially relevant parts of `docs/`. Start from
[docs/README.md](docs/README.md) and follow links as needed.

This is not optional and not a suggestion — it is the single highest-priority
rule in this file. The reason:

1. The documentation is deliberately concise and maintained — reading it costs
   very little context compared to exploring code.
2. It contains architectural constraints, conventions, and design intent that
   are **not visible from code alone** and cannot be reliably inferred by
   reading source files (e.g. which patterns are preferred vs. legacy, rules
   for the data-test system, component classification).
3. It makes subsequent code exploration significantly more efficient — you will
   know where to look, what patterns to expect, and what to ignore.
4. Skipping documentation leads to wasted effort: exploring code without
   context produces wrong assumptions, which lead to incorrect suggestions
   that then need to be corrected.

You don't need to read everything every time — pick what relates to your current
task. For example: writing tests → read `docs/testing.md`; adding files → read
`docs/CONTRIBUTING.md`; working with actions, sagas, or reducers → read
`docs/architecture_store.md`; working with backend calls → read
`docs/architecture_backend.md`; working with components or data-test marks →
read `docs/architecture_view.md`; working with dev server or mock endpoints →
read `docs/architecture_dev.md`.

## Code maturity

The codebase has evolved over years. Some existing code uses patterns that are
functional but no longer considered desirable. Do not assume all existing code
represents the preferred style.

When looking for implementation guidance:
- Prefer patterns described in `docs/architecture.md` over patterns found in
  arbitrary code.
- When in doubt, look at the most recently written code for style reference.
- If you spot a conflict between documentation and code, follow the
  documentation and flag the discrepancy.

## Verifying code

Use `npx biome lint --error-on-warnings ./` and `npx biome format ./` to check
code quality. There is no separate TypeScript type-checking step — type errors
surface during `make build` or `make test`. See
[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

## Key architectural rules

- **Data-test system.** Follow the rules in `docs/architecture_view.md`
  (sections "Two kinds of components" and "Data-test system") when working with
  `data-test` marks.

- **PatternFly version.** The project uses PatternFly 5. When choosing
  components, consult the PatternFly 5 documentation and design guidelines.

## Documentation style

- Do not use `---` (horizontal rules) before headings. The heading itself
  provides sufficient visual separation.
