# CLAUDE.md

## Before you start

**You MUST read the relevant parts of `docs/` before starting any task.** Start
from [docs/README.md](docs/README.md) and follow links as needed. Do this before
exploring the codebase — the documentation contains rules and constraints that
are not visible from code alone and cannot be reliably inferred by reading
source files.

You don't need to read everything every time — pick what relates to your current
task. For example: writing tests → read `docs/testing.md`; adding files → read
`docs/CONTRIBUTING.md`; working with components or data-test marks → read
`docs/architecture.md`.

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

- **Data-test system.** Follow the rules in `docs/architecture.md` (sections
  "Two kinds of components" and "Data-test system") when working with `data-test`
  marks.

- **PatternFly version.** The project uses PatternFly 5. When choosing
  components, consult the PatternFly 5 documentation and design guidelines.

## Documentation style

- Do not use `---` (horizontal rules) before headings. The heading itself
  provides sufficient visual separation.
