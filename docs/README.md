# PCS Web UI — Developer Documentation

This documentation helps contributors (human and AI) understand the project
structure, design intent, and implementation choices.

## Where to start

1. Root [README.md](../README.md) — what PCS Web UI is, how to build and install
2. [CONTRIBUTING.md](CONTRIBUTING.md) — workspace setup, dev server,
   contribution policies
3. [architecture.md](architecture.md) — project structure, application
   architecture overview, deployment modes
   - [architecture_backend.md](architecture_backend.md) — API communication
     layer (endpoints, call functions, response validation)
   - [architecture_store.md](architecture_store.md) — Redux state management
     (actions, sagas, reducers, selectors)
   - [architecture_view.md](architecture_view.md) — React components
     (structural vs. shared, tasks, data-test system)
   - [architecture_dev.md](architecture_dev.md) — development server
     (scenarios, response builders, shortcuts)
4. [testing.md](testing.md) — running tests, configuration, test
   infrastructure, locators and assertions

## Documentation philosophy

This documentation aims for mental alignment and practical orientation. It
explains intent, structure, and context — things that are hard to see from code
alone. It does not try to duplicate what the code already says. The goal is not
to eliminate the need to read code, but to point toward the right code and
provide the context in which it becomes easy to understand.

When writing new documentation, follow the same principle: focus on the "why" and
the big picture, not on restating implementation details.
