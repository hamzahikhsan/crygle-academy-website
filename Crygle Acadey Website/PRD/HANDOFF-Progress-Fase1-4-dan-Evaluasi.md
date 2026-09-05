# Handoff Context & Evaluasi — Migrasi Frontend Fase 1 s/d 4 (Next.js 14)

**Untuk:** AI Agent / Developer yang melanjutkan proyek Crygle Academy Website  
**Dari:** Sesi Migrasi Fase 1–4 + Audit & Navigasi Hotfix  
**Tanggal:** 6 September 2026  
**Status Baseline:** ✅ **100% HIJAU (Production Build Ready, 147 Unit Tests Passing, 24 Rute Beroperasi)**  
**Commit Terakhir:** `7f036cb` (*fix(web): resolve broken css bundle, fix logo assets, wire navbar/footer links, and port legal pages*)

---

## 1. Ringkasan Eksekutif

Dokumen ini adalah **laporan serah terima (handoff) komprehensif** yang melanjutkan pekerjaan dari [HANDOFF-Context-untuk-AI-Agent.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/HANDOFF-Context-untuk-AI-Agent.md) (Fase 0 Scaffold).

Seluruh target migrasi frontend dari **4 Dokumen Plan Utama** telah **100% selesai dikerjakan**:
1. [PLAN-Fase1-Marketing-Info.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/PLAN-Fase1-Marketing-Info.md) ➔ **SELESAI (100%)**
2. [PLAN-Fase2-Auth-Commerce.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/PLAN-Fase2-Auth-Commerce.md) ➔ **SELESAI (100%)**
3. [PLAN-Fase3-Dashboard-Learning.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/PLAN-Fase3-Dashboard-Learning.md) ➔ **SELESAI (100%)**
4. [PLAN-Fase4-Bootcamp.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/PLAN-Fase4-Bootcamp.md) ➔ **SELESAI (100%)**

Aplikasi Next.js 14 kini hidup di folder `Crygle Acadey Website/web/`, berjalan dengan performa tinggi, zero lint/type error, dan seluruh styling terikat dengan token resmi Design System.

---

## 2. Metrik Kesehatan Codebase Saat Ini

Sebelum melanjutkan pekerjaan baru, pastikan status berikut tetap terjaga:

- **Unit Test Suite (`npm test`)**: **45 test files, 147 tests (100% Passed)**
- **TypeScript Typecheck (`npx tsc --noEmit`)**: **0 errors**
- **Production Build (`npm run build`)**: **24 routes compiled successfully**
- **Development Server (`npm run dev`)**: Berjalan di `http://localhost:3000` (semua 24 rute HTTP 200 OK)

---

## 3. Peta Rute & Komponen yang Sudah Dibangun

Berikut adalah inventaris lengkap 24 rute aktif di `web/app/` beserta file sumber HTML aslinya:

| # | Rute Next.js | Deskripsi Halaman | File Sumber Asli | Komponen Kunci |
|---|---|---|---|---|
| **Fase 1: Marketing & Info** |
| 1 | `/` | Home Landing Page (9 section lengkap) | `index.html` | Hero, Programs, Features, Courses, Mentors, Testimoni, FAQ |
| 2 | `/kelas` | Katalog Publik Kelas (filter kategori) | PRD §11.2 | `CourseCard`, filter pill tabs |
| 3 | `/kelas/[slug]` | Course Details (Dual tab, kurikulum, mentor) | `course-details.html` | `Accordion`, Sticky Pricing Sidebar |
| 4 | `/mentor` | Direktori Mentor (6 profil mentor + founder) | `mentor.html` | MentorCard, Badge spesialisasi |
| 5 | `/tentang` | Tentang Crygle Academy & Visi Santri | `tentang.html` | Story section, Values grid |
| **Fase 2: Auth & Commerce** |
| 6 | `/login` | Form Masuk Santri | `login.html` | `AuthLayout`, `Input`, toggle password |
| 7 | `/signup` | Form Daftar Santri | `signup.html` | `AuthLayout`, validasi password match |
| 8 | `/lupa-password` | Form Permintaan Reset Password | PRD §11.10 | Step email verification |
| 9 | `/verifikasi` | Verifikasi OTP WhatsApp 4-digit | PRD §11.11 | Auto-focus OTP boxes |
| 10 | `/checkout` | Pemilihan Metode Pembayaran & Promo | `checkout.html` | `useCheckoutState`, VA/QRIS selector |
| 11 | `/checkout/review` | Rincian & Konfirmasi Pembayaran | `payment-review.html` | Timer countdown, ringkasan biaya |
| 12 | `/checkout/processing` | Layar Loading Sinkronisasi Gateway | `payment-processing.html` | Auto-redirect mock 2.5s |
| 13 | `/checkout/berhasil` | Invoice & Akses Langsung ke Kelas | `payment-success.html` | Download PDF receipt, CTA ke Dashboard |
| 14 | `/checkout/gagal` | Penanganan Gagal Bayar & Coba Lagi | PRD §11.3 | Recovery CTA, ganti metode bayar |
| **Fase 3: Dashboard & Learning** |
| 15 | `/dashboard` | Dashboard Santri (7 tab panel interaktif) | `dashboard.html` | `DashboardShell`, `DashboardSidebar`, 7 panels |
| 16 | `/classroom/[courseId]` | LMS Video Player & Modul Kurikulum | `classroom.html` | Video player, playlist accordion, notes tab |
| **Fase 4: Bootcamp Intensif (6 Dedicated Routes)** |
| 17 | `/bootcamp` | Landing Page Bootcamp Publik | `bootcamp.html` | Kurikulum intensif, benefit cohort |
| 18 | `/bootcamp/join` | Onboarding & Link Grup WhatsApp | `bootcamp-join.html` | Direct link WA grup cohort |
| 19 | `/bootcamp/jadwal` | Kalender Sesi Live & Rekap Absensi | `dashboard.html` (Bootcamp) | `BootcampCohortShell`, tabel sesi live |
| 20 | `/bootcamp/booking` | Booking Konsultasi 1-on-1 Mentor | `dashboard.html` (Bootcamp) | Date & slot time picker, mentor selector |
| 21 | `/bootcamp/tugas` | Portal Pengumpulan Tugas & Feedback | `dashboard.html` (Bootcamp) | Form link Figma/Drive, status penilaian |
| 22 | `/bootcamp/leaderboard` | Peringkat & Skor Santri Teraktif | `dashboard.html` (Bootcamp) | Tabel medali ranking cohort |
| **Legalitas Tambahan (Audit Sesi Ini)** |
| 23 | `/privasi` | Kebijakan Privasi & Proteksi Santri | `privasi.html` | Legal text container, klausul anak <17 thn |
| 24 | `/syarat-ketentuan` | Syarat & Ketentuan Layanan Belajar | `syarat-ketentuan.html` | Tata tertib, hak akses seumur hidup |

---

## 4. Struktur Data Bersama (`web/src/data/`)

Untuk mencegah duplikasi dan inkonsistensi, seluruh halaman mengimpor dari data mock sentral:

1. `web/src/data/courses.ts`: 6 kelas populer (termasuk kelas flagship UI/UX seharga Rp449.000).
2. `web/src/data/exploreCourses.ts`: 6 kelas khusus panel *Explore Kelas* di Dashboard (memiliki kategori AI & format harga berbeda sesuai HTML asli).
3. `web/src/data/mentors.ts`: 7 profil mentor lengkap dengan bio, role, rating, dan foto.
4. `web/src/data/chatThreads.ts`: 4 thread simulasi chat santri-mentor.
5. `web/src/data/testimonials.ts`, `faq.ts`, `alumniWork.ts`, `programs.ts`: Konten landing page utama.

---

## 5. Hotfix Penting & Perbaikan Terkini (Sesi 6 September 2026)

Selama sesi evaluasi, ditemukan dan diselesaikan 4 isu integrasi:

1. **Masalah Cache Dev Server vs Production Build (`layout.css` 404)**:
   - *Problem:* Menjalankan `next build` saat `next dev` sedang aktif merusak webpack chunks dev server, menyebabkan file CSS `layout.css` menghasilkan 404 (tampilan halaman menjadi unstyled/Times New Roman polos).
   - *Fix:* Cache `.next/` dibersihkan, dev server direstart secara clean. **Perhatian:** Jangan jalankan `npm run build` bersamaan di terminal lain saat dev server sedang aktif.
2. **Sinkronisasi Path Aset Logo**:
   - *Problem:* Komponen `<Logo>` mengacu ke `/assets/logo/...`, sementara file berada di `/logo/...`.
   - *Fix:* Telah dibuat direktori mirror `web/public/assets/logo/` yang memastikan kedua pola path mengembalikan HTTP 200 OK.
3. **Wiring Navigasi Global (`NavBar.jsx` & `Footer.jsx`)**:
   - *Problem:* Di `app/layout.tsx`, `<NavBar />` dipanggil tanpa prop callback, sehingga klik menu/tombol auth tidak berpindah halaman. Link footer juga masih `href="#"`.
   - *Fix:* `NavBar.jsx` dan `Footer.jsx` kini menggunakan Next.js `<Link>` internal routing yang memetakan menu ke rute aktif secara otomatis.
4. **Porting Halaman Legal**:
   - `privasi.html` dan `syarat-ketentuan.html` yang sebelumnya tertinggal di root HTML telah diporting menjadi `web/app/privasi/page.tsx` dan `web/app/syarat-ketentuan/page.tsx`.

---

## 6. Evaluasi & Keterbatasan yang Perlu Dipahami Agent Berikutnya

Sesuai arahan handoff asli, ada beberapa batasan teknis yang disengaja (*by design*) untuk tahap frontend ini:

1. **Client-Side State Only (Tanpa Backend Nyata)**:
   - Transaksi checkout dan riwayat booking disimpan di `sessionStorage` melalui hook `web/src/hooks/useCheckoutState.ts` atau local memory.
   - Belum ada integrasi database riil (Supabase/PostgreSQL) atau webhook Midtrans backend.
2. **Inkonsistensi Harga Warisan dari HTML Asli**:
   - `course-details.html` menuliskan harga flagship Rp449.000 (diskon 50% dari Rp899.000).
   - `checkout.html` menuliskan Invest Ilmu Rp499.000 + Biaya Registrasi Rp8.000 = Rp507.000.
   - Sesuai prinsip **PORT bukan RECREATE**, kedua angka ini dipertahankan apa adanya di masing-masing modul sampai ada keputusan rekonsiliasi bisnis dari pihak owner.

---

## 7. Roadmap Selanjutnya: Spesifikasi Ekspansi Alur Baru

Dokumen referensi untuk tahap selanjutnya:
- [Crygle-Academy-Flow-Expansion-Spec.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/Crygle-Academy-Flow-Expansion-Spec.md) (Dibuat 5 September 2026)
- [PLAN-FlowExpansion-Fase1-Dashboard-Peserta.md](file:///d:/Workspace%202/CRIGLE%20STUDIO%20MENTOR/Crygle%20Acadey%20Website/PRD/PLAN-FlowExpansion-Fase1-Dashboard-Peserta.md)

### Prioritas Fitur Baru yang Direkomendasikan:

1. **Sistem Sertifikat Santri (Prioritas Terbesar Klien — §7 Spesifikasi)**:
   - **Halaman Sertifikat Individual** (`/sertifikat/[id]`):
     - Menampilkan nama penerima, judul kelas/bootcamp, format ID `CRYGLE-CERT-2026-XXXXX`.
     - Tanda tangan digital Founder & Mentor Utama, QR Code verifikasi.
     - Tombol Download PDF & Share ke LinkedIn / WhatsApp.
   - **Halaman Verifikasi Publik** (`/verifikasi-sertifikat`):
     - Dapat diakses siapapun tanpa login (sekolah mitra, wali santri).
     - Validasi keaslian sertifikat dengan penyamaran nama santri demi privasi anak di bawah umur (contoh: `D**n A**a`).
2. **Video Materi Belajar Gratis Bootcamp (Model Sanbercode — §3 Spesifikasi)**:
   - Akses video gratis untuk materi pembelajaran dasar, sedangkan sesi mentoring 1-on-1, review portofolio, dan sertifikat berbayar.
3. **Course Learning Hub (Dual-State Course Details — §6.2 Spesifikasi)**:
   - Untuk santri yang *sudah membeli kelas*, floating card kanan menampilkan progress bar dan tombol "Lanjutkan Belajar" ke modul terakhir, dilengkapi tab unduhan materi (*attachments*) dan kuis per modul.
4. **Bootcamp Overview Layer (§6.3 Spesifikasi)**:
   - Layar ringkasan (Sesi live terdekat, progress tugas, ranking santri) sebelum melompat ke sub-fitur.
5. **Portal Multi-Role**:
   - **Role Mentor Portal** (`/mentor-portal`): Dashboard mentor, kelola materi kelas, roster santri cohort, penilaian tugas (Grading Center), dan pencairan honor konsultasi.
   - **Role Admin Console** (`/admin-console`): Manajemen akun pengguna, kurasi katalog kelas & cohort, rekonsiliasi transaksi, pembatalan/pencabutan sertifikat, dan kemitraan B2B sekolah.

---

## 8. Panduan Menjalankan Proyek untuk Agent Baru

```bash
# 1. Pindah ke direktori web Next.js
cd "d:/Workspace 2/CRIGLE STUDIO MENTOR/Crygle Acadey Website/web"

# 2. Jalankan test suite untuk verifikasi baseline
npm test

# 3. Jalankan type check
npx tsc --noEmit

# 4. Jalankan server dev lokal
npm run dev
# Akses melalui browser: http://localhost:3000
```
