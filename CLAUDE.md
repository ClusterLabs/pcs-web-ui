# CLAUDE.md

## Before you start

Before working on a task, read the relevant parts of `docs/` to understand the
project structure, conventions, and design intent. Start from
[docs/README.md](docs/README.md) and follow links as needed.

You don't need to read everything every time — pick what relates to your current
task. The documentation provides orientation and context; it does not replace
exploring the actual code.

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

## Key architectural rules

- **Data-test system.** Follow the rules in `docs/architecture.md` (sections
  "Two kinds of components" and "Data-test system") when working with `data-test`
  marks.

- **PatternFly version.** The project uses PatternFly 5. When choosing
  components, consult the PatternFly 5 documentation and design guidelines.

## Documentation style

- Do not use `---` (horizontal rules) before headings. The heading itself
  provides sufficient visual separation.
