# Dependencies

## Strategy

Every npm dependency is a tradeoff. Each package adds maintenance burden, widens
the attack surface for CVEs, and increases the risk of supply-chain issues.
The project follows a strategy of **dependency minimization**: prefer local
solutions when the scope is small enough — a short utility function is often
better than pulling in a new package. When a dependency is genuinely needed, the
choice should be conscious and justified.

## Current application dependencies

The following table lists all packages from the `dependencies` field in
`packages/app/package.json`. This includes both runtime libraries shipped to the
browser and compile-time tools (TypeScript, type definitions) that are required
for building but do not appear in the production bundle.

| Package | Role |
|---|---|
| `@patternfly/*` | Red Hat design system — UI components and styles |
| `react`, `react-dom` | UI framework |
| `react-redux`, `redux` | Global state management |
| `redux-saga` | Side effect orchestration (API calls, async flows) |
| `fp-ts` | Functional programming primitives (pipelines, Option, Either) |
| `io-ts` | Runtime validation of backend responses |
| `typescript` | Type system (compile-time only, not shipped to browser) |
| `@types/react`, `@types/react-dom`, `@types/react-redux` | Type definitions (compile-time only) |

The only dev dependency in the app package is **esbuild** (bundler).

Development and testing tooling (Playwright, Jest, Biome, express) lives in
separate packages (`packages/test`, `packages/dev`) and is not part of the
distributed application.

## Dependency reduction milestones

**0.1.18 — Split into `packages/` (app, test, dev)**
Separated runtime dependencies from dev/test tooling. Only `packages/app`
dependencies ship in production.

**0.1.23 — Replaced webpack (via ejected Create React App) with esbuild**
Removed webpack and its transitive dependency tree from the app package —
esbuild has near-zero transitive dependencies.

**0.1.23 — Replaced ESLint + Prettier with Biome**
Consolidated two tools (and their plugin ecosystems) into one with no
transitive dependencies. Biome is a dev-only tool in the root workspace.

## Package-lock file locations

Before 0.1.18, a single root `package-lock.json` covered all dependencies.

Since 0.1.18, lock files are split per package:

- **Runtime:** `packages/app/package-lock.json`
- **Dev/test:** `packages/test/package-lock.json`,
  `packages/dev/package-lock.json`, root `package-lock.json`

When investigating CVEs, only `packages/app/package-lock.json` is relevant for
production impact (post-0.1.18). The root and other package lock files contain
development and testing dependencies that are not shipped.
