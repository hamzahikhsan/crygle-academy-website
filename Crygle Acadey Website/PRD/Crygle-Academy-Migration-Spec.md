# Crygle Academy — Frontend Migration Spec

**Dari:** HTML/CSS/JS statis (12 halaman, `Crygle Acadey Website/*.html`)
**Ke:** Next.js 14 (App Router) + TypeScript, dibangun dari [CRYGLE Academy Design System](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf)
**Status:** Disetujui — 3 September 2026 · **Terkait:** `Crygle-Academy-PRD.md` v3.0 (khususnya §13 Sistem Desain, §16 Audit Frontend)

---

## 1. Ringkasan &amp; Tujuan

Situs Crygle Academy saat ini adalah 12 halaman HTML statis yang dibangun langsung dari spesifikasi PRD, memakai token warna yang mendekati (tapi tidak identik dengan) Design System resmi. Migrasi ini memindahkan konten &amp; interaktivitas yang sudah ada itu ke Next.js + TypeScript, memakai 58 komponen React resmi dari Design System sebagai fondasi — sekaligus menutup gap yang tercatat di PRD §11/§14 (state pembayaran gagal, reset password, verifikasi OTP, katalog publik).

**Bukan** proyek nulis ulang dari nol — 90% konten (copy, harga, struktur halaman) sudah benar dan tinggal dipindah wadah.

---

## 2. Lingkup

### Dalam lingkup
- Scaffold Next.js + TypeScript baru di `web/`
- Integrasi penuh token &amp; 58 komponen Design System resmi
- Migrasi 12 halaman existing ke route Next.js, port konten asli (bukan placeholder)
- Membangun 6 gap yang tercatat PRD sebagai bagian migrasi: Katalog Publik, Reset Password, Verifikasi OTP, Pembayaran Gagal, Bootcamp Landing, Join-WA (step terpisah)
- Memecah panel "Bootcamp Saya" (sub-tab dashboard) jadi 6 route terpisah sesuai keputusan PRD §10
- Rekonsiliasi token: pindah dari `variables.css` (tim frontend) ke token resmi Design System

### Di luar lingkup (sengaja, proyek terpisah setelah ini)
- Backend/API nyata — semua data (kelas, harga, mentor, dst.) **tetap hardcoded/mock** di kode, seperti sekarang
- Autentikasi nyata (session, JWT, dsb.) — form ada, tapi submit tidak benar-benar memvalidasi ke server
- Integrasi payment gateway nyata (Midtrans/Xendit dsb.) — UI checkout lengkap, tapi tidak memproses transaksi sungguhan
- Deployment/hosting — di luar cakupan spec ini
- Halaman legal (Kebijakan Privasi, Syarat &amp; Ketentuan) — masih placeholder, isi kontennya perlu tim legal/produk, bukan keputusan teknis
- Ekspansi B2B Sekolah (PRD §15) — murni ideation, tidak masuk migrasi

---

## 3. Lokasi &amp; Struktur Project

Next.js dibangun di subfolder baru, **tidak menimpa** 12 file HTML yang sudah ada (tetap jadi referensi selama migrasi berjalan):

```
Crygle Acadey Website/
├─ index.html, login.html, ... (12 file existing — TETAP ADA, jadi rujukan)
├─ styles/, scripts/, icon/, images/, font typhography/ (existing)
├─ PRD/
│  ├─ Crygle-Academy-PRD.md
│  └─ Crygle-Academy-Migration-Spec.md   ← dokumen ini
├─ CRYGLE Academy Design System-handoff/   (sumber komponen &amp; token)
└─ web/                                     ← BARU, mulai dari sini
   ├─ app/
   │  ├─ layout.tsx                 (root layout: font, NavBar, Footer global)
   │  ├─ globals.css                (import semua token)
   │  ├─ page.tsx                   (Home)
   │  ├─ kelas/page.tsx              (Katalog Publik — BARU)
   │  ├─ kelas/[slug]/page.tsx       (Course Details)
   │  ├─ login/page.tsx
   │  ├─ signup/page.tsx
   │  ├─ lupa-password/page.tsx      (BARU)
   │  ├─ verifikasi/page.tsx         (BARU)
   │  ├─ checkout/page.tsx
   │  ├─ checkout/review/page.tsx
   │  ├─ checkout/processing/page.tsx
   │  ├─ checkout/berhasil/page.tsx
   │  ├─ checkout/gagal/page.tsx      (BARU)
   │  ├─ dashboard/page.tsx           (+ sub-route per panel, lihat Fase 3)
   │  ├─ classroom/[courseId]/page.tsx
   │  ├─ bootcamp/page.tsx            (Landing — BARU)
   │  ├─ bootcamp/booking/page.tsx
   │  ├─ bootcamp/jadwal/page.tsx
   │  ├─ bootcamp/tugas/page.tsx
   │  ├─ bootcamp/leaderboard/page.tsx
   │  ├─ mentor/page.tsx
   │  └─ tentang/page.tsx
   ├─ src/
   │  ├─ components/     (disalin dari Design System — core, navigation, disclosure, commerce, forms, media, icons)
   │  ├─ assets/icons/    (Icon.jsx + icon-data.js)
   │  ├─ data/            (mock data: courses.ts, mentors.ts, dst. — BARU, hasil ekstraksi dari HTML lama)
   │  └─ styles/tokens/   (colors.css, typography.css, layout.css, base.css, fonts.css — dari Design System resmi)
   ├─ public/
   │  ├─ fonts/, images/, logo/, icons/  (disalin dari assets/ Design System)
   ├─ package.json, tsconfig.json, next.config.mjs
   └─ README.md            (cara jalanin, status migrasi per halaman)
```

---

## 4. Keputusan Teknis

| Keputusan | Pilihan | Alasan |
|---|---|---|
| **Sumber token** | Token resmi Design System (`tokens/*.css`), bukan `variables.css` tim frontend | Byte-exact terverifikasi (§13 PRD); efek visual beda tipis (radius pill 38→50px dkk.), didokumentasikan bukan disembunyikan |
| **Format komponen** | Tetap `.jsx` + `.d.ts` pendamping, `tsconfig` `allowJs: true` | Kode sudah terbukti jalan; menulis ulang 40+ komponen ke `.tsx` murni = kerja besar risiko tinggi, tidak sepadan sekarang |
| **Sumber data** | Hardcoded TypeScript (`src/data/*.ts`), diekstrak dari konten HTML asli | Sesuai keputusan kamu — backend menyusul terpisah |
| **Auth state** | Simulasi client-side (mis. `localStorage` flag "logged in") | Cukup untuk demo alur end-to-end, tanpa perlu backend beneran |
| **Routing dashboard** | Route Next.js asli per panel (`dashboard/overview`, `dashboard/bootcamp`, dst.), bukan hash-router | Upgrade natural dari `initDashboardHashRouter()` yang sudah ada; deep-linking &amp; back-button jadi otomatis benar |

---

## 5. Fase Migrasi

### Fase 0 — Scaffold
**Isi:** `create-next-app` (App Router, TS), pasang token &amp; komponen dari Design System ke `web/src/`, root layout dengan font SF UI Text + `NavBar`/`Footer` global, halaman placeholder kosong untuk tiap route di atas (biar struktur routing lengkap dari awal).
**Checkpoint:** `npm run dev` jalan, halaman kosong ter-render dengan font &amp; warna brand benar (bukan font fallback).

### Fase 1 — Marketing &amp; Info
**Halaman:** Home, Katalog Publik (baru — filter Kategori/Level/Harga, pola Udemy per PRD §11.2), Course Details (4 tab), Mentor, Tentang.
**Perbaikan sekalian:** link "Lihat Lainnya" yang mati (`#katalog`) → diarahkan ke `/kelas` yang sungguhan.
**Checkpoint:** kelima halaman bisa dinavigasi dari navbar, konten identik dengan HTML asli, tidak ada link mati.

### Fase 2 — Auth &amp; Commerce
**Halaman:** Login, Signup, **Reset Password (baru, 3 langkah)**, **Verifikasi OTP (baru)**, Checkout, Konfirmasi Review/Processing/Berhasil, **Pembayaran Gagal (baru)**.
**Detail Pembayaran Gagal** (rujukan riset Midtrans/Xendit, PRD §11.3): 3 skenario copy berbeda — kartu ditolak (retryable), VA expired (auto-cancel 15 menit), QRIS timeout — CTA "Coba Metode Lain" + "Hubungi Bantuan".
**Checkpoint:** alur penuh guest→signup→OTP→login bisa disimulasikan; alur checkout→gagal→retry→berhasil bisa disimulasikan end-to-end.

### Fase 3 — Dashboard &amp; Learning
**Halaman:** Dashboard (7 panel: Overview, Course Saya, Bootcamp Saya, Explore Kelas, Chat Mentor, Affiliate, Setting — masing-masing route asli, bukan hash), Classroom/Play Kelas (video player, syllabus accordion, Chat Mentor modal, tab Resources/Ringkasan/Review).
**Checkpoint:** dari Dashboard bisa klik ke Classroom dan balik lagi, semua 7 panel dashboard bisa diakses via URL langsung (bukti routing asli, bukan hash).

### Fase 4 — Bootcamp Intensif
**Halaman:** Landing publik (baru), Booking Konsultasi, Join WA (baru, step tersendiri), Jadwal &amp; Absensi, Pengumpulan Tugas &amp; Quiz, Leaderboard — 6 route terpisah, diekstrak dari markup sub-tab dashboard yang sudah ada.
**Perlu keputusan bisnis dulu (PRD §10, belum final):** apakah Bootcamp dijual terpisah dari kelas reguler, atau add-on — mempengaruhi bagaimana Landing (§bootcamp) terhubung ke Checkout.
**Checkpoint:** 6 halaman bisa diakses berurutan mengikuti alur booking → jadwal → tugas → leaderboard.

---

## 6. Resep Migrasi per Halaman (dipakai di tiap fase)

1. Baca HTML sumber + fungsi `init...()` terkait di `scripts/main.js`
2. Petakan tiap elemen ke komponen Design System (`Button`, `CourseCard`, `NavBar`, `Accordion`, dst.) — komponen baru cuma kalau benar-benar tidak ada padanan
3. Bangun `app/.../page.tsx`, port konten asli (copy, harga, nama, foto) — bukan lorem ipsum
4. Pindahkan interaktivitas `main.js` → `useState`/handler React di komponen terkait
5. Cross-check ke komentar `<!-- Node xxxx:yyyy -->` di HTML sumber untuk verifikasi kesetiaan ke Figma
6. Catat penyimpangan dari HTML asli (kalau ada) di README `web/`

---

## 7. Risiko &amp; Mitigasi

| Risiko | Mitigasi |
|---|---|
| Token resmi mengubah tampilan halus (radius, shadow) dibanding versi HTML lama | Didokumentasikan di §4; screenshot before/after di tiap checkpoint biar terlihat jelas |
| Data mock tersebar/tidak konsisten antar halaman (mis. harga kelas beda di Home vs Checkout) | Satu sumber data di `src/data/courses.ts`, semua halaman import dari situ — bukan hardcode berulang per halaman |
| Scope merambat ke backend/auth beneran di tengah jalan | Ditegaskan di §2 "Di luar lingkup" — kalau muncul kebutuhan itu saat migrasi, dicatat sebagai item baru, bukan dikerjakan on-the-fly |
| Bootcamp Intensif (Fase 4) keputusan bisnisnya belum final | Fase 4 sengaja ditaruh terakhir; kalau keputusan belum turun saat Fase 3 selesai, migrasi bisa berhenti di situ sebagai deliverable valid |

---

## 8. Definisi Selesai (per fase)
Setiap fase dianggap selesai kalau: (a) semua halaman di fase itu bisa dinavigasi tanpa error di browser, (b) konten cocok dengan HTML sumber (dicek manual side-by-side), (c) tidak ada `console.error`, (d) checkpoint di atas terpenuhi.

---

## 9. Referensi
- `Crygle-Academy-PRD.md` v3.0 — §7 Sitemap, §9 Spesifikasi Layar, §10–§11 Alur Tambahan, §13 Sistem Desain, §16 Audit Frontend
- [CRYGLE Academy Design System](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf)
- [Peta User Flow FigJam](https://www.figma.com/board/JoA7Gvz89pjGJFIVFYHLXt/Untitled?node-id=0-1)
