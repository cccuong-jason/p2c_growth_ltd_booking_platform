# VMS Python — Testing Conventions

## 1. Framework

- pytest (Mandatory)

## 2. High-Signal Assertions

**Rule:** Leverage `pytest`'s native `assert` with helpful diffs. Avoid old `unittest` style assertions.

## 3. Mocking

**Rule:** Use `pytest-mock` (`mocker` fixture) for isolating external dependencies. Prefer patching at the entry point of consumption.

## 4. Coverage

**Rule:** Aim for 80%+ coverage on critical business logic. Use `pytest-cov` to track progress.
