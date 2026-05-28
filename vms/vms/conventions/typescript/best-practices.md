# VMS TypeScript — Best Practices

## 1. Immutability

**Rule:** Use `readonly` for props and state interfaces. Avoid mutating arrays/objects directly; use the spread operator (`...`) or functional updates.

## 2. Type Guards

**Rule:** Avoid `any`. When dealing with external API responses, type as `unknown` and use type guard functions to validate the shape before consumption.

## 3. Hooks Composition

**Rule:** Extract complex business logic or data fetching into custom hooks (e.g., `useUserInventory`) to keep components presentational and easy to test.

## 4. Async/Await

**Rule:** Prefer `async/await` syntax over `.then()/.catch()` chains for better readability and consistent error handling with `try/catch`.
