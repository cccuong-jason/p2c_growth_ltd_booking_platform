# VMS TypeScript — Frontend Conventions

## 1. Stack

- React 18+
- Tailwind CSS
- shadcn/ui
- Lucide React (Icons)

## 2. UI Components

**Mandate:** Only use `shadcn/ui` wrappers from `@/components/ui/`. Do not use raw HTML elements for inputs, buttons, or dialogs.

## 3. Styling

**Mandate:** Use semantic Tailwind tokens (e.g., `text-primary`, `bg-background`). **NEVER hardcode Hex or HSL values inline.**

## 4. Dark Mode

**Mandate:** Dark mode is the primary experience. ALWAYS verify component appearance in dark mode first.
