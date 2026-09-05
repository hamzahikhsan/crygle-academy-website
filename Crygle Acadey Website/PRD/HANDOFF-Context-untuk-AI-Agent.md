# Handoff Context — Migrasi Crygle Academy ke Next.js

> 📢 **UPDATE 6 SEPTEMBER 2026:**
> **Fase 1 sampai Fase 4 telah SELESAI 100% dan terverifikasi hijau!**
> Silakan baca dokumen handoff terbaru dan terlengkap di: **[`HANDOFF-Progress-Fase1-4-dan-Evaluasi.md`](./HANDOFF-Progress-Fase1-4-dan-Evaluasi.md)** untuk melihat ringkasan seluruh 24 rute, hotfix navigasi, dan peta rencana tahap berikutnya (*Flow Expansion*).

**Untuk:** AI agent lain yang melanjutkan pekerjaan ini
**Dari:** Sesi migrasi Fase 0 (sudah selesai & di-merge ke `main`)
**Tanggal:** 4 September 2026 (Diperbarui: 6 September 2026)

Dokumen ini adalah briefing lengkap awal sebelum kamu membaca 4 file plan (`PLAN-Fase1-Marketing-Info.md` s/d `PLAN-Fase4-Bootcamp.md`). Baca ini dulu — jangan langsung lompat ke plan.

---

## 1. Apa yang sudah ada (jangan bangun ulang)

Next.js 14 + TypeScript sudah di-scaffold di `Crygle Acadey Website/web/` dan sudah di-merge ke branch `main`. Isinya:

- **Token resmi** di `web/src/styles/tokens/*.css` (colors, typography, layout, base, fonts) — disalin verbatim dari `CRYGLE Academy Design System-handoff/`. **Jangan ubah nilainya.**
- **5 komponen** di `web/src/components/`: `core/Button.jsx`, `core/Logo.jsx`, `core/SectionHeading.jsx`, `navigation/NavBar.jsx`, `navigation/Footer.jsx` — sudah ada test-nya masing-masing.
- **Root layout** `web/app/layout.tsx` — sudah wire NavBar + Footer + token global.
- **21 halaman stub** di `web/app/**/page.tsx` — masing-masing baru berisi 1 `<SectionHeading>` placeholder. **Tugas Fase 1-4 adalah mengisi halaman-halaman ini dengan konten asli**, bukan membuat file baru (kecuali disebutkan eksplisit sebagai halaman baru).
- **56 test lolos**, `tsc --noEmit` bersih, `next build` sukses. Jalankan `npm test` &amp; `npm run typecheck` di `web/` sebelum mulai kerja, untuk konfirmasi baseline masih hijau.

Baca `PRD/Crygle-Academy-Migration-Plan-Phase0-Scaffold.md` kalau butuh detail persis bagaimana Fase 0 dikerjakan (isinya jadi referensi pola, bukan tugas yang perlu diulang).

## 2. Prinsip migrasi: PORT, bukan RECREATE

Semua konten di 12 file HTML asli (`Crygle Acadey Website/*.html`) adalah **konten final yang sudah disetujui** — hasil kerja tim lain berdasarkan PRD &amp; Figma. Tugasmu adalah memindahkan konten itu **persis apa adanya** (harga, nama, copy, angka) ke komponen React yang memakai token &amp; komponen Design System resmi. **Jangan mengarang ulang konten, jangan mengubah harga/nama/angka.**

Setiap plan fase di bawah sudah berisi konten asli yang saya transkrip langsung dari HTML sumber (bukan parafrase) — kamu tetap boleh buka file HTML aslinya untuk verifikasi silang kalau ragu (semua path ada di §5).

## 3. Ledger komponen — mana yang butuh `'use client'`

Ini hasil pembacaan langsung source code tiap komponen (bukan tebakan). **Wajib diikuti** — App Router Next.js akan gagal build kalau komponen dengan `useState`/event handler tidak diberi `'use client'`.

| Komponen | Alasan | Direktif |
|---|---|---|
| `Button` | `useState` (hover/press) | `'use client'` (sudah ada sejak Fase 0) |
| `NavBar` | `onClick` di tiap nav item | `'use client'` (sudah ada sejak Fase 0) |
| `CourseCard` | `onClick` prop | **`'use client'`** |
| `Accordion` | `onToggle` handler | **`'use client'`** |
| `AccordionFAQItems` | `onToggle` handler | **`'use client'`** |
| `AccordionsContent` | `useState` internal (index terbuka) | **`'use client'`** |
| `Input` | `useState` (focus state) | **`'use client'`** |
| `Checkbox` | `onChange` handler | **`'use client'`** |
| `PlayBadge` | `onClick` handler | **`'use client'`** |
| `Logo`, `SectionHeading`, `Footer` | tidak ada state/handler | Server component (default) |
| `Rating`, `DiscountTag`, `AccordionsAnswer` | tidak ada state/handler | Server component |
| `Avatar`, `AvatarStack`, `AvatarNotificationDot`, `Progress` | tidak ada state/handler | Server component |
| Semua wrapper icon (`Book`, `Setting4`, `SearchNormal`, `Sort`, `Message`, `UserOctagon`, `TickCircle`, `Verify`, `Element1`, `Element4`, dll.) | cuma render `<Icon name=... />`, tidak ada handler | Server component |

**Pola icon wrapper** — semua identik, cukup dipahami sekali:
```jsx
import { Icon } from '../../assets/icons/Icon.jsx';
export function NamaIcon({ variant = 'Linear', size = 24, ...rest }) {
  return <Icon name={`NamaIconProperty1${variant}`} size={size} {...rest} />;
}
```
`Icon.jsx` (di `assets/icons/`) dan `icon-data.js` (340 glyph, sudah berisi semua path SVG) **belum disalin ke `web/`** — salin dulu sebelum halaman yang butuh ikon di-render:
```bash
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/icons/Icon.jsx" "web/src/assets/icons/Icon.jsx"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/icons/Icon.d.ts" "web/src/assets/icons/Icon.d.ts"
cp "CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/assets/icons/icon-data.js" "web/src/assets/icons/icon-data.js"
```
Kebanyakan halaman di plan ini pakai **inline SVG dari HTML asli** (bukan sistem Icon), jadi ini opsional — pakai sistem Icon hanya kalau lebih rapi untuk kasus tertentu (mis. sidebar dashboard).

## 4. Gotcha teknis yang sudah ditemukan (jangan ulangi)

Ditemukan &amp; diperbaiki selama Fase 0 — kalau kamu menulis test baru dengan pola serupa, langsung pakai versi yang sudah benar ini:

1. **`readFileSync(new URL(...))` gagal di Windows** — error "URL must be of scheme file". Gunakan `fileURLToPath` + `path.join`:
   ```ts
   import path from 'node:path';
   import { fileURLToPath } from 'node:url';
   const dirname = path.dirname(fileURLToPath(import.meta.url));
   readFileSync(path.join(dirname, 'file.css'), 'utf-8');
   ```
2. **`vitest.config.ts` butuh alias `@` manual** — `tsconfig.json` punya `paths: {"@/*": ["./src/*"]}` tapi Vitest (Vite) tidak baca `tsconfig.json` secara otomatis. Sudah dikonfigurasi di `web/vitest.config.ts` (`resolve.alias`) — jangan hapus.
3. **`Logo` render sebagai `<img alt="CRYGLE Academy">`, bukan teks** — kalau nulis test yang cek brand muncul, pakai `getByAltText('CRYGLE Academy')`, bukan `getByText('Crygle')`.
4. **Test untuk `app/layout.tsx` tidak bisa `render()` langsung** (RTL tidak bisa mount `<html>/<body>`) — pakai pola unwrap children yang sudah ada di `web/app/layout.test.tsx`, contek polanya untuk test halaman lain yang butuh cek layout.
5. **Halaman dengan `params` dinamis** (`[slug]`, `[courseId]`) — kalau bikin test parametrized lintas banyak route sekaligus (seperti `web/app/routes.test.tsx`), TypeScript strict akan komplain soal union type `params` yang tidak seragam. Solusinya: cast eksplisit `as ComponentType<{ params: Record<string, string> }>` — lihat `web/app/routes.test.tsx` untuk contoh jadi.
6. **`login.html` punya kredensial demo ter-hardcode** di `value="dionahza@crygleacademy.com"` / `value="CrygleSantri2026!"` pada input field — ini data dummy desainer untuk keperluan screenshot, **JANGAN diport jadi default value di komponen React** (risiko keamanan/kebingungan). Port sebagai placeholder kosong atau `defaultValue` string kosong.

## 5. Peta sumber konten — HTML asli → halaman Next.js baru

| Halaman baru | Route Next.js | Sumber HTML | Fase |
|---|---|---|---|
| Home | `web/app/page.tsx` | `index.html` (1105 baris, 9 section + navbar + footer) | 1 |
| Katalog Publik | `web/app/kelas/page.tsx` | **Tidak ada sumber** — halaman baru, lihat §11.2 PRD + pola `catalog-course-item` di `dashboard.html` (Explore Kelas panel, 6 kelas) sebagai referensi struktur | 1 |
| Course Details | `web/app/kelas/[slug]/page.tsx` | `course-details.html` (680 baris, 4 tab) | 1 |
| Mentor | `web/app/mentor/page.tsx` | `mentor.html` (320 baris, 6 profil mentor) | 1 |
| Tentang | `web/app/tentang/page.tsx` | `tentang.html` (250 baris) | 1 |
| Login | `web/app/login/page.tsx` | `login.html` | 2 |
| Signup | `web/app/signup/page.tsx` | `signup.html` | 2 |
| Lupa Password | `web/app/lupa-password/page.tsx` | **Tidak ada sumber** — halaman baru, PRD §11.10 | 2 |
| Verifikasi OTP | `web/app/verifikasi/page.tsx` | **Tidak ada sumber** — halaman baru, PRD §11.11 | 2 |
| Checkout | `web/app/checkout/page.tsx` | `checkout.html` | 2 |
| Konfirmasi Review | `web/app/checkout/review/page.tsx` | `payment-review.html` | 2 |
| Konfirmasi Processing | `web/app/checkout/processing/page.tsx` | `payment-processing.html` | 2 |
| Pembayaran Berhasil | `web/app/checkout/berhasil/page.tsx` | `payment-success.html` | 2 |
| Pembayaran Gagal | `web/app/checkout/gagal/page.tsx` | **Tidak ada sumber** — halaman baru, PRD §11.3 | 2 |
| Dashboard (7 panel) | `web/app/dashboard/page.tsx` | `dashboard.html` (1212 baris, 7 `<section class="dashboard-panel">`) | 3 |
| Classroom | `web/app/classroom/[courseId]/page.tsx` | `classroom.html` (457 baris) | 3 |
| Bootcamp × 6 halaman | `web/app/bootcamp/**/page.tsx` | Diekstrak dari `dashboard.html` panel `#panel-bootcamp` (baris 470–712) — landing &amp; join-WA murni baru | 4 |

## 6. Keputusan yang sudah dikonfirmasi user (jangan tanya ulang)

- Katalog jadi halaman publik baru `/kelas`, memakai `src/data/courses.ts` (6 kelas — Home &amp; Course Details juga pakai file yang sama).
- **Koreksi ditulis setelah membaca `dashboard.html` §Explore Kelas secara penuh (bukan asumsi awal):** panel "Explore Kelas" di dashboard BUKAN pakai `courses.ts` — itu katalog 6-kelas terpisah dengan nama, kategori (termasuk kategori "AI for Designers" yang sama sekali tidak ada di `courses.ts`), dan format harga berbeda (`Rp 350.000` vs `Rp. 449.000`). Ini dua dataset yang memang berbeda di 12 halaman HTML sumber, bukan duplikasi yang perlu digabung. Dibuat sebagai `src/data/exploreCourses.ts` terpisah — lihat `PLAN-Fase3-Dashboard-Learning.md` Task 2 &amp; ralat di `PLAN-Fase1-Marketing-Info.md` §Global Constraints.
- Bootcamp Intensif: bentuk akhir adalah **6 halaman terpisah**, bukan konsolidasi 1 panel — meski `dashboard.html` saat ini mengimplementasikannya sebagai 4 sub-tab dalam satu panel. Fase 4 mengekstrak markup itu ke route mandiri.
- Istilah **"Santri/Santriwati"** sudah diformalkan menggantikan "siswa" generik — sudah konsisten dipakai di semua HTML sumber, tinggal diikuti.
- Data course/harga/mentor **tetap hardcoded/mock** (di `src/data/*.ts`) — backend adalah proyek terpisah setelah migrasi frontend selesai.

## 7. Struktur data bersama yang harus dibuat (dipakai lintas fase)

Buat file-file ini di awal Fase 1 — semua fase berikutnya mengimpor dari sini, supaya tidak ada data course/mentor yang terduplikasi dan berbeda antar halaman:

- `web/src/data/courses.ts` — array 6 course (dipakai Home, Katalog, Course Details)
- `web/src/data/mentors.ts` — array 7 mentor termasuk founder (dipakai Home, Mentor, Course Details tab Mentor, Classroom sidebar)
- `web/src/data/testimonials.ts`, `web/src/data/faq.ts`, `web/src/data/alumniWork.ts`, `web/src/data/programs.ts` — konten Home

Detail field &amp; isi persis ada di `PLAN-Fase1-Marketing-Info.md` Task 1.

Fase 3 menambah 2 file data lagi (bukan di Fase 1 karena isinya konten dashboard, bukan marketing):
- `web/src/data/exploreCourses.ts` — katalog 6-kelas TERPISAH khusus panel Explore Kelas (lihat koreksi §6 di atas) — `PLAN-Fase3-Dashboard-Learning.md` Task 2
- `web/src/data/chatThreads.ts` — 4 thread + pesan seed panel Chat Mentor — `PLAN-Fase3-Dashboard-Learning.md` Task 7

## 8. Urutan baca

1. Dokumen ini (selesai)
2. `PLAN-Fase1-Marketing-Info.md`
3. `PLAN-Fase2-Auth-Commerce.md`
4. `PLAN-Fase3-Dashboard-Learning.md`
5. `PLAN-Fase4-Bootcamp.md`

Tiap plan bisa dikerjakan independen asal Fase 1 (yang membuat `src/data/*.ts`) dikerjakan lebih dulu — Fase 2/3/4 mengimpor dari data yang sama.
