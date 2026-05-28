# VMS TypeScript — Testing Conventions

## 1. Framework

- Vitest (preferred) or Jest
- React Testing Library (RTL)

## 2. Test Behavior, Not Implementation

**Mandate:** Focus tests on what the user experiences (e.g., "user clicks button", "text appears"). Avoid testing internal component state or private methods.

## 3. Mocks

**Rule:** Use `msw` (Mock Service Worker) for API mocking to simulate real network responses during tests.
