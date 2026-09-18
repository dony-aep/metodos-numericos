# AGENTS.md

Shared instructions for every coding agent working in this repo. `CLAUDE.md` imports this
file, so edit here and never copy content into `CLAUDE.md`.

## Project

An educational web platform for numerical methods. Each method page has theory, formulas, a
calculator and charts. React + Vite + TypeScript, Tailwind CSS 4, shadcn/ui on
`@base-ui/react`, ECharts, mathjs and KaTeX. `package.json` is the source of truth for
versions; don't repeat them in docs, they go stale on every update.

**Language.** UI text, content, commit messages and the CHANGELOG are in Spanish, with correct
accents. Code identifiers are in English.

## Commands

```bash
npm run dev       # Vite dev server
npm run lint      # ESLint, must print nothing
npm run build     # tsc -b && vite build
npm run preview   # serve the production build
```

There are no tests and no test runner. Don't run `npm test` or install Vitest/Jest unless
asked. A task is done when `npm run lint` and `npm run build` both pass. For UI changes,
also check the page in light and dark mode.

## Environment

Development happens on Windows with PowerShell as the default shell. Use `/` in import paths
and PowerShell syntax in terminal commands.

## Adding a numerical method

Each method is split into five layers. Keep calculation logic out of pages and components.

| Layer | Location | Contents |
| --- | --- | --- |
| Algorithm | `src/utils/<method>.ts` | Pure functions, no React |
| Types | `src/types/<method>.ts` | Inputs, results, iteration rows |
| State | `src/hooks/use<Method>.ts` | Validation, execution, UI state |
| Views | `src/components/topics/<topic>/` | Form, table, charts |
| Page | `src/pages/<Method>Page.tsx` | Composition and theory |

Shared pieces live in `src/components/shared/` (layout, math rendering, result banner). Reuse
them before writing new ones.

Then wire the method up in two places, or it won't show:

1. `src/data/methods.ts`: register the `slug` with `status: 'available'`. This list feeds the
   dashboard and the "coming soon" screen. A missing slug renders "Método no encontrado".
2. `src/App.tsx`: import the page with `lazy()` and add its `<Route>` wrapped in
   `<Suspense fallback={<PageFallback />}>`, like the others.

**IMPORTANT:** in `App.tsx`, concrete routes go **before** `metodos/:slug`. That route is the
catch-all that renders `MethodPage`, so any route declared after it is never reached.

A method counts as finished when it has visible theory and formulas, an input form with
validation, a working calculation, a results table or chart, and a dashboard entry.

## UI conventions

- Build pages from `@/components/ui/*` (Card, Button, Badge, Tabs, Table, Input...). Don't
  hand-roll a button, card or table out of `div`s when shadcn has one.
- If a component is missing, add it with `npx shadcn@latest add <component>` before writing a
  custom one.
- Tailwind classes are for layout, spacing and composition. Behavior comes from the shadcn
  components.
- Use the `@/*` alias for internal imports and `cn` for conditional classes.
- No `any`. Strict typing throughout.

## Gotchas

- **react-router is v8, where `react-router-dom` no longer exists.** Always import from
  `react-router` (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`,
  `Navigate`, `useParams`). Only DOM APIs like `RouterProvider` come from
  `react-router/dom`, and none are used today.
- The secant method charts (`src/components/topics/secante/ConvergencePlot.tsx` and
  `FunctionPlot.tsx`) hardcode `'Google Sans'` in their ECharts options. Changing the font in
  `src/index.css` doesn't update them.
- `MethodPage` is a placeholder for slugs that are registered but not implemented. Never put
  a new method's logic there.

## Dependencies

- `npm audit` is at zero. Read what `npm audit fix --force` proposes before running it: it
  downgrades packages and can bring back vulnerabilities that were already fixed.
- **With npm 12 or later, `npm install` fails here with `EALLOWREMOTE`.** The defaults
  `allow-remote=none` and `allow-git=none` block the tarball of
  `@tailwindcss/oxide-wasm32-wasi`, which ships `bundleDependencies`. It's an optional wasm32
  dependency that isn't even installed on Windows x64, but it still aborts the command, and
  upgrading Tailwind doesn't fix it (4.3.3 still fails). Pass `--allow-remote=all` to the
  commands that rebuild the tree: `npm install`, `npm update` and `npm audit fix`. `npm ci`,
  `npm run build` and the deploy are unaffected.
- Don't create a `.npmrc` with `allow-remote=all`. It would turn the protection off for good,
  CI included, to save one flag on three occasional commands.

## Commits

Conventional Commits in Spanish: `type: descripción breve`. If a draft message is in another
language, rewrite it in Spanish. Types used here: `feat`, `fix`, `refactor`, `style`, `docs`,
`chore`.

```
feat: agregar página del método de Jacobi
fix: corregir cálculo en eliminación de Gauss
```

The default branch is `main`.

## Skills live in two mirrored directories

Each tool reads its own path. Claude Code reads `.claude/skills/` and the other agents read
`.agents/skills/`.

**IMPORTANT:** when you create, edit or delete a skill, apply the same change to both paths in
the same commit. If only one changes, agents start behaving differently depending on which
tool ran them, and nothing reports an error. Before committing, this must print nothing:

```bash
diff -r .agents/skills .claude/skills
```
