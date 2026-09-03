# Crygle Academy Migration — Phase 0: Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working Next.js + TypeScript app at `web/`, wired with the official Design System's tokens and five foundational components (`Button`, `Logo`, `SectionHeading`, `NavBar`, `Footer`), with every route from the migration spec present as a stub page — so `npm run dev` shows a fully-navigable, correctly-branded (fonts, colors) site with empty content, ready for Phase 1 to fill in.

**Architecture:** Next.js 14 App Router, TypeScript with `allowJs: true` (Design System components stay `.jsx`, consumed via their sibling `.d.ts`). Vitest + React Testing Library for component/route smoke tests (jsdom environment). No test framework existed before this plan — this phase establishes it.

**Tech Stack:** Next.js 14.2.x, React 18.3.x, TypeScript 5.6.x, Vitest 2.1.x, @testing-library/react 16.x, jsdom.

**Spec:** `PRD/Crygle-Academy-Migration-Spec.md` (§3 Lokasi &amp; Struktur, §4 Keputusan Teknis, §5 Fase 0)

## Global Constraints

- Token source of truth: `CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/tokens/*.css` — copy values verbatim, never hand-edit a number (spec §4).
- Design System components are copied as `.jsx` + `.d.ts`, **not** rewritten to `.tsx` (spec §4).
- Project root for all new work: `Crygle Acadey Website/web/` — never modify the 12 existing `.html` files or `styles/`/`scripts/` at the parent level (spec §3).
- Any component using React state or DOM event handlers (`onClick`, `onChange`, etc.) needs a `'use client'` directive as its first line — Next.js App Router server components cannot use either.
- Every task ends green: `npx tsc --noEmit` has zero errors and `npx vitest run` has zero failures before moving to the next task.

---

### Task 1: Project scaffold (Next.js + TypeScript + Vitest)

**Files:**
- Create: `web/package.json`
- Create: `web/tsconfig.json`
- Create: `web/next.config.mjs`
- Create: `web/next-env.d.ts`
- Create: `web/.gitignore`
- Create: `web/vitest.config.ts`
- Create: `web/vitest.setup.ts`
- Create: `web/src/sanity.test.ts`

**Interfaces:**
- Produces: a working `npm run dev`, `npm run build`, `npm run test` in `web/` that every later task relies on.

- [ ] **Step 1: Create `web/package.json`**

```json
{
  "name": "crygle-academy-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^25.0.0",
    "typescript": "^5.6.2",
    "vitest": "^2.1.1"
  }
}
```

- [ ] **Step 2: Create `web/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.jsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `web/next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Create `web/next-env.d.ts`**

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
```

- [ ] **Step 5: Create `web/.gitignore`**

```
node_modules
.next
out
.env*.local
*.tsbuildinfo
```

- [ ] **Step 6: Create `web/vitest.config.ts`**

`tsconfig.json` (Step 2) declares the `@/*` → `./src/*` path alias for Next.js's own bundler, but Vitest runs on Vite, which does not read `tsconfig.json` paths automatically — the alias must be repeated here or every `@/...` import in a test (Task 7 onward) fails to resolve.

```typescript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
```

- [ ] **Step 7: Create `web/vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 8: Write the failing sanity test**

```typescript
// web/src/sanity.test.ts
import { describe, expect, it } from 'vitest';

describe('test runner sanity check', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 9: Install dependencies**

Run (inside `web/`): `npm install`
Expected: installs without error, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 10: Run the sanity test to verify the runner works**

Run: `npx vitest run`
Expected: PASS — 1 test passed (`test runner sanity check > runs a basic assertion`).

- [ ] **Step 11: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 12: Commit**

```bash
git add web/package.json web/package-lock.json web/tsconfig.json web/next.config.mjs web/next-env.d.ts web/.gitignore web/vitest.config.ts web/vitest.setup.ts web/src/sanity.test.ts
git commit -m "chore: scaffold Next.js + TypeScript + Vitest for web migration"
```

---

### Task 2: Design tokens (`src/styles/tokens/*.css` + `app/globals.css`)

**Files:**
- Create: `web/src/styles/tokens/colors.css`
- Create: `web/src/styles/tokens/typography.css`
- Create: `web/src/styles/tokens/layout.css`
- Create: `web/src/styles/tokens/base.css`
- Create: `web/src/styles/tokens/fonts.css`
- Create: `web/app/globals.css`
- Test: `web/src/styles/tokens.test.ts`

**Interfaces:**
- Produces: every CSS custom property (`--blue-500`, `--radius-pill`, `--font-core`, etc.) used by every component task from here on.

- [ ] **Step 1: Write the failing test — assert the token files contain the values the components depend on**

```typescript
// web/src/styles/tokens.test.ts
// NOTE: readFileSync(new URL(...)) throws "The URL must be of scheme file" under
// this Vitest+Windows setup — import.meta.url isn't a plain file:// URL here.
// Convert through fileURLToPath first (same pattern as vitest.config.ts).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const colors = readFileSync(path.join(dirname, 'tokens/colors.css'), 'utf-8');
const typography = readFileSync(path.join(dirname, 'tokens/typography.css'), 'utf-8');
const layout = readFileSync(path.join(dirname, 'tokens/layout.css'), 'utf-8');

describe('design tokens', () => {
  it('defines the brand blue used by every filled CTA', () => {
    expect(colors).toContain('--blue-500:rgb(35,95,156)');
  });

  it('defines the strict-accent yellow', () => {
    expect(colors).toContain('--yellow-500:rgb(252,193,18)');
  });

  it('defines the core font stack starting with SF UI Text', () => {
    expect(typography).toContain('--font-core:"SF UI Text"');
  });

  it('defines the 50px marketing CTA pill radius', () => {
    expect(layout).toContain('--radius-pill:50px');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/styles/tokens.test.ts`
Expected: FAIL — `ENOENT: no such file or directory, open '.../tokens/colors.css'`.

- [ ] **Step 3: Copy the four token files verbatim from the Design System**

Run (from repo root, i.e. `Crygle Acadey Website/`):

```bash
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/tokens/colors.css" "web/src/styles/tokens/colors.css"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/tokens/typography.css" "web/src/styles/tokens/typography.css"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/tokens/layout.css" "web/src/styles/tokens/layout.css"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/tokens/base.css" "web/src/styles/tokens/base.css"
```

- [ ] **Step 4: Create `web/src/styles/tokens/fonts.css` — same `@font-face` rules, paths rewritten for Next.js `public/`**

```css
/* CRYGLE Academy — webfonts. SF UI Text is the product typeface (TTFs supplied by the brand). */
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Light.ttf") format("truetype");font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-LightItalic.ttf") format("truetype");font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Regular.ttf") format("truetype");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-RegularItalic.ttf") format("truetype");font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Medium.ttf") format("truetype");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-MediumItalic.ttf") format("truetype");font-weight:500;font-style:italic;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Semibold.ttf") format("truetype");font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-SemiboldItalic.ttf") format("truetype");font-weight:600;font-style:italic;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Bold.ttf") format("truetype");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-BoldItalic.ttf") format("truetype");font-weight:700;font-style:italic;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-Heavy.ttf") format("truetype");font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:"SF UI Text";src:url("/fonts/SFUIText-HeavyItalic.ttf") format("truetype");font-weight:800;font-style:italic;font-display:swap}
```

- [ ] **Step 5: Create `web/app/globals.css` importing all five token files**

```css
@import "../src/styles/tokens/fonts.css";
@import "../src/styles/tokens/colors.css";
@import "../src/styles/tokens/typography.css";
@import "../src/styles/tokens/layout.css";
@import "../src/styles/tokens/base.css";
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run src/styles/tokens.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 7: Commit**

```bash
git add web/src/styles/tokens web/app/globals.css
git commit -m "feat: add official Design System tokens (colors, typography, layout, base, fonts)"
```

---

### Task 3: Static assets — fonts and logo (`public/`)

**Files:**
- Create: `web/public/fonts/*.ttf` (12 files)
- Create: `web/public/logo/*.svg`, `*.png` (6 files)
- Test: `web/src/assets.test.ts`

**Interfaces:**
- Produces: `/fonts/*.ttf` and `/logo/*.svg|png` URLs that `fonts.css` (Task 2) and `Logo.jsx` (Task 5) both depend on.

- [ ] **Step 1: Write the failing test — assert every file `Logo` and `fonts.css` reference actually exists on disk**

```typescript
// web/src/assets.test.ts
// NOTE: same import.meta.url caveat as Task 2 — resolve through fileURLToPath, not `new URL(...)`.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(dirname, '../public');

const fontWeights = ['Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Heavy'];
const fontFiles = fontWeights.flatMap((w) => [`SFUIText-${w}.ttf`, `SFUIText-${w}Italic.ttf`]);

const logoFiles = [
  'book-mark-blue.svg',
  'book-mark-white.svg',
  'crygle-wordmark-blue.svg',
  'crygle-wordmark-white.svg',
  'crygle-lockup-blue.png',
  'crygle-lockup-white.png',
];

describe('static assets', () => {
  it.each(fontFiles)('font file %s exists in public/fonts', (file) => {
    expect(existsSync(path.join(publicDir, 'fonts', file))).toBe(true);
  });

  it.each(logoFiles)('logo file %s exists in public/logo', (file) => {
    expect(existsSync(path.join(publicDir, 'logo', file))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/assets.test.ts`
Expected: FAIL — 18 failing assertions (no files exist yet).

- [ ] **Step 3: Copy fonts and logo files from the Design System**

Run (from repo root):

```bash
mkdir -p "web/public/fonts" "web/public/logo"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/fonts/"*.ttf "web/public/fonts/"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/logo/"*.svg "web/public/logo/"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/logo/"*.png "web/public/logo/"
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/assets.test.ts`
Expected: PASS — 18 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/public/fonts web/public/logo
git commit -m "feat: add SF UI Text font files and CRYGLE logo assets to public/"
```

---

### Task 4: `Button` component (client)

**Files:**
- Create: `web/src/components/core/Button.jsx`
- Create: `web/src/components/core/Button.d.ts`
- Test: `web/src/components/core/Button.test.tsx`

**Interfaces:**
- Consumes: CSS tokens `--blue-500`, `--blue-300`, `--blue-400`, `--white`, `--radius-control`, `--radius-pill`, `--font-control`, `--weight-medium`, `--focus-ring` (Task 2).
- Produces: `Button({ children, size, variant, pill, disabled, fullWidth, leadingIcon, trailingIcon, onClick, ...rest })` — used by every page from Phase 1 onward for every CTA.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/core/Button.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Daftar</Button>);
    expect(screen.getByRole('button', { name: 'Daftar' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Masuk</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Bayar Sekarang</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Bayar Sekarang' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/core/Button.test.tsx`
Expected: FAIL — `Failed to resolve import "./Button.jsx"`.

- [ ] **Step 3: Copy `Button.jsx` from the Design System and add the client directive**

Run: `cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/Button.jsx" "web/src/components/core/Button.jsx"`

Then edit the first line of `web/src/components/core/Button.jsx` — add `'use client';` before the existing `import React from 'react';`:

```javascript
'use client';

import React from 'react';
// ...rest of the file is unchanged from the Design System source
```

- [ ] **Step 4: Copy `Button.d.ts` verbatim**

Run: `cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/Button.d.ts" "web/src/components/core/Button.d.ts"`

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/components/core/Button.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/core/Button.jsx web/src/components/core/Button.d.ts web/src/components/core/Button.test.tsx
git commit -m "feat: port Button component from Design System"
```

---

### Task 5: `Logo` and `SectionHeading` components (server)

**Files:**
- Create: `web/src/components/core/Logo.jsx`
- Create: `web/src/components/core/Logo.d.ts`
- Create: `web/src/components/core/SectionHeading.jsx`
- Create: `web/src/components/core/SectionHeading.d.ts`
- Test: `web/src/components/core/Logo.test.tsx`
- Test: `web/src/components/core/SectionHeading.test.tsx`

**Interfaces:**
- Produces: `Logo({ tone, size, wordmark, assetBase })` and `SectionHeading({ title, supporting, align, tone, width })` — `Logo` is consumed by `NavBar` and `Footer` (Task 6); `SectionHeading` is consumed by every marketing page from Phase 1 onward.

- [ ] **Step 1: Write the failing tests**

```tsx
// web/src/components/core/Logo.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo.jsx';

describe('Logo', () => {
  it('renders the wordmark image with alt text', () => {
    render(<Logo assetBase="/" />);
    expect(screen.getByAltText('CRYGLE Academy')).toBeInTheDocument();
  });

  it('omits the wordmark image when wordmark is false', () => {
    render(<Logo assetBase="/" wordmark={false} />);
    expect(screen.queryByAltText('CRYGLE Academy')).not.toBeInTheDocument();
  });
});
```

```tsx
// web/src/components/core/SectionHeading.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from './SectionHeading.jsx';

describe('SectionHeading', () => {
  it('renders the title', () => {
    render(<SectionHeading title="Rangkaian Program" />);
    expect(screen.getByText('Rangkaian Program')).toBeInTheDocument();
  });

  it('renders supporting text when provided', () => {
    render(<SectionHeading title="Kelas Populer" supporting="Beberapa kelas andalan kami" />);
    expect(screen.getByText('Beberapa kelas andalan kami')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/core/Logo.test.tsx src/components/core/SectionHeading.test.tsx`
Expected: FAIL — both files fail to resolve their import.

- [ ] **Step 3: Copy both components and their type declarations verbatim (no `'use client'` needed — neither uses state or event handlers)**

```bash
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/Logo.jsx" "web/src/components/core/Logo.jsx"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/Logo.d.ts" "web/src/components/core/Logo.d.ts"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/SectionHeading.jsx" "web/src/components/core/SectionHeading.jsx"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/core/SectionHeading.d.ts" "web/src/components/core/SectionHeading.d.ts"
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/core/Logo.test.tsx src/components/core/SectionHeading.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/core/Logo.jsx web/src/components/core/Logo.d.ts web/src/components/core/SectionHeading.jsx web/src/components/core/SectionHeading.d.ts web/src/components/core/Logo.test.tsx web/src/components/core/SectionHeading.test.tsx
git commit -m "feat: port Logo and SectionHeading components from Design System"
```

---

### Task 6: `NavBar` (client) and `Footer` (server) components

**Files:**
- Create: `web/src/components/navigation/NavBar.jsx`
- Create: `web/src/components/navigation/NavBar.d.ts`
- Create: `web/src/components/navigation/Footer.jsx`
- Create: `web/src/components/navigation/Footer.d.ts`
- Test: `web/src/components/navigation/NavBar.test.tsx`
- Test: `web/src/components/navigation/Footer.test.tsx`

**Interfaces:**
- Consumes: `Logo` from `../core/Logo.jsx` (Task 5) — the relative import inside `NavBar.jsx`/`Footer.jsx` only resolves if `core/` and `navigation/` stay sibling directories under `src/components/`.
- Produces: `NavBar({ items, active, onNavigate, onLogin, onSignup, assetBase })` and `Footer({ tagline, email, address, columns, copyright, assetBase })` — both consumed by the root layout (Task 7).

- [ ] **Step 1: Write the failing tests**

```tsx
// web/src/components/navigation/NavBar.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from './NavBar.jsx';

describe('NavBar', () => {
  it('renders the default nav items', () => {
    render(<NavBar assetBase="/" />);
    expect(screen.getByText('Beranda')).toBeInTheDocument();
    expect(screen.getByText('Video Kelas')).toBeInTheDocument();
    expect(screen.getByText('Bootcamp Intensif')).toBeInTheDocument();
    expect(screen.getByText('Mentor')).toBeInTheDocument();
    expect(screen.getByText('Tentang')).toBeInTheDocument();
  });

  it('calls onSignup when Daftar is clicked', () => {
    const onSignup = vi.fn();
    render(<NavBar assetBase="/" onSignup={onSignup} />);
    fireEvent.click(screen.getByText('Daftar'));
    expect(onSignup).toHaveBeenCalledOnce();
  });
});
```

```tsx
// web/src/components/navigation/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer.jsx';

describe('Footer', () => {
  it('renders the default copyright line', () => {
    render(<Footer assetBase="/" />);
    expect(screen.getByText('© 2026 CRYGLE Academy. All rights reserved.')).toBeInTheDocument();
  });

  it('renders all three link columns', () => {
    render(<Footer assetBase="/" />);
    expect(screen.getByText('NAVIGASI')).toBeInTheDocument();
    expect(screen.getByText('PROGRAM')).toBeInTheDocument();
    expect(screen.getByText('DUKUNGAN')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/navigation/NavBar.test.tsx src/components/navigation/Footer.test.tsx`
Expected: FAIL — both fail to resolve their import.

- [ ] **Step 3: Copy `Footer` verbatim (no client directive needed — plain `<a href="#">` links, no handlers)**

```bash
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/navigation/Footer.jsx" "web/src/components/navigation/Footer.jsx"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/navigation/Footer.d.ts" "web/src/components/navigation/Footer.d.ts"
```

- [ ] **Step 4: Copy `NavBar.jsx` and add the client directive (it wires `onClick` handlers on every nav button)**

Run: `cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/navigation/NavBar.jsx" "web/src/components/navigation/NavBar.jsx"`

Then edit the first line of `web/src/components/navigation/NavBar.jsx`:

```javascript
'use client';

import React from 'react';
import { Logo } from '../core/Logo.jsx';
// ...rest of the file is unchanged from the Design System source
```

Run: `cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components/navigation/NavBar.d.ts" "web/src/components/navigation/NavBar.d.ts"`

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/components/navigation/NavBar.test.tsx src/components/navigation/Footer.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/navigation
git commit -m "feat: port NavBar and Footer components from Design System"
```

---

### Task 7: Root layout (`app/layout.tsx`)

**Files:**
- Create: `web/app/layout.tsx`
- Test: `web/app/layout.test.tsx`

**Interfaces:**
- Consumes: `NavBar` (Task 6), `Footer` (Task 6), `app/globals.css` (Task 2).
- Produces: the shared shell every page (Task 8 onward) renders inside.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/layout.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RootLayout from './layout';

// RootLayout renders <html>/<body>, which JSDOM's render() cannot mount
// directly — test the visible shell by rendering its children slot instead.
function Shell({ children }: { children: React.ReactNode }) {
  const tree = RootLayout({ children }) as React.ReactElement;
  return tree.props.children.props.children;
}

describe('RootLayout', () => {
  it('renders the NavBar and Footer logo, plus the Footer copyright line, around the page content', () => {
    render(<Shell><p>Konten halaman</p></Shell>);
    // Logo renders as an <img alt="CRYGLE Academy"> wordmark, not text — one in
    // NavBar, one in Footer. (An earlier draft of this test asserted text
    // content "Crygle" and failed — there is no such text node, only the image.)
    expect(screen.getAllByAltText('CRYGLE Academy').length).toBe(2);
    expect(screen.getByText('Konten halaman')).toBeInTheDocument();
    expect(screen.getByText('© 2026 CRYGLE Academy. All rights reserved.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/layout.test.tsx`
Expected: FAIL — `Failed to resolve import "./layout"`.

- [ ] **Step 3: Write `web/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { NavBar } from '@/components/navigation/NavBar.jsx';
import { Footer } from '@/components/navigation/Footer.jsx';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crygle Academy',
  description:
    'Platform belajar kreatif digital — desain, coding, dan robotika untuk Santri SD hingga SMK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <NavBar assetBase="/" />
        <main>{children}</main>
        <Footer assetBase="/" />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/layout.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/layout.tsx web/app/layout.test.tsx
git commit -m "feat: add root layout wiring NavBar, Footer and global tokens"
```

---

### Task 8: Stub pages for every route

**Files:**
- Create: `web/app/page.tsx` (Home)
- Create: `web/app/kelas/page.tsx` (Katalog Publik)
- Create: `web/app/kelas/[slug]/page.tsx` (Course Details)
- Create: `web/app/login/page.tsx`
- Create: `web/app/signup/page.tsx`
- Create: `web/app/lupa-password/page.tsx`
- Create: `web/app/verifikasi/page.tsx`
- Create: `web/app/checkout/page.tsx`
- Create: `web/app/checkout/review/page.tsx`
- Create: `web/app/checkout/processing/page.tsx`
- Create: `web/app/checkout/berhasil/page.tsx`
- Create: `web/app/checkout/gagal/page.tsx`
- Create: `web/app/dashboard/page.tsx`
- Create: `web/app/classroom/[courseId]/page.tsx`
- Create: `web/app/bootcamp/page.tsx`
- Create: `web/app/bootcamp/booking/page.tsx`
- Create: `web/app/bootcamp/jadwal/page.tsx`
- Create: `web/app/bootcamp/tugas/page.tsx`
- Create: `web/app/bootcamp/leaderboard/page.tsx`
- Create: `web/app/mentor/page.tsx`
- Create: `web/app/tentang/page.tsx`
- Test: `web/app/routes.test.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 5) for each stub's placeholder heading.
- Produces: a route manifest (route path → import path → expected heading) that Phase 1+ tasks extend as each stub gains real content — do not delete this manifest when replacing a stub.

- [ ] **Step 1: Write the failing test — one parametrized test importing every route module**

```tsx
// web/app/routes.test.tsx
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const routes = [
  { heading: 'Home Page', importPage: () => import('./page') },
  { heading: 'Katalog Kelas', importPage: () => import('./kelas/page') },
  { heading: 'Course Details', importPage: () => import('./kelas/[slug]/page'), params: { slug: 'ui-ux-design' } },
  { heading: 'Masuk', importPage: () => import('./login/page') },
  { heading: 'Buat Akun', importPage: () => import('./signup/page') },
  { heading: 'Lupa Password', importPage: () => import('./lupa-password/page') },
  { heading: 'Verifikasi Email', importPage: () => import('./verifikasi/page') },
  { heading: 'Checkout', importPage: () => import('./checkout/page') },
  { heading: 'Konfirmasi Review', importPage: () => import('./checkout/review/page') },
  { heading: 'Konfirmasi Processing', importPage: () => import('./checkout/processing/page') },
  { heading: 'Pembayaran Berhasil', importPage: () => import('./checkout/berhasil/page') },
  { heading: 'Pembayaran Gagal', importPage: () => import('./checkout/gagal/page') },
  { heading: 'Kelas Saya', importPage: () => import('./dashboard/page') },
  { heading: 'Play Kelas', importPage: () => import('./classroom/[courseId]/page'), params: { courseId: 'ui-ux-design' } },
  { heading: 'Bootcamp Intensif', importPage: () => import('./bootcamp/page') },
  { heading: 'Booking Konsultasi', importPage: () => import('./bootcamp/booking/page') },
  { heading: 'Jadwal dan Absensi', importPage: () => import('./bootcamp/jadwal/page') },
  { heading: 'Pengumpulan Tugas dan Quiz', importPage: () => import('./bootcamp/tugas/page') },
  { heading: 'Leaderboard Ranking', importPage: () => import('./bootcamp/leaderboard/page') },
  { heading: 'Mentor', importPage: () => import('./mentor/page') },
  { heading: 'Tentang Crygle Academy', importPage: () => import('./tentang/page') },
];

describe('route stubs', () => {
  it.each(routes)('$heading renders its placeholder heading', async ({ importPage, heading, params }) => {
    const mod = await importPage();
    // Each stub page types its own `params` narrowly (e.g. `{ slug: string }`),
    // which is correct per-page but means the aggregate type across this
    // heterogeneous route table doesn't unify — this is a routing smoke test,
    // not a place to preserve per-page param typing, so widen deliberately.
    const Page = mod.default as ComponentType<{ params: Record<string, string> }>;
    render(<Page params={(params ?? {}) as Record<string, string>} />);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/routes.test.tsx`
Expected: FAIL — `Failed to resolve import "./page"` (and 20 more like it, one per route).

> **Note found during execution:** with the untyped `<Page params={params ?? {}} />` shown in early drafts of this step, `npx tsc --noEmit` in Step 6 fails — TypeScript won't unify the per-page `params` shapes (`{ slug: string }` vs. `{ courseId: string }` vs. `{}`) across one heterogeneous table. The `as ComponentType<...>` cast above and the `as Record<string, string>` cast on the prop value are both required, not optional polish.

- [ ] **Step 3: Write each stub page**

`web/app/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function HomePage() {
  return <SectionHeading title="Home Page" supporting="Fase 1 mengisi konten halaman ini." />;
}
```

`web/app/kelas/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function KatalogPage() {
  return <SectionHeading title="Katalog Kelas" supporting="Fase 1 mengisi konten halaman ini." />;
}
```

`web/app/kelas/[slug]/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  return <SectionHeading title="Course Details" supporting={`Slug: ${params.slug}`} />;
}
```

`web/app/login/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function LoginPage() {
  return <SectionHeading title="Masuk" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/signup/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function SignupPage() {
  return <SectionHeading title="Buat Akun" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/lupa-password/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function LupaPasswordPage() {
  return <SectionHeading title="Lupa Password" supporting="PRD §11.10 — Fase 2." />;
}
```

`web/app/verifikasi/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function VerifikasiPage() {
  return <SectionHeading title="Verifikasi Email" supporting="PRD §11.11 — Fase 2." />;
}
```

`web/app/checkout/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CheckoutPage() {
  return <SectionHeading title="Checkout" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/checkout/review/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CheckoutReviewPage() {
  return <SectionHeading title="Konfirmasi Review" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/checkout/processing/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CheckoutProcessingPage() {
  return <SectionHeading title="Konfirmasi Processing" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/checkout/berhasil/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CheckoutBerhasilPage() {
  return <SectionHeading title="Pembayaran Berhasil" supporting="Fase 2 mengisi konten halaman ini." />;
}
```

`web/app/checkout/gagal/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function CheckoutGagalPage() {
  return <SectionHeading title="Pembayaran Gagal" supporting="PRD §11.3 — Fase 2." />;
}
```

`web/app/dashboard/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function DashboardPage() {
  return <SectionHeading title="Kelas Saya" supporting="Fase 3 mengisi konten halaman ini." />;
}
```

`web/app/classroom/[courseId]/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function ClassroomPage({ params }: { params: { courseId: string } }) {
  return <SectionHeading title="Play Kelas" supporting={`Course: ${params.courseId}`} />;
}
```

`web/app/bootcamp/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function BootcampLandingPage() {
  return <SectionHeading title="Bootcamp Intensif" supporting="PRD §10.1 — Fase 4." />;
}
```

`web/app/bootcamp/booking/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function BootcampBookingPage() {
  return <SectionHeading title="Booking Konsultasi" supporting="PRD §10.2 — Fase 4." />;
}
```

`web/app/bootcamp/jadwal/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function BootcampJadwalPage() {
  return <SectionHeading title="Jadwal dan Absensi" supporting="PRD §10.4 — Fase 4." />;
}
```

`web/app/bootcamp/tugas/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function BootcampTugasPage() {
  return <SectionHeading title="Pengumpulan Tugas dan Quiz" supporting="PRD §10.5 — Fase 4." />;
}
```

`web/app/bootcamp/leaderboard/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function BootcampLeaderboardPage() {
  return <SectionHeading title="Leaderboard Ranking" supporting="PRD §10.6 — Fase 4." />;
}
```

`web/app/mentor/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function MentorPage() {
  return <SectionHeading title="Mentor" supporting="Fase 1 mengisi konten halaman ini." />;
}
```

`web/app/tentang/page.tsx`:

```tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export default function TentangPage() {
  return <SectionHeading title="Tentang Crygle Academy" supporting="Fase 1 mengisi konten halaman ini." />;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/routes.test.tsx`
Expected: PASS — 20 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app
git commit -m "feat: add stub pages for all 20 routes with route manifest test"
```

---

### Task 9: Phase 0 verification

**Files:** none created — this task only runs checks.

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: PASS — all tests from Tasks 1–8 green (33 tests: 1 sanity + 4 tokens + 18 assets + 3 Button + 4 Logo/SectionHeading + 4 NavBar/Footer + 1 layout + 20 routes; some overlap in counting is fine, the point is zero failures).

- [ ] **Step 2: Run the TypeScript compiler**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Run the production build**

Run: `npx next build`
Expected: build succeeds, lists all 14 static routes plus the 2 dynamic routes (`/kelas/[slug]`, `/classroom/[courseId]`) in the output summary.

- [ ] **Step 4: Manual check — start the dev server and click through every nav link**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page loads with SF UI Text font (not a fallback serif/sans), blue/yellow brand colors visible in NavBar and Footer, every NavBar link and every route from the manifest in Task 8 reachable without a 404, no red errors in the browser console.

- [ ] **Step 5: Commit the checkpoint**

```bash
git add -A
git commit -m "chore: Phase 0 scaffold complete — all routes stubbed, tests green, build passes"
```

---

## Self-Review Notes

- **Spec coverage:** every Phase 0 checkpoint item from `Crygle-Academy-Migration-Spec.md` §5 ("npm run dev jalan, halaman kosong ter-render dengan font & warna brand benar") is covered by Task 9. The full route list from the spec's §3 folder structure is covered by Task 8's manifest.
- **`'use client'` placement:** confirmed by reading the actual Design System source — only `Button.jsx` (uses `React.useState`) and `NavBar.jsx` (wires `onClick` on every nav button) need it; `Logo.jsx`, `SectionHeading.jsx`, and `Footer.jsx` stay server components.
- **Import path consistency:** `NavBar.jsx`/`Footer.jsx` import `Logo` via the relative path `../core/Logo.jsx` — Task 6 preserves the exact `components/navigation/` + `components/core/` sibling layout the Design System source assumes, so that relative import resolves without modification.
