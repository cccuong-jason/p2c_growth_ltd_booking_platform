# VMS Python — Backend Conventions

## 1. Fast Configuration

**Rule:** Use a dedicated config module with a `get_required_env` function that raises an exception if a required environment variable is missing on startup.

## 2. Type Hinting

**Rule:** Mandatory type hints (PEP 484) for all function signatures and class members. Use `mypy` for static verification.

## 3. Pydantic Models

**Rule:** Use Pydantic for data validation, DTOs, and configuration parsing. It ensures data integrity at trust boundaries.

## 4. Structured Logging

**Rule:** Log messages should be objects or include structured metadata. Never use `print()` for production logs.
