# Fase 3: Dashboard & Learning — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Baca dulu:** `HANDOFF-Context-untuk-AI-Agent.md`, `PLAN-Fase1-Marketing-Info.md` (§Global Constraints ada ralat penting soal Explore Kelas — baca sebelum mulai Task 2 di bawah).

**Goal:** Bangun Dashboard Santri (7 panel) dan Classroom (ruang belajar interaktif) — porting konten asli dari `dashboard.html` (1212 baris) dan `classroom.html` (457 baris).

**Architecture:** Satu route `/dashboard` (sudah di-stub di Fase 0) dengan `DashboardShell` client component yang mengatur panel aktif lewat query param `?tab=` (dibaca via `useSearchParams`, diubah via `router.push` — bookmarkable, bukan hash-routing, sesuai Migration-Spec keputusan 5). Tiap panel adalah komponen terpisah di `src/components/dashboard/panels/`. "Bootcamp Saya" panel HANYA berisi ringkasan cohort + CTA ke rute `/bootcamp/*` — konten penuh (jadwal, booking, tugas, leaderboard) adalah tanggung jawab **Fase 4**, jangan diduplikasi di sini.

**Tech Stack:** Next.js 14 App Router, TypeScript, Vitest + React Testing Library.

**Spec:** `PRD/Crygle-Academy-Migration-Spec.md`, `PRD/Crygle-Academy-PRD.md` §9.11 (Dashboard), §9.12 (Classroom), §11.2, §11.6, §11.7

## Global Constraints

- Default panel aktif = **Course Saya** (`courses`), persis seperti `dashboard-menu-item active` di sumber — bukan Overview.
- Semua data santri di sumber (nama "Dion Ahza", sekolah "SMK N 2 Pekanbaru", KPI, tabel) adalah **data demo hardcoded** di HTML asli (bukan data real user) — port apa adanya, jangan ganti jadi generic placeholder seperti "Nama Anda". Ini konsisten dengan Migration-Spec keputusan 3 (data hardcoded).
- Panel Setting sumber HANYA punya konten untuk subtab "Profil Siswa" — 3 subtab lain (Akademik & Asrama, Keamanan Sandi, Notifikasi) punya tombol nav tapi TIDAK punya panel konten di HTML manapun. Porting HARUS jujur soal ini: render subtab-subtab itu dengan pesan "Segera hadir" alih-alih mengarang form baru — catat sebagai gap di §Self-Review, bukan ditutupi.
- Komponen dengan state (`useState`, tab switching, form) wajib `'use client'`.
- Setiap task diakhiri hijau: `npx tsc --noEmit` dan `npx vitest run`.

---

### Task 1: `DashboardShell` — sidebar, top header, notif/profile dropdown, panel router

**Files:**
- Create: `web/src/components/dashboard/DashboardShell.jsx`
- Create: `web/src/components/dashboard/DashboardSidebar.jsx`
- Create: `web/src/components/dashboard/DashboardHeader.jsx`
- Test: `web/src/components/dashboard/DashboardShell.test.tsx`

**Interfaces:**
- Produces: `DashboardShell({ children racional per active tab })` — actually renders panel switching itself; exposes the `?tab=` contract every panel task below depends on: valid values `overview|courses|bootcamp|explore|chat|affiliate|setting`.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/DashboardShell.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams(''),
}));

import { DashboardShell } from './DashboardShell.jsx';

describe('DashboardShell', () => {
  it('defaults to the Course Saya panel and highlights it in the sidebar', () => {
    render(<DashboardShell />);
    expect(screen.getByText('Kelas Saya')).toBeInTheDocument(); // page title mirrors dashboard.html's #dashboard-main-title default
    expect(screen.getByRole('link', { name: 'Course Saya' })).toHaveClass('active');
  });

  it('switches tab and updates the URL when a sidebar item is clicked', () => {
    render(<DashboardShell />);
    fireEvent.click(screen.getByRole('link', { name: 'Explore Kelas' }));
    expect(pushMock).toHaveBeenCalledWith('/dashboard?tab=explore');
  });

  it('renders the user profile pill with the demo student name', () => {
    render(<DashboardShell />);
    expect(screen.getByText('Dion Ahza')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/DashboardShell.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Build `DashboardSidebar.jsx` (7 menu items, `href="/dashboard?tab=X"`, `active` class from current tab), `DashboardHeader.jsx` (title changes per tab: Overview→"Overview", courses→"Kelas Saya", bootcamp→"Bootcamp Saya", explore→"Explore Kelas", chat→"Chat Mentor", affiliate→"Affiliate", setting→"Pengaturan"; notif bell with dropdown showing the 3 notifications from source lines 129-152 — "Tugas Modul 2 Dinilai!", "Sesi Live Mentoring Hari Ini", "Komisi Berhasil Ditambahkan"; profile pill with dropdown — "⚙️ Pengaturan Profil", "▶ Ruang Belajar Aktif" → `/classroom/ui-ux-menjual-produk-ui-kit`, "🚪 Keluar Akun" → `/login`), then `DashboardShell.jsx` composing both plus the active panel (panels themselves are stubs returning `null` until Task 3-9 fill them in — import placeholders and leave a `// TODO Task N` comment per panel import so this task compiles standalone).**

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/DashboardShell.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/DashboardShell.jsx web/src/components/dashboard/DashboardSidebar.jsx web/src/components/dashboard/DashboardHeader.jsx web/src/components/dashboard/DashboardShell.test.tsx
git commit -m "feat: build DashboardShell with sidebar, header dropdowns, and ?tab= panel routing"
```

---

### Task 2: `exploreCourses.ts` data file

**Files:**
- Create: `web/src/data/exploreCourses.ts`
- Test: (covered by `data.test.ts` extension below)

**Interfaces:**
- Produces: `exploreCourses: ExploreCourse[]` — a **separate** catalog from `courses.ts` (Fase 1), per the correction in `PLAN-Fase1-Marketing-Info.md` §Global Constraints. Consumed by Task 6 (Explore Kelas panel).

- [ ] **Step 1: Extend the failing test**

Add to `web/src/data/data.test.ts` (from Fase 1 Task 1):

```typescript
import { exploreCourses } from './exploreCourses';

// ...inside the existing describe block:
it('has 6 explore-catalog courses across 4 categories including the AI category absent from courses.ts', () => {
  expect(exploreCourses).toHaveLength(6);
  const categories = new Set(exploreCourses.map((c) => c.category));
  expect(categories).toEqual(new Set(['design', '3d', 'code', 'ai']));
  const aiCourse = exploreCourses.find((c) => c.category === 'ai');
  expect(aiCourse?.title).toBe('AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI');
  expect(aiCourse?.price).toBe('Rp 280.000');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/data/data.test.ts`
Expected: FAIL — `exploreCourses` module not found.

- [ ] **Step 3: Create `web/src/data/exploreCourses.ts`** — 6 item dari `dashboard.html` baris 744–898

```typescript
export interface ExploreCourse {
  category: 'design' | '3d' | 'code' | 'ai';
  levelBadge: string;
  title: string;
  rating: number;
  studentsLabel: string;
  price: string;
  originalPrice: string;
  image: string;
}

export const exploreCourses: ExploreCourse[] = [
  {
    category: 'design',
    levelBadge: 'ADVANCED LEVEL · 8 MODUL',
    title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit',
    rating: 4.9,
    studentsLabel: '(1.6K Siswa)',
    price: 'Rp 350.000',
    originalPrice: 'Rp 700.000',
    image: '/dashboard-assets/lesson-video-poster.jpg',
  },
  {
    category: '3d',
    levelBadge: 'INTERMEDIATE · 8 MODUL',
    title: '3D Design : Membuat Animation 3D Produk di Blender',
    rating: 4.8,
    studentsLabel: '(940 Siswa)',
    price: 'Rp 320.000',
    originalPrice: 'Rp 640.000',
    image: '/dashboard-assets/blender-course-thumb.jpg',
  },
  {
    category: '3d',
    levelBadge: 'BEGINNER TO PRO · 6 MODUL',
    title: '3D Design : Mengembangkan Objek Menjadi Bangunan Digital',
    rating: 4.7,
    studentsLabel: '(620 Siswa)',
    price: 'Rp 290.000',
    originalPrice: 'Rp 580.000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'code',
    levelBadge: 'INTERMEDIATE · 10 MODUL',
    title: 'Front-End Modern: Slicing Desain Figma ke HTML, CSS & JavaScript',
    rating: 4.9,
    studentsLabel: '(1.2K Siswa)',
    price: 'Rp 340.000',
    originalPrice: 'Rp 680.000',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'ai',
    levelBadge: 'TRENDING 2026 · 5 MODUL',
    title: 'AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI',
    rating: 5.0,
    studentsLabel: '(820 Siswa)',
    price: 'Rp 280.000',
    originalPrice: 'Rp 560.000',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'design',
    levelBadge: 'ADVANCED · 7 MODUL',
    title: 'Fintech & Banking App Design: Master Auto Layout & Design System',
    rating: 4.8,
    studentsLabel: '(710 Siswa)',
    price: 'Rp 350.000',
    originalPrice: 'Rp 700.000',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  },
];
```

*(`/dashboard-assets/lesson-video-poster.jpg` dan `/dashboard-assets/blender-course-thumb.jpg` mengacu ke `images/lesson_video_poster.jpg` dan `images/blender_course_thumb.jpg` di root sumber — copy keduanya ke `web/public/dashboard-assets/` sebelum menjalankan test rendering yang memuat gambar ini di Task 4/6.)*

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/data/data.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/data/exploreCourses.ts web/src/data/data.test.ts
git commit -m "feat: add exploreCourses.ts as its own catalog (not merged with courses.ts)"
```

---

### Task 3: Overview panel

**Files:**
- Create: `web/src/components/dashboard/panels/OverviewPanel.jsx`
- Test: `web/src/components/dashboard/panels/OverviewPanel.test.tsx`

Konten dari `dashboard.html` baris 236–402: 4 KPI card (Total Jam Belajar "24.5 Jam" +4.2 jam minggu ini; Kursus Terdaftar "3 Kursus" · 1 Siap Uji Sertifikasi; Rata-rata Skor Tugas "86/100" · Lolos Syarat Sertifikat ≥80; Streak Belajar Santri "🔥 14 Hari" · Konsisten Tanpa Absen), Resume Learning card (course flagship, "5 dari 8 Modul" 60%, CTA "Lanjutkan Belajar" → `/classroom/ui-ux-menjual-produk-ui-kit`), Upcoming Live card (badge "SESI LIVE HARI INI" 16:00–17:30 WIB, judul "Review Portofolio Santri & Persiapan Upload Produk ke UI8", mentor Dimas, CTA "Join Google Meet"), Weekly Activity bar chart (7 hari, tinggi persis: Sen 60%/2.5 Jam, Sel 80%/3.2 Jam, Rab 45%/1.8 Jam, Kam 90%/4.0 Jam, Jum 70%/2.8 Jam, Sab 100%/4.5 Jam aktif, Min 30%/1.5 Jam rencana — rata-rata "3.5 Jam/Hari").

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/OverviewPanel.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OverviewPanel } from './OverviewPanel.jsx';

describe('OverviewPanel', () => {
  it('renders all 4 KPI cards', () => {
    render(<OverviewPanel />);
    expect(screen.getByText('24.5 Jam')).toBeInTheDocument();
    expect(screen.getByText('3 Kursus')).toBeInTheDocument();
    expect(screen.getByText('86/100')).toBeInTheDocument();
    expect(screen.getByText('🔥 14 Hari')).toBeInTheDocument();
  });

  it('renders the resume-learning CTA linking to the classroom', () => {
    render(<OverviewPanel />);
    expect(screen.getByRole('link', { name: /Lanjutkan Belajar/ })).toHaveAttribute('href', '/classroom/ui-ux-menjual-produk-ui-kit');
  });

  it('renders the weekly activity chart with 7 day columns', () => {
    render(<OverviewPanel />);
    expect(screen.getByTitle('Sabtu: 4.5 Jam (Hari Ini)')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/OverviewPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** (server component — read-only display, no interactivity) with a local `weeklyActivity` array `[{ day: 'Sen', pct: 60, title: 'Senin: 2.5 Jam' }, ...]` mapped to bars.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/OverviewPanel.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/OverviewPanel.jsx web/src/components/dashboard/panels/OverviewPanel.test.tsx
git commit -m "feat: build Dashboard Overview panel from ported dashboard.html content"
```

---

### Task 4: Course Saya panel

**Files:**
- Create: `web/src/components/dashboard/panels/CourseSayaPanel.jsx`
- Test: `web/src/components/dashboard/panels/CourseSayaPanel.test.tsx`

Konten dari `dashboard.html` baris 407–465: 3 kartu kelas terdaftar — UI/UX flagship (60%, 5/8 Modul, hijau) → `/classroom/ui-ux-menjual-produk-ui-kit`; 3D Blender Animation (30%, 3/8 Modul, kuning); 3D Object Building "Mengembangkan 3D Objek Menjadi 3D Bangunan Digital" (25%, 2/8 Modul, kuning). Semua card link ke classroom.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/CourseSayaPanel.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CourseSayaPanel } from './CourseSayaPanel.jsx';

describe('CourseSayaPanel', () => {
  it('renders all 3 enrolled courses with their progress', () => {
    render(<CourseSayaPanel />);
    expect(screen.getByText('5/8 Modul')).toBeInTheDocument();
    expect(screen.getByText('3/8 Modul')).toBeInTheDocument();
    expect(screen.getByText('2/8 Modul')).toBeInTheDocument();
  });

  it('links the flagship course card to the classroom route', () => {
    render(<CourseSayaPanel />);
    expect(screen.getByText('UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit').closest('a')).toHaveAttribute('href', '/classroom/ui-ux-menjual-produk-ui-kit');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/CourseSayaPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** — local `enrolledCourses` array (3 items with `slug`, `title`, `levelLabel`, `progress`, `modulesLabel`, `progressColor`), all linking to `/classroom/${slug}` (only the flagship slug maps to real Classroom content built in Task 10 — the other 2 render the same Classroom shell with the flagship's lesson data, noted as a known limitation since `classroom.html` source only ever shows one course's content; document this as a Fase-4-or-later backlog item, not invented per-course classroom content here).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/CourseSayaPanel.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/CourseSayaPanel.jsx web/src/components/dashboard/panels/CourseSayaPanel.test.tsx
git commit -m "feat: build Dashboard Course Saya panel from ported dashboard.html content"
```

---

### Task 5: Bootcamp Saya panel (ringkasan + CTA ke Fase 4)

**Files:**
- Create: `web/src/components/dashboard/panels/BootcampSayaPanel.jsx`
- Test: `web/src/components/dashboard/panels/BootcampSayaPanel.test.tsx`

Konten ringkasan dari cohort banner sumber (`dashboard.html` baris 474–489) SAJA — bukan 4 subtab penuh (itu domain Fase 4).

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/BootcampSayaPanel.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BootcampSayaPanel } from './BootcampSayaPanel.jsx';

describe('BootcampSayaPanel', () => {
  it('renders the cohort summary and links out to the 4 dedicated Bootcamp pages', () => {
    render(<BootcampSayaPanel />);
    expect(screen.getByText('Bootcamp Intensif UI/UX Design & Digital Product')).toBeInTheDocument();
    expect(screen.getByText(/EDISI ASRAMA & SMK BATCH 12/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Jadwal & Absensi/ })).toHaveAttribute('href', '/bootcamp/jadwal');
    expect(screen.getByRole('link', { name: /Booking Konsultasi Mentor/ })).toHaveAttribute('href', '/bootcamp/booking');
    expect(screen.getByRole('link', { name: /Pengumpulan Tugas/ })).toHaveAttribute('href', '/bootcamp/tugas');
    expect(screen.getByRole('link', { name: /Leaderboard/ })).toHaveAttribute('href', '/bootcamp/leaderboard');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/BootcampSayaPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** — cohort banner ("EDISI ASRAMA & SMK BATCH 12", "Bootcamp Intensif UI/UX Design & Digital Product", "Mentor Utama: Dimas Pradipa Abiyuda · Periode: September – November 2026 · 12 Pekan", tombol WA grup cohort) + 4 tombol besar menggantikan sub-tab bar asli, masing-masing `Link` ke rute Fase 4.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/BootcampSayaPanel.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/BootcampSayaPanel.jsx web/src/components/dashboard/panels/BootcampSayaPanel.test.tsx
git commit -m "feat: build Dashboard Bootcamp Saya summary panel linking to Fase 4 pages"
```

---

### Task 6: Explore Kelas panel

**Files:**
- Create: `web/src/components/dashboard/panels/ExploreKelasPanel.jsx`
- Test: `web/src/components/dashboard/panels/ExploreKelasPanel.test.tsx`

**Interfaces:**
- Consumes: `exploreCourses` (Task 2).

Konten dari `dashboard.html` baris 717–903: promo banner "VOUCHER KHUSUS SANTRI" / kode "CRYGLE50" / tombol salin, 5 chip kategori (Semua Kelas/UI/UX Design/3D & Animation/Front-End Coding/AI for Designers) memfilter grid, grid 6 course dari `exploreCourses`.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/ExploreKelasPanel.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExploreKelasPanel } from './ExploreKelasPanel.jsx';

describe('ExploreKelasPanel', () => {
  it('renders the promo banner and all 6 courses by default', () => {
    render(<ExploreKelasPanel />);
    expect(screen.getByText(/Gunakan Kode "CRYGLE50" untuk Diskon 50%/)).toBeInTheDocument();
    expect(screen.getByText('AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI')).toBeInTheDocument();
  });

  it('filters to only the 3D & Animation category when that chip is clicked', () => {
    render(<ExploreKelasPanel />);
    fireEvent.click(screen.getByRole('button', { name: '3D & Animation' }));
    expect(screen.queryByText('AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI')).not.toBeInTheDocument();
    expect(screen.getByText('3D Design : Membuat Animation 3D Produk di Blender')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/ExploreKelasPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** — `'use client'`, `useState('all')` for active category, filter `exploreCourses` by `category`, each card links to `/kelas/${matching courses.ts slug if the title matches, else '#'}` — for the 4 explore-only titles with no Fase-1 catalog counterpart (3D Object Building, Front-End Modern, AI-Assisted, Fintech & Banking), link to `/kelas` (the catalog list) instead of inventing detail-page routes that don't exist yet.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/ExploreKelasPanel.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/ExploreKelasPanel.jsx web/src/components/dashboard/panels/ExploreKelasPanel.test.tsx
git commit -m "feat: build Dashboard Explore Kelas panel with category filtering"
```

---

### Task 7: Chat Mentor panel

**Files:**
- Create: `web/src/components/dashboard/panels/ChatMentorPanel.jsx`
- Create: `web/src/data/chatThreads.ts`
- Test: `web/src/components/dashboard/panels/ChatMentorPanel.test.tsx`

Konten dari `dashboard.html` baris 908–1043: 4 thread (Dimas Pradipa Online "File Figma kamu sudah saya review...", Randy Pratama Offline "Untuk shader blender, periksa node metallic...", Siti Aminah Online "Metode riset pasar sudah oke Dion.", Bantuan Asrama Online "Data pendaftaran sertifikasi diterima."), conversation window default ke thread Dimas dengan 3 pesan asli (10:15/10:18/10:20 WIB), 3 quick-reply chip, composer form.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/ChatMentorPanel.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChatMentorPanel } from './ChatMentorPanel.jsx';

describe('ChatMentorPanel', () => {
  it('renders all 4 threads and defaults to the Dimas conversation', () => {
    render(<ChatMentorPanel />);
    expect(screen.getByText('Randy Pratama')).toBeInTheDocument();
    expect(screen.getByText('Siti Aminah')).toBeInTheDocument();
    expect(screen.getByText('Bantuan Asrama')).toBeInTheDocument();
    expect(screen.getByText(/Bagaimana progres pengerjaan modul/)).toBeInTheDocument();
  });

  it('switches conversation when a different thread is clicked', () => {
    render(<ChatMentorPanel />);
    fireEvent.click(screen.getByText('Randy Pratama'));
    expect(screen.getByText(/Untuk shader blender, periksa node metallic/)).toBeInTheDocument();
  });

  it('appends a new message when the composer is submitted', () => {
    render(<ChatMentorPanel />);
    fireEvent.change(screen.getByPlaceholderText('Tulis pesan konsultasi atau tempel link Figma...'), { target: { value: 'Terima kasih mas!' } });
    fireEvent.submit(screen.getByPlaceholderText('Tulis pesan konsultasi atau tempel link Figma...').closest('form')!);
    expect(screen.getByText('Terima kasih mas!')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/ChatMentorPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Create `chatThreads.ts`** with the 4 threads and Dimas's 3 seed messages (exact text from source), then build `ChatMentorPanel.jsx` (`'use client'`, `useState` for `activeThreadId` and per-thread `messages` array, composer `onSubmit` appends a `{ from: 'student', text, time: new Date... }` message).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/ChatMentorPanel.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/data/chatThreads.ts web/src/components/dashboard/panels/ChatMentorPanel.jsx web/src/components/dashboard/panels/ChatMentorPanel.test.tsx
git commit -m "feat: build Dashboard Chat Mentor panel with 4 threads from ported content"
```

---

### Task 8: Affiliate panel

**Files:**
- Create: `web/src/components/dashboard/panels/AffiliatePanel.jsx`
- Test: `web/src/components/dashboard/panels/AffiliatePanel.test.tsx`

Konten dari `dashboard.html` baris 1051–1142: banner referral (kode `CRYGLE-DION-SMK`, tombol salin), 4 KPI (142 Klik, 8 Siswa +3 bulan ini, Rp 480.000 dicairkan, Rp 120.000 menunggu — cair 10 September 2026), tabel riwayat 3 baris (Ahmad Fauzi/UI-UX Flagship/2 Sep 2026/Rp 52.500/Sudah Cair, Rian Hidayat/3D Blender/1 Sep 2026/Rp 48.000/Sudah Cair, Muhammad Fikri/UI-UX Flagship/3 Sep 2026/Rp 52.500/Diproses).

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/AffiliatePanel.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AffiliatePanel } from './AffiliatePanel.jsx';

describe('AffiliatePanel', () => {
  it('renders the referral code and 4 KPI cards', () => {
    render(<AffiliatePanel />);
    expect(screen.getByText('CRYGLE-DION-SMK')).toBeInTheDocument();
    expect(screen.getByText('142 Klik')).toBeInTheDocument();
    expect(screen.getByText('8 Siswa')).toBeInTheDocument();
  });

  it('copies the referral code to the clipboard when "Salin Kode" is clicked', () => {
    const writeText = vi.fn();
    Object.assign(navigator, { clipboard: { writeText } });
    render(<AffiliatePanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Salin Kode' }));
    expect(writeText).toHaveBeenCalledWith('CRYGLE-DION-SMK');
  });

  it('renders the 3-row commission history table', () => {
    render(<AffiliatePanel />);
    expect(screen.getByText('Ahmad Fauzi')).toBeInTheDocument();
    expect(screen.getByText('✓ Sudah Cair')).toBeInTheDocument();
    expect(screen.getByText('Diproses')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/AffiliatePanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** — `'use client'` (clipboard onClick).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/AffiliatePanel.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/AffiliatePanel.jsx web/src/components/dashboard/panels/AffiliatePanel.test.tsx
git commit -m "feat: build Dashboard Affiliate panel from ported dashboard.html content"
```

---

### Task 9: Setting panel

**Files:**
- Create: `web/src/components/dashboard/panels/SettingPanel.jsx`
- Test: `web/src/components/dashboard/panels/SettingPanel.test.tsx`

Konten dari `dashboard.html` baris 1147–1201: 4 subtab nav, HANYA subtab "Profil Siswa" punya form nyata (Nama Lengkap "Dion Ahza", Email "dion.ahza@smk.sch.id", WhatsApp "+62 812-3456-7890", Asal Sekolah "SMK N 2 Boarding School Pekanbaru", Bio textarea). 3 subtab lain: **tidak ada konten di sumber** — render pesan jujur "Segera hadir" per Global Constraints.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/dashboard/panels/SettingPanel.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SettingPanel } from './SettingPanel.jsx';

describe('SettingPanel', () => {
  it('renders the Profil Siswa form pre-filled with the demo student data', () => {
    render(<SettingPanel />);
    expect(screen.getByLabelText('Nama Lengkap Siswa')).toHaveValue('Dion Ahza');
    expect(screen.getByLabelText('Email Terdaftar')).toHaveValue('dion.ahza@smk.sch.id');
  });

  it('shows "Segera hadir" for the 3 subtabs with no source content', () => {
    render(<SettingPanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Akademik & Asrama' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Keamanan Sandi' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Notifikasi' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/dashboard/panels/SettingPanel.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the panel** — `'use client'`, `useState('profil')` for active subtab.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/dashboard/panels/SettingPanel.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/dashboard/panels/SettingPanel.jsx web/src/components/dashboard/panels/SettingPanel.test.tsx
git commit -m "feat: build Dashboard Setting panel (Profil Siswa form + honest stubs for 3 empty subtabs)"
```

*(Setelah Task 3-9 selesai, kembali ke `DashboardShell.jsx` dari Task 1 dan ganti semua placeholder import dengan panel nyata — tambahkan satu langkah verifikasi manual di Task 11.)*

---

### Task 10: Classroom page (`web/app/classroom/[courseId]/page.tsx`)

**Files:**
- Create: `web/src/components/classroom/VideoPlayer.jsx`
- Create: `web/src/components/classroom/ModulesSidebar.jsx`
- Create: `web/src/components/classroom/MentorChatModal.jsx`
- Modify: `web/app/classroom/[courseId]/page.tsx`
- Test: `web/app/classroom/[courseId]/page.test.tsx`

Konten dari `classroom.html` (457 baris): sidebar 4 modul accordion (Modul 1: 2 lesson selesai; Modul 2 terbuka aktif dengan lesson "Brainstorming Fitur" sedang diputar 20:05; Modul 3 & 4: 2 lesson tiap, belum dimulai), mentor card Dimas + tombol "Chat Mentor Terkait" (buka modal), video player (poster + kontrol simulasi, timeline "04:20 / 20:05"), 3 tab (Resources: 3 unduhan — UI Kit Asset.fig 12.4 MB, WhatsApp Community Group, Cheatsheet Design System.pdf 2.1 MB; Ringkasan: 4 key takeaway bullet; Review: 1 review existing dari Farhan Maulana ★★★★★ + form kirim ulasan baru), modal chat mentor (dropdown topik konsultasi, tombol WA + tombol ke dashboard chat).

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/classroom/[courseId]/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ClassroomPage from './page';

describe('ClassroomPage', () => {
  it('renders the course title, active lesson, and progress', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByRole('heading', { name: /Brainstorming Fitur/ })).toBeInTheDocument();
    expect(screen.getByText('5/8 Modul')).toBeInTheDocument();
  });

  it('switches between Resources, Ringkasan, and Review tabs', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByText('UI Kit Asset.fig')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ringkasan' }));
    expect(screen.getByText('Key Takeaways:')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Review' }));
    expect(screen.getByText(/Farhan Maulana/)).toBeInTheDocument();
  });

  it('opens the mentor chat modal', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Chat Mentor Terkait' }));
    expect(screen.getByText('Konsultasi Mentor: Dimas Pradipa')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run "app/classroom/[courseId]/page.test.tsx"`
Expected: FAIL.

- [ ] **Step 3: Build `VideoPlayer.jsx` (`'use client'` — play/pause, timeline, controls, matches source's simulated non-functional-video UI, no real `<video>` element needed since source never had one either), `ModulesSidebar.jsx` (`'use client'` — accordion open/close state, Module 2 open by default), `MentorChatModal.jsx` (`'use client'` — open/close state, topic `<select>`, WA link `https://wa.me/6282283901120?text=...` exact from source), then compose in `page.tsx` with 3-tab content and the 21 lesson labels/durations transcribed exactly from `classroom.html` lines 69-180.**

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run "app/classroom/[courseId]/page.test.tsx"`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/classroom web/app/classroom
git commit -m "feat: build Classroom page with video player, modules sidebar, tabs, and mentor chat modal"
```

---

### Task 11: Fase 3 verification

- [ ] **Step 1:** Wire `DashboardShell.jsx` (Task 1) to import the real panels from Task 3-9, replacing the placeholder imports. Run `npx vitest run src/components/dashboard/DashboardShell.test.tsx` again — still PASS.
- [ ] **Step 2:** `npx vitest run` — expect all Fase 0-3 tests green.
- [ ] **Step 3:** `npx tsc --noEmit` — expect zero errors.
- [ ] **Step 4:** `npx next build` — expect success.
- [ ] **Step 5:** Manual: `npm run dev`, klik semua 7 menu sidebar dashboard, buka dropdown notifikasi & profil, di Explore Kelas coba tiap chip kategori, di Chat Mentor ganti thread & kirim pesan, di Affiliate salin kode, di Setting klik semua 4 subtab. Dari Course Saya klik kartu flagship → Classroom, klik semua 3 tab, buka modal Chat Mentor, klik modul accordion.
- [ ] **Step 6:** Commit checkpoint: `git commit -m "chore: Fase 3 Dashboard & Learning complete"`.

## Self-Review Notes

- **Spec coverage:** Dashboard (7 panel) dan Classroom dari `HANDOFF-Context-untuk-AI-Agent.md` §5 masing-masing punya task (Task 1-9 untuk dashboard shell+panel, Task 10 untuk classroom).
- **Ralat dari Fase 1 diterapkan:** `exploreCourses.ts` dibuat terpisah dari `courses.ts` (Task 2), bukan digabung — lihat catatan koreksi di `PLAN-Fase1-Marketing-Info.md`.
- **Gap jujur, bukan ditutupi:** 3 subtab kosong di Setting panel (Task 9) dan keterbatasan "2 dari 3 kartu Course Saya mengarah ke konten classroom yang sama" (Task 4) dicatat eksplisit sebagai known limitation dari sumber, bukan diam-diam diperbaiki dengan konten karangan.
- **Pemisahan tanggung jawab dengan Fase 4:** Bootcamp Saya panel (Task 5) sengaja HANYA ringkasan+CTA — 4 subtab lengkap (jadwal, booking, tugas, leaderboard) dibangun penuh di `PLAN-Fase4-Bootcamp.md` agar tidak ada duplikasi konten antar fase.
