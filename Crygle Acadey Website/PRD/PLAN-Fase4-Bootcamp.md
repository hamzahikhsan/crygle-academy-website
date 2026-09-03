# Fase 4: Bootcamp Intensif — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Baca dulu:** `HANDOFF-Context-untuk-AI-Agent.md`, `PLAN-Fase3-Dashboard-Learning.md` (Task 5 — `BootcampSayaPanel` di dashboard link ke rute-rute yang dibangun di sini).

**Goal:** Pecah satu panel "Bootcamp Saya" (4 subtab di `dashboard.html`) menjadi **6 halaman mandiri** di bawah `/bootcamp/*`: 2 halaman baru (Landing publik, Join/Onboarding) + 4 halaman hasil porting subtab asli (Jadwal & Absensi, Booking Konsultasi Mentor, Pengumpulan Tugas & Quiz, Leaderboard).

**Architecture:** `BootcampCohortShell` (cohort banner + sub-nav 4 tab sebagai `Link` sungguhan, bukan JS tab-switch) dipakai oleh 5 dari 6 halaman (semua kecuali Landing, yang jadi entry point publik sebelum orang "masuk" ke workspace cohort). Landing juga memperbaiki bug PRD: navbar "Bootcamp Intensif" di semua halaman lain saat ini mengarah ke `index.html#program-section` (section generik "Rangkaian Program", bukan halaman Bootcamp) — Fase 4 tidak mengubah navbar (di luar cakupan; dicatat sebagai follow-up), tapi menyediakan rute `/bootcamp` yang seharusnya jadi target link tersebut.

**Tech Stack:** Next.js 14 App Router, TypeScript, Vitest + React Testing Library.

**Spec:** `PRD/Crygle-Academy-Migration-Spec.md`, `PRD/Crygle-Academy-PRD.md` §10 (Bootcamp Intensif — Sanbercode Model, sub-bagian §10.1–10.6 dirujuk langsung di komentar `dashboard.html`)

## Global Constraints

- Data cohort (jadwal, mentor, tugas, leaderboard) adalah data demo hardcoded di sumber — port apa adanya, sama seperti Fase 3.
- 2 halaman baru (Landing, Join) HARUS konsisten dengan nada Sanctuary/santri dari brand voice (lihat README Design System) dan **tidak boleh** mengarang detail program yang bertentangan dengan data cohort nyata di 4 halaman lain (mis. tanggal, mentor, harga sesi harus sama persis: "Dimas Pradipa Abiyuda", "September – November 2026", "12 Pekan", "Rp15.000/sesi atau Rp150.000/bulan").
- Komponen dengan state wajib `'use client'`.
- Setiap task diakhiri hijau: `npx tsc --noEmit` dan `npx vitest run`.

---

### Task 1: `BootcampCohortShell` + Landing page (`web/app/bootcamp/page.tsx`)

**Files:**
- Create: `web/src/components/bootcamp/BootcampCohortShell.jsx`
- Modify: `web/app/bootcamp/page.tsx`
- Test: `web/src/components/bootcamp/BootcampCohortShell.test.tsx`
- Test: `web/app/bootcamp/page.test.tsx`

**Interfaces:**
- Produces: `BootcampCohortShell({ active, children })` — `active: 'jadwal' | 'booking' | 'tugas' | 'leaderboard'`, renders the cohort banner + 4-link sub-nav + `children`. Consumed by Task 3-6.

- [ ] **Step 1: Write the failing tests**

```tsx
// web/src/components/bootcamp/BootcampCohortShell.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BootcampCohortShell } from './BootcampCohortShell.jsx';

describe('BootcampCohortShell', () => {
  it('renders the cohort banner with mentor and period', () => {
    render(<BootcampCohortShell active="jadwal"><p>content</p></BootcampCohortShell>);
    expect(screen.getByText('Bootcamp Intensif UI/UX Design & Digital Product')).toBeInTheDocument();
    expect(screen.getByText(/Mentor Utama: Dimas Pradipa Abiyuda/)).toBeInTheDocument();
  });

  it('highlights the active sub-nav link', () => {
    render(<BootcampCohortShell active="tugas"><p>content</p></BootcampCohortShell>);
    expect(screen.getByRole('link', { name: /Pengumpulan Tugas/ })).toHaveClass('active');
    expect(screen.getByRole('link', { name: /Leaderboard/ })).toHaveAttribute('href', '/bootcamp/leaderboard');
  });
});
```

```tsx
// web/app/bootcamp/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BootcampLandingPage from './page';

describe('BootcampLandingPage', () => {
  it('renders the hero and a CTA into the join flow', () => {
    render(<BootcampLandingPage />);
    expect(screen.getByRole('heading', { name: /Bootcamp Intensif/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Gabung Cohort Berikutnya/ })).toHaveAttribute('href', '/bootcamp/join');
  });

  it('states the real cohort facts (mentor, period, duration) consistently with the other Bootcamp pages', () => {
    render(<BootcampLandingPage />);
    expect(screen.getByText(/Dimas Pradipa Abiyuda/)).toBeInTheDocument();
    expect(screen.getByText(/12 Pekan/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/bootcamp/BootcampCohortShell.test.tsx app/bootcamp/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build `BootcampCohortShell.jsx`** (server component; cohort banner content persis dari `dashboard.html` baris 474–489: badge "EDISI ASRAMA & SMK BATCH 12", judul, meta info, tombol WA grup `https://chat.whatsapp.com/demo-crygle-bootcamp-cohort`; sub-nav 4 `Link` menggantikan `bootcamp-tab-btn` — "📅 Jadwal & Absensi" → `/bootcamp/jadwal`, "🤝 Booking Konsultasi Mentor" → `/bootcamp/booking`, "📝 Pengumpulan Tugas & Quiz" → `/bootcamp/tugas`, "🏆 Leaderboard Ranking" → `/bootcamp/leaderboard`, kelas `active` pada link yang cocok dengan prop `active`).

Build `web/app/bootcamp/page.tsx` (Landing, halaman baru — TIDAK pakai `BootcampCohortShell`, ini entry point publik sebelum santri "masuk" workspace cohort): hero ("Bootcamp Intensif UI/UX Design & Digital Product" + tagline mengacu ke model 1-on-1 mentoring dan sertifikasi santri asrama), ringkasan program (mentor utama, periode, durasi — angka persis sama dengan `BootcampCohortShell`), 4 kartu preview yang menjelaskan APA ITU (bukan interaksi nyata) jadwal terstruktur/booking mentor/tugas mingguan/leaderboard, CTA utama "Gabung Cohort Berikutnya" → `/bootcamp/join`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/bootcamp/BootcampCohortShell.test.tsx app/bootcamp/page.test.tsx`
Expected: PASS — 4 tests passed total.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/bootcamp/BootcampCohortShell.jsx web/app/bootcamp/page.tsx
git commit -m "feat: add BootcampCohortShell and new public Bootcamp landing page"
```

---

### Task 2: Join / Onboarding page (`web/app/bootcamp/join/page.tsx`) — halaman baru

**Files:**
- Modify: `web/app/bootcamp/join/page.tsx`
- Test: `web/app/bootcamp/join/page.test.tsx`

**Interfaces:**
- Consumes: `BootcampCohortShell` is NOT used here either (join is still pre-enrollment); reuses `Button` (Fase 0).

Halaman baru: menjelaskan 3 langkah bergabung (1. Daftar/Login akun Crygle Academy, 2. Selesaikan pembayaran paket Bootcamp lewat alur Checkout yang sama seperti kelas video — `Link href="/checkout"`, 3. Gabung Grup WhatsApp Cohort resmi `https://chat.whatsapp.com/demo-crygle-bootcamp-cohort` untuk menerima jadwal), lalu tombol akhir "Buka Dashboard Bootcamp Saya" → `/dashboard?tab=bootcamp` untuk santri yang sudah terdaftar.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/bootcamp/join/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BootcampJoinPage from './page';

describe('BootcampJoinPage', () => {
  it('renders the 3-step onboarding with links to checkout and the WA cohort group', () => {
    render(<BootcampJoinPage />);
    expect(screen.getByText('Segera hadir')).not.toBeInTheDocument(); // sanity: this is fully-built content, not a stub
    expect(screen.getByRole('link', { name: /Selesaikan pembayaran/ })).toHaveAttribute('href', '/checkout');
    expect(screen.getByRole('link', { name: /Gabung Grup WhatsApp Cohort/ })).toHaveAttribute('href', 'https://chat.whatsapp.com/demo-crygle-bootcamp-cohort');
  });

  it('links back to the dashboard Bootcamp Saya panel for already-enrolled santri', () => {
    render(<BootcampJoinPage />);
    expect(screen.getByRole('link', { name: 'Buka Dashboard Bootcamp Saya' })).toHaveAttribute('href', '/dashboard?tab=bootcamp');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/bootcamp/join/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — 3 numbered step cards + final CTA, plain server component (no interactivity needed).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/bootcamp/join/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/bootcamp/join
git commit -m "feat: add new Bootcamp Join/Onboarding page"
```

---

### Task 3: Jadwal & Absensi (`web/app/bootcamp/jadwal/page.tsx`)

**Files:**
- Modify: `web/app/bootcamp/jadwal/page.tsx`
- Test: `web/app/bootcamp/jadwal/page.test.tsx`

Konten dari `dashboard.html` baris 500–549 (tabel 4 baris, kolom Sesi/Tanggal & Jam/Materi/Mentor/Tautan Meeting/Status Hadir):

| Sesi | Tanggal | Materi | Mentor | Status |
|---|---|---|---|---|
| Pekan 1 | 3 Sep 2026 · 19:30 WIB | Orientasi Santri & Standarisasi Figma Dev Mode | Dimas Pradipa | ✓ Hadir (100%) |
| Pekan 2 | 10 Sep 2026 · 19:30 WIB | User Research & Market Validation Produk UI8 | Siti Aminah | ✓ Hadir (100%) |
| Pekan 3 | 17 Sep 2026 · 19:30 WIB | Design Tokens, Auto Layout & Atomic System | Dimas Pradipa | Terjadwal |
| Pekan 4 | 24 Sep 2026 · 19:30 WIB | Final Project Review & Mockup Upload Portofolio | Dimas Pradipa | Terjadwal |

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/bootcamp/jadwal/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JadwalPage from './page';

describe('JadwalPage', () => {
  it('renders all 4 session rows with attendance status', () => {
    render(<JadwalPage />);
    expect(screen.getByText('Orientasi Santri & Standarisasi Figma Dev Mode')).toBeInTheDocument();
    expect(screen.getAllByText('✓ Hadir (100%)')).toHaveLength(2);
    expect(screen.getAllByText('Terjadwal')).toHaveLength(2);
  });

  it('highlights Jadwal as the active shell tab', () => {
    render(<JadwalPage />);
    expect(screen.getByRole('link', { name: /Jadwal & Absensi/ })).toHaveClass('active');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/bootcamp/jadwal/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — `BootcampCohortShell active="jadwal"` wrapping a local `sessions` array rendered as a table, "Rekaman Sesi ↗"/"Join Live Zoom ↗" links from source preserved per-row (Pekan 1 & 2 → recording link, Pekan 3 → live join link, Pekan 4 → "Tersedia H-1" plain text).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/bootcamp/jadwal/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/bootcamp/jadwal
git commit -m "feat: build Bootcamp Jadwal & Absensi page from ported dashboard.html content"
```

---

### Task 4: Booking Konsultasi Mentor (`web/app/bootcamp/booking/page.tsx`)

**Files:**
- Modify: `web/app/bootcamp/booking/page.tsx`
- Test: `web/app/bootcamp/booking/page.test.tsx`

Konten dari `dashboard.html` baris 552–610: intro ("Rp15.000 / sesi atau Rp150.000 / bulan"), 2 pilihan mentor (Dimas Pradipa Abiyuda "Lead UI/UX & Founder" — selected default; Randy Pratama "Mentor 3D Blender & Assets"), 4 slot waktu ("10:00–10:45 WIB" selected default, "14:00–14:45", "16:00–16:45", "20:00–20:45"), ringkasan booking dinamis + tombol "Konfirmasi Booking Sesi".

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/bootcamp/booking/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BookingPage from './page';

describe('BookingPage', () => {
  it('defaults to Dimas Pradipa at 10:00-10:45 WIB in the summary', () => {
    render(<BookingPage />);
    expect(screen.getByText('Dimas Pradipa')).toBeInTheDocument();
    expect(screen.getAllByText('10:00 – 10:45 WIB').length).toBeGreaterThanOrEqual(1);
  });

  it('updates the summary when a different mentor and slot are selected', () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByText('Randy Pratama'));
    fireEvent.click(screen.getByRole('button', { name: '14:00 – 14:45 WIB' }));
    const summary = screen.getByTestId('booking-summary');
    expect(summary).toHaveTextContent('Randy Pratama');
    expect(summary).toHaveTextContent('14:00 – 14:45 WIB');
  });

  it('confirms the booking on button click', () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Konfirmasi Booking Sesi' }));
    expect(screen.getByText(/Sesi konsultasi berhasil dipesan/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/bootcamp/booking/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — `'use client'`, `useState` for `selectedMentor`/`selectedSlot`/`confirmed`, `BootcampCohortShell active="booking"`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/bootcamp/booking/page.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/bootcamp/booking
git commit -m "feat: build Bootcamp Booking Konsultasi Mentor page from ported dashboard.html content"
```

---

### Task 5: Pengumpulan Tugas & Quiz (`web/app/bootcamp/tugas/page.tsx`)

**Files:**
- Modify: `web/app/bootcamp/tugas/page.tsx`
- Test: `web/app/bootcamp/tugas/page.test.tsx`

Konten dari `dashboard.html` baris 613–662: Tugas 1 "Riset Tren Desain di UI8 & Freepik" (90/100, selesai, feedback: "Riset pasar sangat tajam. Pertahankan struktur kategori ini!"), Tugas 2 "Design Tokens, Varian & Typography" (88/100, selesai, feedback: "Auto layout sudah rapi, tinggal sempurnakan naming tokens."), Tugas 3 "Desain 10 Screen Inti Dashboard UI Kit" (aktif, deadline 2 hari lagi, form input link Figma + submit).

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/bootcamp/tugas/page.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TugasPage from './page';

describe('TugasPage', () => {
  it('renders 2 graded assignments and 1 active assignment with its feedback', () => {
    render(<TugasPage />);
    expect(screen.getByText('90/100')).toBeInTheDocument();
    expect(screen.getByText('88/100')).toBeInTheDocument();
    expect(screen.getByText(/Riset pasar sangat tajam/)).toBeInTheDocument();
    expect(screen.getByText('⏳ DEADLINE: 2 HARI LAGI')).toBeInTheDocument();
  });

  it('submits the active assignment Figma link', () => {
    render(<TugasPage />);
    fireEvent.change(screen.getByPlaceholderText('https://figma.com/file/...'), { target: { value: 'https://figma.com/file/abc123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Unggah Link Tugas' }));
    expect(screen.getByText(/Link tugas Figma berhasil dikumpulkan/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/bootcamp/tugas/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — `'use client'` (form state for the active assignment's submit confirmation), `BootcampCohortShell active="tugas"`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/bootcamp/tugas/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/bootcamp/tugas
git commit -m "feat: build Bootcamp Pengumpulan Tugas page from ported dashboard.html content"
```

---

### Task 6: Leaderboard Ranking (`web/app/bootcamp/leaderboard/page.tsx`)

**Files:**
- Modify: `web/app/bootcamp/leaderboard/page.tsx`
- Test: `web/app/bootcamp/leaderboard/page.test.tsx`

Konten dari `dashboard.html` baris 665–709 (tabel 4 baris):

| Peringkat | Nama | Asal | Tugas | Poin |
|---|---|---|---|---|
| 1 🥇 | Ahmad Fauzi | SMK N 2 Pekanbaru | 3 dari 3 | 485 Poin |
| 2 🥈 | Dion Ahza (Anda) | SMK Telkom / Crygle Boarding | 2 dari 3 | 472 Poin |
| 3 🥉 | Nabila Putri | Boarding School Solo | 2 dari 3 | 460 Poin |
| 4 | Rizky Ramadhan | SMK Asrama Bogor | 2 dari 3 | 445 Poin |

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/bootcamp/leaderboard/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LeaderboardPage from './page';

describe('LeaderboardPage', () => {
  it('renders all 4 ranked santri with the current user highlighted', () => {
    render(<LeaderboardPage />);
    expect(screen.getByText('Ahmad Fauzi')).toBeInTheDocument();
    expect(screen.getByText('Dion Ahza (Anda)')).toBeInTheDocument();
    expect(screen.getByText('485 Poin')).toBeInTheDocument();
    expect(screen.getByText('445 Poin')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/bootcamp/leaderboard/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — server component, `BootcampCohortShell active="leaderboard"` wrapping a local `rankings` array.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/bootcamp/leaderboard/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/app/bootcamp/leaderboard
git commit -m "feat: build Bootcamp Leaderboard page from ported dashboard.html content"
```

---

### Task 7: Fase 4 verification

- [ ] **Step 1:** `npx vitest run` — expect all Fase 0-4 tests green (this is the full project test suite).
- [ ] **Step 2:** `npx tsc --noEmit` — expect zero errors.
- [ ] **Step 3:** `npx next build` — expect success.
- [ ] **Step 4:** Manual: `npm run dev`, buka `/bootcamp` → "Gabung Cohort Berikutnya" → `/bootcamp/join` → tiap link (checkout, WA grup, dashboard) → dari Dashboard "Bootcamp Saya" panel klik tiap 4 tombol dan pastikan mendarat di halaman yang benar dengan sub-nav ter-highlight benar. Coba booking (ganti mentor/slot/konfirmasi), submit tugas, cek leaderboard.
- [ ] **Step 5:** Commit checkpoint: `git commit -m "chore: Fase 4 Bootcamp complete — full migration from static HTML done"`.
- [ ] **Step 6:** Jalankan `superpowers:finishing-a-development-branch` sesuai instruksi di `HANDOFF-Context-untuk-AI-Agent.md` untuk menyelesaikan branch migrasi (merge/PR sesuai pilihan pengguna saat itu).

## Self-Review Notes

- **Spec coverage:** Semua 6 halaman Bootcamp dari `HANDOFF-Context-untuk-AI-Agent.md` §5 dan §6 (keputusan "Bootcamp = 6 halaman terpisah") punya task masing-masing.
- **Konsistensi data lintas halaman:** angka mentor/periode/durasi di Landing (Task 1) sengaja diuji ulang identik dengan `BootcampCohortShell` supaya tidak ada drift antara halaman marketing dan halaman workspace cohort.
- **Tidak menduplikasi Fase 3:** `BootcampSayaPanel` di dashboard (Fase 3 Task 5) hanya tautan; seluruh konten interaktif nyata (booking, submit tugas, tabel) hidup di sini — satu sumber kebenaran per fitur.
- **Item follow-up dicatat, bukan dikerjakan diam-diam di luar cakupan:** perbaikan link navbar "Bootcamp Intensif" (saat ini `#program-section` di semua halaman, seharusnya `/bootcamp`) memerlukan menyentuh `NavBar` yang dipakai global oleh root layout — di luar cakupan Fase 1-4 per halaman, didaftarkan sebagai item terpisah untuk sesi berikutnya.
