---
name: skill-ui-design
scope: frontend
description: >
  Use when creating new UI components or pages, modifying visual appearance,
  implementing loading/empty/error states, or displaying severity indicators.
  Enforces the VMS MetaDefender Tri design system: Tailwind CSS tokens,
  shadcn/ui components, dark-first, lucide-react icons, severity color system.
  FRONTEND ONLY — do not invoke for Go backend or API work.
---

# Skill — UI Design System

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-ui-design.md` |
| Cursor | `.cursor/rules/skill-ui-design.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## Scope

> **Frontend only.** Do not invoke for Go service work, API handlers, DB migrations,
> Kafka consumers, or any backend code. Invoke this skill exclusively in the
> `vms-community-fe` repository or any React/TypeScript service.

## Requires (for full compliance)

- **Figma MCP** — read design specs before writing any component (`mcp/figma.md`)
- **Chrome MCP** — visual dark-mode check after implementation (`mcp/chrome.md`)

## When to use

- Creating a new React component or page
- Modifying an existing component's visual appearance or layout
- Adding colors, typography, spacing, shadows, or animations
- Building form fields, tables, dialogs, or interactive elements
- Implementing loading states, empty states, or error states
- Adding icons or displaying CVE severity indicators

---

## Instructions

### Step 1 — Read the Figma spec (requires Figma MCP)

Before writing a single line of UI code, inspect the Figma frame for the component:

```
[Figma MCP] Get node details for <frame-url>
Extract: dimensions, color tokens, typography, spacing, border-radius
```

Map every Figma color to the nearest VMS CSS token from `src/index.css`.
**Never hardcode HSL values** — always use a token.

### Step 2 — Pre-code checklist

| Check | Rule |
|-------|------|
| Token | Using semantic tokens (`bg-card`, `text-foreground`)? No raw hex/RGB? |
| Import | Importing from `@/components/ui/`? Not raw Radix or HTML elements? |
| Dark mode | Does this render correctly in dark mode (the **primary** theme)? |
| Spacing | `p-6 space-y-6` page padding, `gap-6` grid gaps? |
| Icons | Only `lucide-react`? Standard sizes: `h-4 w-4` inline, `h-12 w-12` empty state? |
| a11y | Icon-only buttons have `aria-label`? Inputs have associated `<label>`? |

### Step 3 — Component selection guide

| Need | Use |
|------|-----|
| Primary action | `<Button variant="default">` |
| Destructive action | `<Button variant="destructive">` |
| Supporting action | `<Button variant="outline">` or `"secondary"` |
| Icon-only | `<Button variant="ghost" size="icon" aria-label="…">` |
| Content container | `<Card variant="default">` |
| Clickable card | `<Card variant="interactive" onClick={…}>` |
| Text input | `<Input variant="default">` |
| Search field | `<Input variant="filled">` |
| Status label | `<Badge>` |
| CVE severity | `SeverityBadge` using severity color system (see §Severity) |
| Data table | `<Table>` wrapped in `rounded-lg border border-border overflow-hidden` |
| Loading placeholder | `<Skeleton>` |
| User feedback | `toast()` via `useToast()` |

**Never use raw HTML:** `<select>`, `<input>`, `<button>`. Use shadcn/ui wrappers only.

### Step 4 — Standard page pattern

```tsx
export default function PageName() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Page Title</h1>
          <p className="text-muted-foreground text-sm mt-1">Description</p>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />Create
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* StatCards */}
      </div>
      <Card>
        <CardHeader><CardTitle>Section</CardTitle></CardHeader>
        <CardContent className="p-0">{/* Table or list */}</CardContent>
      </Card>
    </div>
  );
}
```

### Step 5 — Loading / empty / error guard pattern

```tsx
{isLoading ? (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-16 w-full rounded-lg" />
    ))}
  </div>
) : items.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <DatabaseIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
    <h3 className="text-lg font-semibold font-display mb-2">No items</h3>
    <p className="text-sm text-muted-foreground max-w-[300px] mb-6">Helpful hint.</p>
    <Button variant="default" onClick={handleCreate}>
      <Plus className="h-4 w-4 mr-2" />Create First
    </Button>
  </div>
) : error ? (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Failed to load</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
) : (
  <Table>…</Table>
)}
```

### Step 6 — Severity color system

Use these exact classes for CVE/security severity — nowhere else:

| Level | CVSS | Classes |
|-------|------|---------|
| Critical | 9.0–10.0 | `bg-red-500/20 text-red-400 border-red-500/30` |
| High | 7.0–8.9 | `bg-orange-500/20 text-orange-400 border-orange-500/30` |
| Medium | 4.0–6.9 | `bg-amber-500/20 text-amber-400 border-amber-500/30` |
| Low | 0.1–3.9 | `bg-blue-500/20 text-blue-400 border-blue-500/30` |
| None | 0.0 | `bg-green-500/20 text-green-400 border-green-500/30` |

Use `font-mono font-bold` for numeric CVSS scores.

### Step 7 — Visual verification (requires Chrome MCP)

After implementation:

```
[Chrome MCP] Navigate to http://localhost:5173/<route>
[Chrome MCP] Screenshot in default (dark) mode
[Chrome MCP] Evaluate: document.documentElement.classList.remove('dark') → screenshot light mode
[Chrome MCP] Get accessibility tree — check aria-labels and focus rings
```

All three screenshots are evidence for `skill-verification`.

---

## §8 — Blue Line Design System (OPSWAT)

> **Offline reference — do not re-scan the Storybook.** This section is the authoritative
> guide for applying OPSWAT's Blue Line design system in any VMS frontend task. Update this
> section whenever new component APIs are verified or design tokens change.

### What is Blue Line?

Blue Line is OPSWAT's company-wide React component library (`@opswat/ui`). It defines the
visual language, interaction patterns, and brand tokens used across all OPSWAT products.

**VMS project context:** `vms-community-fe` uses **shadcn/ui directly** (the `@opswat/ui`
npm package is not installed). Blue Line intent is expressed via the VMS CSS token system
(`src/index.css`) and the component mapping table below. The design system still governs
spacing, typography, colour, and motion — just implemented natively.

- **Storybook**: `http://ds-react-storybook-opswat-ui.s3-website-us-west-2.amazonaws.com/`
- **Component index (JSON)**: `…/index.json` — full list of 60+ components
- **Categories**: Actions, Data Display, Feedback, Forms, Layout, Navigation, Overlays, Typography

### Accessing Blue Line Specs — Correct Workflow

The Storybook is hosted on a **static S3 site**. This has one important constraint:

> ⚠️ `@storybook/mcp` **cannot** be used. It requires a running dev server with `/storybook/mcp`
> endpoint and published `components.json`/`docs.json` manifests — none of which exist on the
> static S3 host.

**Use Chrome MCP (Playwright) instead:**

```
Navigate to:
http://ds-react-storybook-opswat-ui.s3-website-us-west-2.amazonaws.com/?path=/docs/components-<NAME>--docs

1. Take a screenshot to see the component visually
2. Read the ArgsTable for prop names, types, and defaults
3. Cross-reference with index.json for the full component list
```

Common component docs URLs:
```
?path=/docs/components-button--docs
?path=/docs/components-accordion--docs
?path=/docs/components-card--docs
?path=/docs/components-badge--docs
?path=/docs/components-input--docs
?path=/docs/components-table--docs
?path=/docs/components-dialog--docs
?path=/docs/components-sidebar--docs
```

Only scan the Storybook when you need a component not already listed in the API table below.
Cache any new findings back into this section before closing the session.

### Component API Reference

Use these confirmed mappings. For any component not listed, consult the Storybook via Chrome MCP.

| Blue Line Component | Blue Line props / variants | VMS shadcn/ui equivalent |
|---------------------|---------------------------|--------------------------|
| **Button** | `variant`: `primary`, `secondary`, `tertiary`, `danger`, `primary-gradient`; `icon (IconId)`, `iconAlignment (left\|right)`, `isProcessing`, `isLoading`, `isActive` | `<Button variant="default\|outline\|secondary\|destructive\|ghost">` |
| **Accordion** | `open (boolean)`, `onToggle (fn)`; Badge/Chip composable in header; Card as children | `<Accordion>` + `<AccordionItem>` + `<AccordionTrigger>` + `<AccordionContent>` |
| **Card** | Sub-types: `Card`, `ProcessingSummaryCard`, `TechnologySummaryCard` | `<Card>` + `<CardHeader>` + `<CardContent>` + `<CardFooter>` |
| **Badge** | Colour variants for status, severity, labels | `<Badge variant="default\|secondary\|destructive\|outline">` |
| **Chip** | Filter/tag pill with coloured border | Inline pill: `px-2 py-0.5 rounded-full border text-xs font-semibold` |
| **Input** | `variant`: `default`, `filled`; supports prefix/suffix icons | `<Input>` with className override for filled style |
| **Table** | Standard sortable data table | `<Table>` wrapped in `rounded-lg border border-border overflow-hidden` |
| **Dialog / Modal** | Controlled via `open`, `onClose` | `<Dialog>` + `<DialogContent>` + `<DialogHeader>` |
| **Toast** | `variant`: `success`, `error`, `warning`, `info`; position configurable | `toast()` via `useToast()` |
| **Skeleton** | Loading placeholder, shimmer animation | `<Skeleton className="h-N w-full rounded-lg">` |

### Color Token System

Blue Line's colour palette maps directly to the CSS custom properties in `src/index.css`.
**Always use CSS variables — never write raw HSL, hex, or RGB inline.**

| Role | CSS variable | Dark mode HSL value |
|------|-------------|---------------------|
| Page background | `--background` | `222 32% 9%` |
| Card / surface | `--card` | `222 30% 13%` |
| Primary Blue (brand) | `--primary` | `219 97% 55%` |
| Accent / hover | `--accent` | `219 85% 32%` |
| Primary foreground | `--primary-foreground` | `0 0% 100%` |
| Body text | `--foreground` | `220 15% 95%` |
| Muted / secondary text | `--muted-foreground` | `220 10% 65%` |
| Border / divider | `--border` | `222 18% 24%` |
| Input background | `--input` | `222 18% 20%` |
| Focus ring | `--ring` | `219 97% 55%` |
| Blue glow (marketing) | — | `0 0 48px hsl(219 97% 55% / 0.28)` |

**How to use:** reference via Tailwind's `hsl(var(--primary))` pattern or directly via
`bg-primary`, `text-muted-foreground`, `border-border`, etc.

For inline styles that need arbitrary values (e.g. `radial-gradient`), read the value from
`src/index.css` for the current theme and wrap in `hsl()`:
```tsx
style={{ background: "hsl(var(--background))" }}
// or for gradient with opacity:
style={{ background: "radial-gradient(hsl(var(--primary) / 0.12) 0%, transparent 70%)" }}
```

### Typography System

| Role | Typeface | Tailwind class |
|------|----------|----------------|
| Display / marketing headings | Sora | `font-['Sora'] font-bold` or `font-display` |
| Body / UI text | Inter | default (`font-sans`) or `font-['Inter']` |
| Code / numeric scores | JetBrains Mono | `font-mono` |

Both Sora and Inter are preloaded via Google Fonts in `src/index.css`.
Do not introduce additional font families without updating the design token system.

### Standalone (Full-Screen) Page Pattern

For pages that render without the sidebar shell (e.g. marketing landing pages, login,
onboarding flows), use a split-route architecture that keeps Layout off the route:

```tsx
// App.tsx
<Routes>
  {/* Standalone routes — no Layout shell */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  {/* App routes — wrapped in Layout (sidebar + topbar) */}
  <Route path="/*" element={<Layout><AppRoutes /></Layout>} />
</Routes>
```

Standalone page structure convention:
```
src/pages/<PageName>/
├── index.tsx              # Root component: assembles sections, sets bg, owns <main>
└── components/
    ├── <Page>Navbar.tsx   # Sticky, mobile-responsive, scroll-aware transparency
    ├── HeroSection.tsx    # Full-viewport hero: headline, CTAs, ambient gradient
    ├── <Feature>.tsx      # Domain-specific content sections
    └── <Page>Footer.tsx   # Links, copyright, social
```

Design rules for standalone pages:
- Background: always `hsl(var(--background))` — never white
- Navbar: `position: sticky; top: 0; z-index: 40` — transparent at top, `bg-card` on scroll
- Sections: `py-20 md:py-28` vertical rhythm; `max-w-7xl mx-auto px-6` horizontal bounds
- Headings: Sora, `text-5xl md:text-7xl font-bold`; gradient text via `bg-clip-text`

### Animation & Motion Guidelines

These rules apply to all VMS UI work, not only marketing pages:

| ✅ Approved | ❌ Prohibited |
|------------|--------------|
| CSS `@keyframes` + class toggle via `IntersectionObserver` | GSAP, Framer Motion, react-spring, Motion One |
| `requestAnimationFrame` for numerical count-up animations | particle.js, tsParticles, canvas-heavy libraries |
| CSS `transition-all duration-300` hover micro-interactions | `animate-bounce`, `animate-ping` (too playful for security UX) |
| `opacity + translateY` entrance animations (fade-in-up) | Rainbow or off-brand accent colours |
| CSS radial/linear gradients for ambient backgrounds | Lottie files unless specifically approved by design |

CSS scroll-reveal pattern (copy-paste starting point):
```tsx
// Hook
const ref = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);
useEffect(() => {
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
  if (ref.current) obs.observe(ref.current);
  return () => obs.disconnect();
}, []);

// JSX
<div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
  {children}
</div>
```

### Full Component Catalogue (60+, last verified 2026-04)

Browse any component at `?path=/docs/components-<kebab-name>--docs`. Only use Chrome MCP
if you need props not confirmed in the API table above.

```
Accordion  ActionMenu  Alert       Avatar     Badge      Banner
Breadcrumb Button      Card        Checkbox   Chip       CodeBlock
Combobox   DatePicker  Dialog      Divider    Drawer     EmptyState
FileUpload FormField   Icon        InfoBanner Input      Label
Link       Loader      Menu        Modal      Notification Pagination
Popover    ProductBanner Progress  Radio      ScrollArea Select
Sheet      Sidebar     Skeleton    Slider     Spinner    Switch
Table      Tabs        Tag         TextArea   TimePicker Toast
Toggle     Tooltip     Tree        Typography
```

---

## Hard rules

1. No hardcoded hex/RGB colors anywhere in component code
2. No raw Radix UI primitives — use `@/components/ui/` wrappers
3. No icon libraries other than `lucide-react`
4. No `animate-pulse` — use `<Skeleton>` (uses `animate-shimmer`)
5. No custom z-index except: `z-40` (header), `z-50` (sidebar/dialogs), `z-[100]` (toasts)
6. Dark mode is the **primary** experience — verify it first, always

## Related team docs

- Figma MCP: `mcp/figma.md`
- Chrome MCP: `mcp/chrome.md`
- Evidence gate: `skills/shared/skill-verification/SKILL.md`
- TDD for components: `skills/shared/skill-tdd/SKILL.md`
