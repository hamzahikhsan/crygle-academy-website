# Crygle Academy — Product Requirements Document

**Versi:** 3.1 (11 gap ditutup langsung di situs statis live — lihat §14) · **Tanggal:** 4 September 2026 · **Status:** Draft — siap untuk handoff development & design
**Sumber desain:** Figma — [Research Web Academy (Copy)](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-1568), page **Prototype** · Frontend audit: `Crygle Acadey Website/*.html` (20 halaman per v3.1, dari 12) · Diagram user flow: [FigJam ↗](https://www.figma.com/board/JoA7Gvz89pjGJFIVFYHLXt/Untitled?node-id=0-1) (belum diperbarui ke status v3.1, lihat catatan §16.4)

> **v3.1 (4 Sep 2026):** karena tekanan tenggat, prioritas dialihkan dari migrasi Next.js (plan lengkap tetap tersedia di `PLAN-Fase1..4-*.md` untuk dilanjutkan nanti) ke menutup gap alur/tampilan langsung di situs statis yang sudah live di Vercel. 8 halaman baru dibangun (`kelas.html`, `lupa-password.html`, `verifikasi-otp.html`, `payment-failed.html`, `bootcamp.html`, `bootcamp-join.html`, `privasi.html`, `syarat-ketentuan.html`) memakai token &amp; class CSS yang sudah ada — tanpa bahasa desain baru. Detail per item ada di §14.

---

## 0. Cara Membaca Dokumen Ini (untuk AI Agent & Tim)

Dokumen ini menggabungkan tiga jenis informasi dengan tingkat kepastian berbeda. Setiap bagian/baris ditandai salah satu label berikut — **jangan perlakukan semuanya sebagai fakta yang sudah final**:

| Label | Arti | Boleh langsung dieksekusi? |
|---|---|---|
| ✅ **DESAINED** | Sudah ada layar final di Figma, dengan node ID yang bisa dibuka langsung | Ya — build sesuai desain, tapi cross-check node ID di Figma sebelum mulai |
| 🆕 **DIUSULKAN** | Belum ada di Figma. Konsep & struktur konten sudah disusun di dokumen ini, memakai ulang komponen yang sudah ada | Bisa masuk sprint desain (bikin mockup Figma dulu) sebelum development, **jangan langsung coding tanpa mockup** |
| 💭 **IDEATION** | Spekulatif, belum divalidasi bisnis/user | Jangan dieksekusi — perlu diskusi & validasi dulu |
| ⚠️ **KEPUTUSAN DIPERLUKAN** | Ada pertanyaan terbuka yang butuh jawaban manusia (bisnis/legal/konten) sebelum desain/dev lanjut | Blocker — eskalasi ke product owner |

Semua link node Figma memakai format `node-id=X-Y` (titik dua di ID asli Figma `X:Y` diganti strip `-` untuk URL).

---

## 1. Ringkasan Eksekutif

Crygle Academy adalah platform belajar kreatif digital — desain, coding, dan robotika — untuk pelajar SD hingga SMK, dijalankan sebagai kolaborasi **"Crygle Academy x Boarding School"**. Penelusuran penuh terhadap file Figma page **Prototype** menemukan **11 layar desktop (1440px)** ✅ **DESAINED** yang membentuk empat alur inti: Marketing & Discovery, Autentikasi, Commerce (checkout), dan Learning Experience.

Riset lanjutan terhadap dokumen kerja internal tim (audit kurikulum, outline modul, catatan perencanaan) dan benchmark tiga kompetitor riil (Binar Academy, BuildWithAngga, Sanbercode) menghasilkan **18 alur/layar tambahan** 🆕 **DIUSULKAN** untuk menutup gap yang teridentifikasi, plus strategi brand dan satu arah ekspansi B2B 💭 **IDEATION** yang belum divalidasi.

**Statistik cepat:**
- 11 layar ✅ desained
- 18 solusi alur/layar 🆕 diusulkan (§10–§11)
- 3 kompetitor riil dibenchmark: Binar Academy, BuildWithAngga, Sanbercode (§5)
- 6 gap berdampak High/Critical yang masih perlu keputusan (§14)

---

## 2. Latar Belakang & Konteks Riset

Empat dokumen kerja di luar file Figma mengonfirmasi &amp; memperdalam konteks produk:

| Dokumen | Yang dikonfirmasi |
|---|---|
| Screenshot catatan Figma (dikirim user) | Menegaskan ulang isi catatan lepas kanvas Figma — Bootcamp gratis + konsultasi berbayar (referensi eksplisit **"Sanbercode"**), skema Rp15.000/konsultasi atau Rp150.000/bulan, dan wishlist grup WA + spreadsheet + tugas/quiz + leaderboard. Lihat §10. |
| `Outline Lanjutan Section 1 - Apa Itu UI dan UX Design.md` &amp; `Outline Sejarah UI-UX Design - Point 2.md` | Header modul berbunyi **"Crygle Academy x Boarding School"** — produk ini kolaborasi dengan sekolah asrama, bukan marketplace kursus umum. Disusun untuk melanjutkan pekerjaan **Dimas Pradipa Abiyuda, S.Tr.Kom.** — nama yang sama persis dengan mentor di layar Course Details. Mentor ini **orang nyata**, bukan persona rekaan desainer. |
| `Audit Relevansi Materi UI-UX Binar Academy untuk Crygle Academy.docx` (Juli 2026) | Kurikulum flagship Crygle dibangun di atas 49 dek kanonis **Binar Academy** (2021–2022) yang baru diaudit. Detail &amp; rekomendasi lengkap di §12. |
| Riset kompetitor (web, September 2026) | Pola diskon agresif + kode promo di layar Checkout meniru **BuildWithAngga** — file Figma bahkan masih menyisakan placeholder trailer video bernama `"BWA Class"` yang belum diganti. Detail di §5. |

**Catatan tambahan:**
- Nama file Figma ("Research Web Academy") tidak sama dengan brand yang tampil di seluruh layar ("Crygle Academy") — kemungkinan file riset/eksplorasi awal yang belum di-*rename*. File yang sama juga punya page `/Design-System` (node `467:326`) di luar `/Prototype` — sumber token resmi di §13.
- Model bisnis tersirat: kelas berbayar dengan diskon agresif (termasuk skema "100% off" sebagai funnel akuisisi untuk kelas basic), harga dalam Rupiah, dan *registration fee* terpisah dari harga kelas di checkout.
- ✅ **Dikonfirmasi Design System resmi (§5.1):** model bisnisnya adalah *"free entry classes, paid 'LEVEL UP' classes, on-demand mentors, lifetime access, and a certificate once a course average of 80 is met."* — **"LEVEL UP"** adalah nama resmi tier berbayar (bukan istilah PRD ini), dan syarat sertifikat adalah **nilai rata-rata kelas ≥ 80**, bukan sekadar "selesai 100% modul" seperti asumsi awal di §9.11/§9.12.

---

## 3. Tujuan Produk &amp; Metrik Keberhasilan

**Tujuan:**
1. Mengonversi pengunjung landing page menjadi akun terdaftar (Daftar / Masuk).
2. Memberi calon siswa informasi cukup untuk memutuskan membeli kelas — kurikulum, profil mentor, durasi, level.
3. Menyediakan alur checkout &amp; pembayaran multi-metode (kartu, virtual account, QRIS) yang jelas tahapannya.
4. Memberikan pengalaman belajar terstruktur pasca-pembelian: progres per modul, video player, materi unduhan, akses komunitas.

**Metrik keberhasilan (🆕 usulan tim produk — tidak ada metrik eksplisit di desain):**

| Metrik | Diukur di antara | Kenapa penting |
|---|---|---|
| Conversion ke pendaftaran | Home Page → Signup selesai | Validasi efektivitas landing page &amp; CTA |
| Checkout completion rate | Checkout dibuka → Pembayaran Berhasil | Deteksi drop-off di 3-step stepper |
| Drop-off per metode bayar | Pilih metode → Bayar Sekarang | 5 metode bayar bersaing kompleksitas vs. konversi |
| Course completion rate | Progress Belajar 0% → 100% | Indikator utama nilai produk untuk siswa &amp; orang tua |
| Okupansi konsultasi Bootcamp | Slot jadwal dibuka → dibooking (§10) | Validasi model bisnis konsultasi berbayar mentor |

---

## 4. Target Pengguna &amp; Persona

FAQ pada Home Page: *"CRYGLE Academy dirancang khusus untuk pemula dari tingkat SD hingga SMK."* Kemungkinan besar disalurkan lewat kemitraan sekolah asrama (§2), bukan pasar umum.

> **Keputusan istilah (v3.0, dikonfirmasi user 3 Sep 2026):** tim implementasi frontend sudah mulai memakai **"Santri"/"Santriwati"** (bukan "siswa"/"pelajar") secara konsisten di beberapa layar (panel Affiliate &amp; Setting dashboard, ulasan di tab Reviews Course Details — mis. *"Santriwati Boarding School · 1 bulan lalu"*). Ini diformalkan jadi istilah resmi produk: pakai **Santri** (laki-laki/netral) / **Santriwati** (perempuan) di seluruh copy baru, bukan "siswa" generik. "Pelajar" boleh tetap dipakai di konteks marketing umum (SEO, meta description) yang menyasar pencarian publik.

| Persona | Peran | Kebutuhan |
|---|---|---|
| **Santri/Santriwati SD–SMK** (utama) | Boarding school, minim/tanpa pengalaman desain/coding/robotika | Materi bertahap, jadwal terstruktur (cocok ritme asrama — "waktu luang di asrama terbatas"), sertifikat, akses seumur hidup |
| **Orang Tua / Wali** (sekunder) | Pengambil keputusan pembelian | Transparansi harga/diskon, sertifikat resmi, trust badge ("Akses Selamanya", "Grup Komunitas") |
| **Mentor / Pengajar** (sisi supply) | Berbasis orang nyata, mis. Dimas Pradipa Abiyuda, S.Tr.Kom. | Halaman profil ("Tentang Mentor"), jalur chat langsung dengan Santri |
| **Admin Sekolah Mitra** 💭 IDEATION | Belum ada di desain manapun | Lihat §15 — tersirat dari branding "x Boarding School" |

---

## 5. Strategi Brand &amp; Positioning ✅ DESAIN SYSTEM RESMI DITEMUKAN

> **Update penting (v2.2):** ternyata sudah ada **Design System resmi** yang dibangun tim lewat Claude Design — [CRYGLE Academy Design System ↗](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf) — hasil ekstraksi penuh dari dua page Figma: `/Design-System` (node `467:326`, papan Colors/Typography/Buttons) dan `/Prototype` (node `735:1568`, 20 frame produk). Dokumen itu sudah membangun token warna/tipografi/spacing lengkap plus 58 komponen siap pakai (Button, CourseCard, Accordion, NavBar, Footer, dst.) dan satu **click-through prototype** (Home → Course Details → Login). Bagian §5 &amp; §13 di bawah ini sudah disinkronkan dengan token resminya — bukan lagi rekonstruksi spekulatif seperti versi v2.0/v2.1 sebelumnya.

### 5.1 Sinyal brand terkonfirmasi (✅ dari Design System resmi)
- **Logo** — satu SVG mark per tone: `book-mark-blue.svg` (buku biru, nib putih, untuk latar terang) dan `book-mark-white.svg` (buku putih, nib biru, untuk latar biru). Mark = siluet mingcute `book-6-fill` dengan tepi halaman kuning + emblem nib pena — nib-nya konsisten dengan ikon `Huge-icon/education/outline/fountain pen` yang dipakai di seluruh produk. Ukuran: 48px di header/footer, 55px di layar auth.
- **Motif "Sanctuary"** — muncul independen di dua titik copy checkout: *"…transaksi kamu berjalan aman di Sanctuary kami"* (Konfirmasi–Processing) dan *"…dimulai sekarang di sanctuary digital kami"* (Konfirmasi–Berhasil). Design System resmi belum mengangkat ini jadi pilar voice terdokumentasi — masih peluang terbuka untuk diformalkan.
- **Model bisnis terkonfirmasi tertulis eksplisit** di Readme design system: *"free entry classes, paid 'LEVEL UP' classes, on-demand mentors, lifetime access, and a certificate once a course average of 80 is met."* — **"LEVEL UP"** adalah nama resmi tier berbayar, dan syarat sertifikat adalah **nilai rata-rata kelas ≥ 80** (detail konkret yang sebelumnya tidak ada di §3/§9).
- **Voice &amp; content rules** (dari Readme, ditranskrip verbatim dari copy produk):
  - **Bahasa** — Indonesia sepanjang produk, istilah produk/industri tetap Inggris ("Explore Kelas", "Kelas Populer", "Lifetime Access/Akses Seumur Hidup") — jangan diterjemahkan ke arah manapun.
  - **Sudut pandang** — orang kedua tunggal informal **"kamu"**, tidak pernah "Anda" di copy UI. "Anda" hanya muncul di prosa deskripsi kelas panjang (ditulis sebagai marketing body copy, bukan teks interface). Orang pertama jamak: **"kami"**.
  - **Register** — hangat, lugas, tidak canggung membahas mulai dari nol. Menjawab kecemasan pembaca secara langsung: *"Saya belum pernah belajar coding, robotik dan desain, apakah bisa ikut?"* → *"Tentu bisa! Justru CRYGLE Academy dibuat untuk membantu kamu yang masih bingung harus mulai dari mana."*
  - **Casing** — Title Case untuk heading &amp; CTA ("Lihat Lainnya", "Mulai Belajar"); ALL CAPS hanya untuk heading kolom footer (NAVIGASI, PROGRAM, DUKUNGAN) &amp; eyebrow kategori kecil (KATEGORI KELAS); sentence case untuk label form ("Alamat Email").
  - **Angka &amp; harga** — Rupiah dengan titik pemisah ribuan; dua ejaan hidup berdampingan di file: `Rp. 449.000` di course card, `Rp449.000` di checkout — ikuti konvensi surface yang sedang dikerjakan.
  - **Emoji** — hemat, hanya sebagai tanda baca ("Halo, Selamat Datang 👋" di login, 🎨🤖💻 di satu jawaban FAQ). Tidak pernah di heading, tombol, nav, atau body copy marketing.
  - **Larangan** — tidak ada tumpukan tanda seru, tidak ada urgency ala growth-marketing ("kuota terbatas"), tidak ada jargon yang belum dikenal audiens.

### 5.2 Pilar voice yang diusulkan 🆕 (interpretasi PRD ini di atas fakta §5.1 — belum ada di Design System resmi)

| # | Pilar | Deskripsi |
|---|---|---|
| 1 | **Sanctuary, bukan sekadar sekolah** | Ruang belajar yang terasa aman untuk mencoba &amp; gagal. Pakai kata "aman", "terlindungi", "sanctuary" secara sadar di momen rawan cemas (bayar, submit tugas, mulai kelas baru). |
| 2 | **Membimbing, bukan menggurui** | Sapaan "kamu", pertanyaan retoris pembuka tiap topik, analogi dari dunia anak muda — bukan bahasa akademik kaku. |
| 3 | **Jujur soal sumber** | Diwarisi dari kebiasaan penyusun kurikulum yang eksplisit memisahkan "fakta terverifikasi" dari "analogi populer" (§12). Nilai unik yang jarang dimiliki kompetitor — layak diangkat ke UI (mis. badge "terverifikasi" di materi). |
| 4 | **Belajar sampai hasilnya nyata** | Course flagship: "Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit" — bukan cuma teori, tapi jalur monetisasi konkret. Tagline turunan: *"Bukan hanya teori, tapi juga aksi."* |

### 5.3 Peta positioning vs. kompetitor riil

Tiga nama berikut bukan asumsi — dua disebut eksplisit di catatan Figma tim (§2) dan satu terlihat dari pola desain checkout. Profil dirangkum dari situs resmi masing-masing (dicek September 2026, lihat §17 untuk tautan).

```mermaid
quadrantChart
    title Struktur Kurikulum vs. Usia Target
    x-axis Komunitas Cepat & Terjangkau --> Kurikulum Formal & Mendalam
    y-axis Profesional / Career-switcher --> Pemula Muda K-12
    quadrant-1 Ceruk Crygle
    quadrant-2 Bootcamp Formal Dewasa
    quadrant-3 Komunitas Terjangkau Dewasa
    quadrant-4 Belum Tergarap
    Binar Academy: [0.78, 0.22]
    BuildWithAngga: [0.5, 0.32]
    Sanbercode: [0.22, 0.28]
    Crygle Academy: [0.62, 0.85]
```
*Diagram — Crygle satu-satunya yang menyasar kuadran pemula K-12 dengan struktur kurikulum formal.*

| Kompetitor | Tagline posisi | Ciri khas | Relevansi ke Crygle |
|---|---|---|---|
| **Binar Academy** | Bootcamp career-switcher, sejak 2016 | Kurikulum terstruktur, job connect, multi-kota | Basis kurikulum yang diadaptasi Crygle (§12) |
| **BuildWithAngga** | Skill individual, promo agresif | Diskon besar + kode promo (mis. 2,5jt→88rb), forum privat | ✅ **Terkonfirmasi hard evidence** — Design System resmi mencatat file Figma secara literal meng-*import* library komponen dari `buildwithangga.com` sebagai salah satu sumbernya (bukan cuma dugaan dari pola visual lagi) |
| **Sanbercode** | Bootcamp online murah, cohort mingguan | Mulai ~Rp219rb, batch 4 minggu, grup diskusi + live session + quiz + final project | Cetak biru untuk alur Bootcamp Intensif (§10) |
| **easy-course-buy.lovable.app** | Template checkout kelas (dibangun di Lovable) | Referensi teknis, bukan brand kompetitor | ✅ **Baru ditemukan** — library kedua yang di-*import* langsung ke file Figma menurut Design System resmi; kemungkinan sumber pola UI Checkout §9.5 |
| **Crygle Academy** | Sanctuary belajar untuk K-12 | Satu-satunya yang menyasar SD–SMK secara formal, terintegrasi ke sekolah asrama | — |

> **Sumber:** profil Binar Academy &amp; Sanbercode dari riset web (September 2026, tautan di §17). Baris BuildWithAngga &amp; easy-course-buy.lovable.app dikonfirmasi langsung dari isi Readme [CRYGLE Academy Design System ↗](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf) — bukan inferensi.

### 5.4 Pertanyaan terbuka dari Design System resmi ⚠️

Pembangun Design System (sesi Claude Design sebelumnya) meninggalkan pekerjaan dalam kondisi **terinterupsi** dengan satu pertanyaan yang belum terjawab siapa pun di tim — dokumen ini mewariskannya sebagai keputusan terbuka:

> *"Whether the Roboto scattered through the Prototype frames is intentional or unfinished."*
> Papan fondasi (`/Design-System`) menetapkan **SF UI Text** sebagai satu-satunya typeface produk (13 langkah skala, weight 400/500/600/700 saja). Tapi beberapa frame di `/Prototype` — heading layar Login, breadcrumb, teks "Apa yang Akan Kamu Dapat?" — masih memakai **Roboto**. Kemungkinan besar belum sempat dirapikan, tapi ini **butuh konfirmasi manusia**, bukan asumsi AI agent, sebelum token tipografi di-hardcode ke kode produksi.

Dua item tambahan yang masih menunggu dari tim (dicatat Design System, belum terselesaikan saat dokumen ini ditulis):
- Font binary **SF Pro Display** &amp; **Plus Jakarta Sans** belum di-upload (dipakai di label tombol foundations &amp; beberapa CTA produk) — saat ini fallback ke SF UI Text.
- Font **Pixellari** yang direferensikan ilustrasi login juga belum ada binary-nya.

---

## 6. Lingkup Dokumen

| Dalam lingkup | Di luar lingkup |
|---|---|
| Spesifikasi 11 layar yang sudah didesain (§9), usulan alur/layar penutup gap (§10–§11), strategi brand (§5), risiko konten kurikulum (§12) | Arsitektur teknis (API, database, infra), desain visual pixel-perfect untuk usulan §10–§11 &amp; §15 (masih level konsep/wireframe verbal), keputusan bisnis final (harga institusi, kontrak sekolah mitra) |

---

## 7. Peta Informasi (Sitemap) — 11 Layar ✅ DESAINED

| # | Layar | Kategori | Ukuran | Node Figma |
|---|---|---|---|---|
| 01 | Home Page | Marketing | 1440×6963 | [`735:1569`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-1569) |
| 02 | Course Details — Overview | Discovery | 1440×3365 | [`735:3064`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-3064) |
| 03 | Course Details — Kurikulum Kelas | Discovery | 1440×3393 | [`735:3336`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-3336) |
| 04 | Course Details — Tentang Mentor | Discovery | 1440×2938 | [`735:3648`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-3648) |
| 05 | Checkout | Commerce | 1440×1657 | [`735:3922`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-3922) |
| 06 | Konfirmasi — Review | Commerce | 1440×1259 | [`735:4126`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-4126) |
| 07 | Konfirmasi — Processing | Commerce | 1440×1395 | [`735:4234`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-4234) |
| 08 | Konfirmasi — Berhasil | Commerce | 1440×1690 | [`735:4333`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-4333) |
| 09 | 01 Login | Auth | 1440×1024 | [`735:4450`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-4450) |
| 10 | 02 Signup | Auth | 1440×1024 | [`735:5405`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-5405) |
| 11 | Kelas Saya (Dashboard) | Learning | 1440×1024 | [`814:5929`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=814-5929) |
| 12 | Play Kelas | Learning | 1440×1024 | [`855:684`](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=855-684) |

> ⚠️ **Catatan:** frame duplikat "01 Login" ditemukan di node `1041:517` dengan konten identik — kemungkinan sisa iterasi desain, bersihkan sebelum development dimulai.

---

## 8. Alur Pengguna Utama (✅ dari 11 layar terdesain)

```mermaid
flowchart LR
    Home["Home Page"] --> Discovery["Course Details"]
    Discovery --> Gate{"Sudah login?"}
    Gate -- "Belum" --> Auth["Login / Signup"]
    Auth --> Checkout["Checkout"]
    Gate -- "Sudah" --> Checkout
    Checkout --> Confirm["Konfirmasi Pembayaran"]
    Confirm --> Dashboard["Kelas Saya"]
    Dashboard --> Play["Play Kelas"]
```
*Diagram 1 — Alur level-tinggi menghubungkan 4 kelompok layar.*

### 8.1 Marketing → Discovery
Home Page (§9.1) menampilkan 9 section landing, termasuk grid 6 kelas populer. Pengguna masuk ke Course Details lewat: tombol hero **"Explore Kelas"**, klik kartu kelas, atau tombol **"Lihat Lainnya"** (tujuan 🆕 diusulkan §11.2). Tab-bar Course Details — **Overview / Kurikulum Kelas / Tentang Mentor / Reviews** — berbagi header &amp; sidebar harga; tab Reviews 🆕 diusulkan §11.1.

### 8.2 Autentikasi
Dipicu dari navbar ("Masuk"/"Daftar") atau step pertama stepper Checkout. Signup: Full Name, Email, Password, Konfirmasi Password, centang T&amp;C, opsi "Continue with Google". Login: Email, Password, checkbox "Ingatkan Saya", link "Lupa Password?" (🆕 diusulkan §11.10). Verifikasi email/OTP 🆕 diusulkan §11.11.

### 8.3 Commerce — Discovery → Belajar

```mermaid
flowchart TD
    CD["Course Details<br/>klik 'Mulai Belajar'"] --> CO["Checkout<br/>step: Pembayaran"]
    CO -->|"Bayar Sekarang"| RV["Konfirmasi Review<br/>step: Review"]
    RV -->|"Konfirmasi & Bayar"| PR["Konfirmasi Processing"]
    PR --> SUC["Konfirmasi Berhasil"]
    PR -.->|"diusulkan 11.3"| FAIL["Pembayaran Gagal"]
    SUC -->|"Mulai Belajar"| PLAY["Play Kelas"]
    SUC -.->|"diusulkan 11.4"| RCPT["Halaman Kuitansi"]
```
*Diagram 2 — Alur checkout 3-step; garis putus-putus = usulan baru (§11).*

Stepper **Login → Pembayaran → Review** tampil identik di Checkout dan ketiga layar Konfirmasi. Checkout menawarkan 5 metode bayar plus Kode Promo (pola BuildWithAngga, §5) dan Rincian Harga. ⚠️ **Tidak ada state gagal bayar yang didesain** — solusi diusulkan §11.3, prioritas Critical (§14).

### 8.4 Learning Experience
Dashboard "Kelas Saya" punya sidebar 7 menu, hanya "Course Saya" yang punya layar isi — 6 lainnya 🆕 diusulkan §11.6. Klik course card → Play Kelas: sidebar accordion modul/lesson, video player custom, kartu mentor + CTA "Chat Mentor Terkait" (🆕 diusulkan §11.7), tab Resources/Ringkasan/Review — hanya Resources berisi konten (unduhan aset + link Grup WhatsApp, pola dipakai ulang di Bootcamp Intensif §10).

---

## 9. Spesifikasi Fungsional per Layar ✅ DESAINED

### 9.1 Home Page
`735:1569` · Marketing · 1440×6963

**Tujuan:** Landing page konversi — memperkenalkan brand, program, kelas populer, bukti sosial, mendorong pendaftaran/eksplorasi kelas.

**Elemen kunci:**
- Navbar sticky: logo, Beranda, Video Kelas ▾, Bootcamp Intensif ▾, Mentor, Tentang, Masuk, Daftar
- Hero dengan video trailer + rating sosial (4.5, 300+ reviews)
- Rangkaian Program (Design / Coding / Robot) — 3 kartu + kartu "Tentang Kami"
- Grid 6 kartu Kelas Populer + tombol "Lihat Lainnya"
- Hasil Karya Alumni, Testimoni, FAQ, CTA akhir, Footer 4 kolom

**Interaksi &amp; navigasi:**
- "Explore Kelas", kartu kelas, "Lihat Lainnya" → Course Details
- "Masuk" → 01 Login · "Daftar" → 02 Signup
- FAQ item → expand/collapse in-page

**Catatan:** Dropdown navbar 🆕 diusulkan §11.5. Kartu program "Kreatif Design" tampil dalam state highlight sementara dua lainnya outline — ⚠️ perlu diklarifikasi apakah default state atau active state.

---

### 9.2–9.4 Course Details — Overview · Kurikulum Kelas · Tentang Mentor
`735:3064` / `735:3336` / `735:3648` · Discovery · ~1440×3000–3400

**Tujuan:** Memberi informasi cukup agar calon siswa yakin membeli. Ketiga tab berbagi header (breadcrumb, judul, trailer YouTube, rating) dan sidebar sticky (harga, benefit, "Mulai Belajar").

**Elemen kunci per tab:**
- **Overview** — deskripsi + "Apa yang Akan Kamu Dapat?"
- **Kurikulum Kelas** — accordion 8 chapter (⚠️ lihat §12 untuk risiko konten sebelum di-populate)
- **Tentang Mentor** — profil Dimas Pradipa Abiyuda (nyata, §2), rating, total siswa/course
- Sidebar harga Rp449.000 (coret Rp899.000, 50% off, pola BWA §5), 5 benefit, tombol "Mulai Belajar"

**Interaksi &amp; navigasi:**
- Tab-bar → ganti konten in-page (Reviews 🆕 diusulkan §11.1)
- "Mulai Belajar" → Checkout (atau Login dulu jika belum login)
- Kartu "Course Serupa" → Course Details kelas lain

**Catatan:** ⚠️ Konten "Kurikulum Kelas" yang tampil (chapter UI/UX) berasal dari materi yang sedang diaudit ulang — lihat §12 sebelum konten final dipasang ke layar ini.

---

### 9.5 Checkout
`735:3922` · Commerce · 1440×1657

**Tujuan:** Pengguna memilih metode pembayaran &amp; menerapkan promo sebelum lanjut ke review pesanan.

**Elemen kunci:**
- Step indicator: Login (selesai) → Pembayaran (aktif) → Review
- Metode bayar: Debit/Credit Card, BNI VA, Mandiri VA, BSI VA, QRIS
- Panel "Pesanan Saya" + "Kode Promo" + "Rincian Harga" (Invest Ilmu + Registration Fee = Total Invest)

**Interaksi &amp; navigasi:**
- Pilih metode bayar → form berubah sesuai metode (radio group)
- "Bayar Sekarang" → Konfirmasi — Review

**Catatan:** Label layer beberapa opsi bayar tidak sinkron dengan teks tampil di file Figma (mis. layer bernama "Google Pay" berisi teks "BNI Virtual Account") — rapikan sebelum handoff dev, lihat §13.

---

### 9.6–9.8 Konfirmasi — Review · Processing · Berhasil
`735:4126` / `735:4234` / `735:4333` · Commerce · ~1440×1250–1700

**Tujuan:** Tiga state berurutan dari satu proses pembayaran: konfirmasi akhir, status diproses, lalu hasil.

**Elemen kunci:**
- **Review** — ringkasan Atas Nama, Course, Mentor, Metode Bayar, Total Invest
- **Processing** — spinner animasi, teks "Memproses pembayaran kamu… aman di Sanctuary kami" (§5.1), Merchant, Order ID, Total, catatan keamanan
- **Berhasil** — icon check, "Pembayaran Berhasil! 🎉 …sanctuary digital kami" (§5.1), kartu kelas + Progress Belajar 0%, 3 trust badge

**Interaksi &amp; navigasi:**
- Review: "Konfirmasi &amp; Bayar" → Processing → otomatis lanjut ke Berhasil (⚠️ tanpa durasi/timeout eksplisit di desain — klarifikasi ke engineering)
- Berhasil: "Mulai Belajar" → Play Kelas · "Lihat Kuitansi" → 🆕 diusulkan §11.4

**Catatan kritikal:** ⚠️ **Tidak ada state "Pembayaran Gagal"** yang didesain. Untuk metode VA/QRIS dengan risiko gagal/kedaluwarsa tinggi, ini **blocker** sebelum development — solusi diusulkan §11.3.

---

### 9.9–9.10 01 Login &amp; 02 Signup
`735:4450` / `735:5405` · Auth · 1440×1024

**Tujuan:** Split-screen — ilustrasi brand (Design/Robotic/Coding) di kiri, form di kanan, konsisten di kedua layar.

**Elemen kunci:**
- **Login** — Email, Password, checkbox "Ingatkan Saya", link "Lupa Password?", tombol "Masuk", "Lanjutkan dengan Google"
- **Signup** — Full Name, Email, Password, Konfirmasi Password, checkbox T&amp;C, tombol "Buat Akun", "Continue with Google"

**Interaksi &amp; navigasi:**
- Login/Signup sukses → Kelas Saya (asumsi auto-login pasca-signup)
- Teks silang "Buat Akun" / "Masuk" menghubungkan kedua form

**Catatan:** Frame Login terduplikasi (`735:4450` &amp; `1041:517`) dengan konten identik — housekeeping. Verifikasi email/OTP (§11.11) &amp; tujuan "Lupa Password?" (§11.10) 🆕 diusulkan.

---

### 9.11 Kelas Saya (Dashboard)
`814:5929` · Learning · 1440×1024

**Tujuan:** Hub pasca-login — siswa melihat &amp; melanjutkan kelas yang sudah dibeli.

**Elemen kunci:**
- Sidebar 7 menu: Overview, Course Saya (aktif), Bootcamp Saya, Explore Kelas, Chat Mentor, Affiliate, Setting
- Header: search "Course Name/Mentor", filter Level, Category, Sort By
- Grid kartu kelas dengan progress bar per kelas (mis. 5/8 Modul — 60%)

**Interaksi &amp; navigasi:**
- Klik kartu kelas → Play Kelas
- 6 menu sidebar lain → 🆕 diusulkan §11.6, "Bootcamp Saya" → §10

**Catatan:** 6 dari 7 menu sidebar belum punya layar. Prioritaskan "Bootcamp Saya" &amp; "Explore Kelas" — disebut eksplisit di catatan roadmap tim (§10).

---

### 9.12 Play Kelas
`855:684` · Learning · 1440×1024

**Tujuan:** Ruang belajar aktif — menonton video modul, melacak progres, mengakses materi &amp; komunitas.

**Elemen kunci:**
- Sidebar accordion 4 modul, tiap lesson bertanda selesai (✓) + durasi
- Video player custom: play/pause, seek bar, timestamp, volume, fullscreen
- Kartu mentor + tombol "Chat Mentor Terkait"
- Tab: Resources (aktif) / Ringkasan / Review
- Resources: unduhan aset ("UI Kit Asset.fig", 12.4 MB) + link "Group Community — WhatsApp Group"

**Interaksi &amp; navigasi:**
- "Back to Dashboard" → Kelas Saya · "Next Modul" → lesson berikutnya (state in-page)
- Klik lesson di sidebar → ganti video aktif
- "Chat Mentor Terkait" → 🆕 diusulkan §11.7

**Catatan:** Tab "Ringkasan" &amp; "Review" 🆕 diusulkan §11.8–9 — belum berisi konten di desain asli. Pola "link Grup WhatsApp" dipakai ulang konsisten di alur Bootcamp Intensif (§10).

---

## 10. Alur Bootcamp Intensif 🟡 SEBAGIAN DIBANGUN — bentuk final belum sesuai target

**Sumber:** catatan tim di kanvas Figma (dikonfirmasi ulang lewat screenshot yang dikirim user). Model bisnis eksplisit mencontoh **Sanbercode** (§5): materi gratis + konsultasi mentor berbayar dengan jam terjadwal.

> **Status implementasi (v3.0):** tim frontend sudah membangun 4 dari 6 sub-fitur (§10.2, §10.4, §10.5, §10.6) sebagai **4 sub-tab dalam satu panel dashboard** (`dashboard.html` → "Bootcamp Saya"), lengkap dengan fungsi JS (`initBootcampSubTabs`, `initBookingSlotPicker`). **Keputusan produk (dikonfirmasi user 3 Sep 2026): bentuk akhirnya tetap 6 halaman/route terpisah** seperti tabel di bawah, bukan konsolidasi 1 panel — implementasi saat ini diperlakukan sebagai **Fase 1 / prototipe fungsional**, bukan bentuk final. §10.1 (Landing publik) dan §10.3 (Join WA sebagai step tersendiri) belum dibangun sama sekali. Detail migrasi Fase 1 → Fase 2 ada di §16.

```mermaid
flowchart TD
    A["Bootcamp Intensif — Landing<br/>(dari navbar / sidebar 'Bootcamp Saya')"] --> B["Video Materi Gratis<br/>(reuse Play Kelas)"]
    A --> C{"Mau konsultasi mentor?"}
    C -->|"Rp15.000 / sesi"| D["Booking Slot Konsultasi"]
    C -->|"Rp150.000 / bulan"| D
    D --> E["Join Grup WhatsApp<br/>(reuse pola Resources 9.12)"]
    E --> F["Tracker Jadwal & Absensi<br/>(spreadsheet-style)"]
    F --> G["Pengumpulan Tugas & Quiz"]
    G --> H["Leaderboard Ranking Siswa"]
```
*Diagram 4 — Alur Bootcamp Intensif, dari catatan tim ke 6 layar konkret.*

| # | Layar (route final) | Status | Konsep | Pattern yang dipakai ulang |
|---|---|---|---|---|
| 10.1 | **Bootcamp Intensif — Landing** (publik, `/bootcamp.html`) | ⚠️ Belum dibangun | Halaman jual: deskripsi program, video materi gratis, 2 kartu harga berdampingan (per-sesi vs. bulanan) — mirror layout sidebar harga Course Details | Sidebar harga §9.2–4 |
| 10.2 | **Booking Slot Konsultasi** (`/bootcamp/booking.html`) | 🟡 Ada sebagai sub-tab | Kalender/slot picker jam tersedia mentor ("jam jam tertentu yang sudah disediakan" — catatan tim), konfirmasi sebelum lanjut Checkout | Stepper Checkout §9.5 |
| 10.3 | **Join Grup WhatsApp** (step, bukan halaman) | ⚠️ Belum dibangun terpisah | CTA sekali-klik pasca-booking, identik dengan link komunitas yang sudah ada di Play Kelas | Resources §9.12 |
| 10.4 | **Tracker Jadwal &amp; Absensi** (`/bootcamp/jadwal.html`) | 🟡 Ada sebagai sub-tab | Tabel mirip spreadsheet: tanggal sesi, status hadir, catatan mentor — menjawab wishlist "spreadsheet isinya jadwal, nama siswa, absensi" | Progress bar Dashboard §9.11 |
| 10.5 | **Pengumpulan Tugas &amp; Quiz** (`/bootcamp/tugas.html`) | 🟡 Ada sebagai sub-tab | Upload file/link per minggu + quiz pilihan ganda inline, deadline countdown | Accordion modul Play Kelas §9.12 |
| 10.6 | **Leaderboard Ranking Santri** (`/bootcamp/leaderboard.html`) | 🟡 Ada sebagai sub-tab | Papan peringkat berbasis akumulasi nilai tugas+quiz — insentif gamifikasi eksplisit diminta di catatan tim | Kartu rating §9.2 (pola angka+badge) |

> ⚠️ **Perlu diputuskan tim bisnis:** apakah Bootcamp Intensif dijual terpisah dari kelas berbayar reguler, atau sebagai add-on. Catatan tim menyebut "video materi gratis" tapi konsultasi berbayar — model freemium ini perlu disepakati sebelum §10.1 didesain penuh.
>
> **Rencana migrasi (v3.0):** §10.2/10.4/10.5/10.6 sudah punya markup &amp; logika JS yang benar (di dalam `dashboard.html` + `scripts/main.js`) — migrasi ke halaman terpisah berarti **mengekstrak markup existing** ke route baru + menambah `assetBase`/link navigasi, bukan membangun dari nol. §10.1 dan §10.3 baru perlu dibangun murni baru.

---

## 11. Alur Tambahan Diusulkan — Status Diperbarui (v3.0)

Menutup 12 gap dari analisis awal (§14). Setiap baris memakai kembali pola komponen yang sudah ada di 11 layar terdesain (§9). **Status per v3.0** disandingkan dengan audit langsung terhadap 12 file HTML yang sudah dibangun tim frontend (§16) — 6 dari 12 gap ternyata sudah dikerjakan, sebagian dengan pendekatan berbeda dari usulan awal (dicatat di kolom Status).

| # | Gap | Status | Solusi (diperbarui) |
|---|---|---|---|
| 11.1 | Tab "Reviews" kelas | ✅ **Sudah dibangun** | `course-details.html` `#tab-reviews` sudah berisi heading rating + daftar ulasan nyata (avatar, nama, rating, komentar) — sesuai usulan awal. Belum ada histogram 5★–1★ maupun filter urutkan — tambahan kecil, bukan gap struktural. |
| 11.2 | Katalog "Semua Kelas" | 🔴 **Bug + belum dibangun** | **Bug ditemukan:** tombol "Lihat Lainnya" di Home mengarah ke `#katalog` — anchor ini **tidak ada** di halaman manapun (link mati). **Keputusan (3 Sep 2026): dibangun sebagai halaman publik baru** `kelas.html` (bisa diakses tanpa login, untuk SEO — pola Udemy/Coursera: filter Kategori, Level, Harga di sidebar kiri + search + grid kartu, reuse `CourseCard`). Panel "Explore Kelas" di dashboard (§11.6) tetap ada sebagai versi in-app untuk Santri yang sudah login, tapi keduanya **harus berbagi satu sumber data kelas** — jangan duplikasi katalog independen. |
| 11.3 | State pembayaran gagal | 🔴 **Masih gap kritikal** | **Tidak ada fungsi/halaman sama sekali** di `main.js`/`payment-*.html` — dikonfirmasi ulang di audit v3.0. Riset pola Midtrans/Xendit (real-world Indonesian payment gateway) menunjukkan minimal 3 alasan gagal berbeda perlu copy spesifik: **kartu ditolak** (retryable — kode error tertentu minta coba lagi setelah jeda), **VA expired** (auto-cancel setelah jendela waktu, mis. 15 menit sesuai copy `checkout.html` sendiri), **QRIS timeout**. 4th state "Konfirmasi" — icon merah, pesan sesuai 3 skenario di atas, CTA "Coba Metode Lain" (→ Checkout) + "Hubungi Bantuan". |
| 11.4 | Halaman "Lihat Kuitansi" | ✅ **Sudah dibangun (sebagai modal)** | `payment-success.html` punya `#btn-open-receipt` yang membuka **modal** (`initReceiptModal()`) — bukan halaman terpisah seperti usulan awal. Pendekatan modal ini valid &amp; lebih ringan; PRD diperbarui mengikuti implementasi. |
| 11.5 | Dropdown navbar | ✅ **Sudah dibangun** | `index.html` sudah punya mega-dropdown penuh untuk "Video Kelas" &amp; "Bootcamp Intensif" (`initNavbarDropdowns()`) — kartu kategori + deskripsi, lebih detail dari usulan awal. |
| 11.6 | 6 menu sidebar dashboard | ✅ **Sudah dibangun — semua 7 panel** | `dashboard.html` membangun *seluruh* 7 view via `initDashboardHashRouter()` (Overview, Course Saya, Bootcamp Saya, Explore Kelas, Chat Mentor, Affiliate, Setting) — melebihi cakupan usulan awal (yang cuma menandai 6 sebagai gap). |
| 11.7 | "Chat Mentor Terkait" | ✅ **Sudah dibangun (sebagai modal)** | `initMentorChatModal()` di `classroom.html` — modal chat, bukan halaman terpisah. Konsisten dengan pola modal di §11.4. |
| 11.8 | Tab "Ringkasan" (Play Kelas) | ⚠️ Perlu verifikasi konten | Tab ada di `classroom.html` (`initClassroomTabs()`) — kedalaman konten belum diverifikasi baris-per-baris, prioritas rendah. |
| 11.9 | Tab "Review" (Play Kelas) | ⚠️ Perlu verifikasi konten | Sama seperti §11.8 — tab-nya ada, kedalaman konten belum diverifikasi. |
| 11.10 | "Lupa Password?" | 🔴 **Masih gap** | Link ada di `login.html` (`#btn-forgot-password`) tapi `href="javascript:void(0)"` — dead-end terkonfirmasi. Solusi: form email → layar "Cek email kamu, link reset sudah dikirim" → halaman set password baru (token dari link email) — pola 3 langkah standar, reuse `Input`/`Button` dari Design System §13. |
| 11.11 | Verifikasi email/OTP | 🔴 **Masih gap** | Tidak ada fungsi terkait OTP/verifikasi di `main.js`. Solusi: step baru antara Signup dan Dashboard — layar 6-digit OTP + timer kirim ulang 60 detik + link "Kirim ulang" setelah timer habis. **Perlu keputusan bisnis**: wajib untuk semua Santri, atau opsional (mengingat target SD–SMK mungkin belum punya email pribadi — pertimbangkan verifikasi via WhatsApp orang tua sebagai alternatif, lihat §15). |
| 11.12 | Tentang / Mentor / halaman legal | ✅ **Sudah dibangun (Tentang + Mentor)** | `tentang.html` &amp; `mentor.html` sudah ada, di luar dugaan awal PRD v2.x. Halaman legal (Kebijakan Privasi, Syarat &amp; Ketentuan) masih belum ada — footer link masih placeholder. |

---

## 12. Risiko &amp; Rekomendasi Konten Kurikulum

Layar "Kurikulum Kelas" (§9.3) menampilkan daftar chapter yang akan diisi konten sungguhan. Audit internal (Juli 2026) terhadap 49 dek kanonis milik Binar Academy — basis kurikulum flagship Crygle — menandai apa yang masih layak pakai dan apa yang berisiko usang.

| Chapter | Fokus | Status |
|---|---|---|
| 1 | Sejarah, Definisi UI/UX, Design Thinking | ✅ Evergreen — porsi perlu dipangkas (FGD 2022 belum dieksekusi) |
| 2 | UX Research, Metode Riset | ✅ Evergreen — siap pakai, tambahkan riset berbantuan AI |
| 3 | Define &amp; Ideate, Peralatan UI/UX | 🔴 Perlu dirombak — Adobe XD &amp; InVision Studio sudah mati |
| 4 | Prototype, Design System | ✅ Evergreen — ganti contoh tools jadi Figma-first |
| 5 | Testing, Design Handoff | 🟡 Perlu update — Zeplin &amp; Bit.dev bergeser sejak Figma Dev Mode |
| 6 | UX Writing, Redesign, Presentasi | 🟡 Perlu dibersihkan — ada instruksi operasional fasilitator yang nyasar ke materi murid |
| 7 | Studi Kasus, Portfolio | ✅ Evergreen — spot-check nama platform portofolio |
| 8 | SDLC, Manajemen Proyek, Scrum | 🟡 Perlu dipangkas — terlalu padat (92–97 slide/topik) |
| 9–11 | Final Project | 🔴 Tidak bisa dipakai langsung — masih rujuk aplikasi internal Binar (BinarGO) |

**Tiga prioritas mendesak:**
1. **Tools mati** — keluarkan Adobe XD, InVision Studio, Yammer, Google Hangouts, Quip dari daftar aktif; jadikan Figma tools utama di seluruh alur (termasuk handoff via Dev Mode).
2. **AI nyaris tidak dibahas** — riset industri 2026 menyebut 91% desainer memakai AI mingguan, tapi topik ini nyaris kosong di 49 dek. Perlu modul baru: riset berbantuan AI, generative wireframing, AI untuk UX writing, batas etisnya.
3. **Aksesibilitas cuma numpang lewat** — belum ada topik WCAG, kontras warna, navigasi keyboard, screen reader sebagai materi berdiri sendiri.

Progres redesain Figma kurikulum (file terpisah "Bab 1 — Mengenal Dunia UI/UX Design") baru menuntaskan satu halaman untuk 3 sub-topik pertama Chapter 1 — sudah menjawab satu poin FGD 2022 (gabungkan Sejarah + Definisi + Kepentingan UI/UX jadi satu unit). Arah ini tepat untuk dilanjutkan ke chapter lain, terutama Chapter 5 &amp; 6 yang isinya banyak duplikasi antar-chapter.

> ⚠️ **Implikasi untuk §9.3 —** jangan populate layar Kurikulum Kelas dengan konten chapter mentah dari materi Binar lama tanpa melalui revisi ini. Prioritaskan chapter yang sudah evergreen (1, 2, 4, 7) untuk kelas yang tayang lebih dulu.

---

## 13. Sistem Desain — Token Resmi &amp; Inventaris Komponen ✅ SUMBER: DESIGN SYSTEM RESMI

> Seluruh isi §13 ditranskrip dari [CRYGLE Academy Design System ↗](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf) (Claude Design, akses dikonfirmasi 3 Sep 2026) — **bukan lagi observasi visual dari screenshot** seperti versi PRD sebelumnya. Ini token yang boleh langsung dipakai AI agent untuk coding (CSS variables sudah ada di `tokens/*.css` dalam paket design system tersebut).

### 13.1 Warna

| Token | Nilai | Peran |
|---|---|---|
| Blue 500 (brand) | `rgb(35,95,156)` / `#235F9C` | Nav active state, heading section, filled CTA, bar accordion, ground footer — mengerjakan hampir semua hal |
| Blue Deep | `rgb(38,98,158)` / `#26629E` | Ground gelap kedua — band "Hasil Karya Alumni" |
| Yellow 500 (aksen) | `rgb(252,193,18)` / `#FCC112` | **Aksen ketat** — halaman di dalam mark buku, rating bintang, glyph kontak footer. Tidak dipakai di tempat lain. |
| Page background | `rgb(247,251,255)` / `#F7FBFF` | Ground utama — nyaris putih, bukan putih murni |
| Soft band | `rgb(241,246,252)` / `#F1F6FC` | Section band alternatif |
| Card body | `rgb(252,252,252)` / `#FCFCFC` | Isi card |
| Teks body | Black `rgb(32,32,32)` | — |
| Teks sekunder | Grey 500 | — |
| Teks meta/placeholder | Grey 400 / Grey 300 | — |
| Teks di atas biru | Blue 100 | — |

Blue, Yellow, Grey, Success, dan Danger masing-masing punya ramp 5 langkah (100 → 500). Grey menambah satu step Black. Hanya dua ground gelap yang ada di seluruh produk: Blue 500 dan Blue Deep.

### 13.2 Tipografi

**Satu keluarga font untuk seluruh produk: SF UI Text** (bukan mix beberapa sans seperti dugaan awal) — tanpa serif, tanpa mono, tanpa display face terpisah. Weight terbatas ke **400/500/600/700** saja.

| Step | Ukuran | Line-height |
|---|---|---|
| Display 1–3 | 64 / 56 / 48px | 110% |
| Heading 1–4 | 42 / 32 / 26 / 24px | H1 di 110%, sisanya 120% |
| Subheading 1–2 | 20 / 18px | 140% |
| Paragraph 1–2 | 16 / 14px | 140% |
| Label 1–2 | 12 / 10px | 140% |

Display &amp; heading pakai tracking −0.01em; nav dan label kecil −0.02em. Prosa deskripsi kelas panjang di-*justify* (`text-align: justify`) — tidak umum, tapi memang begitu di file sumber.

> ⚠️ **Lihat §5.4** — ada frame di `/Prototype` yang masih memakai Roboto, bukan SF UI Text. Status: belum dikonfirmasi tim, jangan diasumsikan sebagai desain final.

### 13.3 Spacing, Radius &amp; Elevation

- **Page frame** — kanvas 1440px, konten 1200px, gutter 120px, jarak antar-band marketing 100px. Di dalam band: 50px antara heading block dan konten, 24–32px di dalam card, 12–20px antar teks bertumpuk.
- **Corner radii** — 4px (pill diskon), 8px (semua tombol), 12px (accordion &amp; panel lembut), 20px (badan card), 20.497px (thumbnail course card — nilai off-grid, dipertahankan verbatim), 24px (hero media), 50px (CTA pill marketing).
- **Card** — putih `#FCFCFC`, radius 20px, tanpa border, shadow ganda sangat lembut: `0 55px 70px rgba(0,0,0,.03)` + `0 55px 90px rgba(0,0,0,.03)` — blur besar, opacity nyaris nol, kesan "mengambang" bukan "terangkat". Body course card menumpuk ~38px di atas gambar, jadi thumbnail terlihat seperti alas di belakang card.
- **Shadow CTA** — `0 4px 20px rgba(0,0,0,.18)` untuk pill putih ("Masuk"), `0 4px 20px rgba(35,95,156,.18)` untuk pill biru ("Daftar").
- **Border** — hairline 1px `#DFE5EE` (edge default), 2px (tombol sekunder), 1px `#E9E9E9` (form field), 2px `#D8E5F1` (garis testimoni), 1px `#C4D5E8` (garis footer di atas biru).

### 13.4 Interaksi &amp; State (tombol)

Satu-satunya elemen yang state-nya terdokumentasi penuh di file sumber:
- **Hover** — fill primer menerang (Blue 500 → Blue 300), bukan menggelap. Ghost style memakai tint lembut `#F1F6FC`.
- **Press** — mengendap di Blue 400.
- **Focus** — ring inset 2px `rgba(17,17,17,.5)`.
- **Disabled** — fill primer diganti border grey, atau seluruh kontrol turun ke opacity 50%.
- Tidak ada scale/shrink saat ditekan. Tidak ada timing animasi eksplisit — crossfade opacity/warna ~120ms adalah default yang wajar (dan yang dipakai paket komponen). Chevron accordion berotasi saat expand.

### 13.5 Ikonografi

Satu keluarga utama: **Huge Icons**, ditulis di file dengan path lengkap (mis. `Huge-icon/education/outline/idea`). Outline adalah default (~0.75–1.5px stroke, kotak 24px); solid dipakai khusus untuk search, star, ikon sosial, dan check-rectangle. Ikon mewarisi warna teks sekitarnya — Blue 500 di latar terang, Yellow 500 di footer biru, putih di Blue Deep. Ukuran: 24px (baris konten &amp; nav), 20px (tombol medium/large), 16px (tombol small, bintang course card), 12px (tombol extra-small).

35 glyph dalam-cakupan sudah diekstrak jadi data (`assets/icons/icon-data.js`) — **tidak pakai CDN icon library**. Glyph "nyasar" dari set lain yang tetap dipertahankan karena dipakai file sumber: `mingcute:book-6-fill` (mark brand), `ep:arrow-right-bold` (panah carousel testimoni), `icon-park-solid:play` (badge play hero), `flat-color-icons:google` (tombol login Google), Iconly (lonceng notifikasi).

### 13.6 Inventaris Komponen (58 family, sudah dibangun di Design System)

| Kategori | Komponen | Dipakai di layar (§9) |
|---|---|---|
| Core | `Button`, `Logo`, `SectionHeading` | Semua layar |
| Navigation | `NavBar`, `Footer` | Semua layar |
| Disclosure | `Accordion`, `AccordionFAQItems`, `AccordionsAnswer`, `AccordionsContent` | FAQ Home §9.1, Kurikulum Kelas §9.3, sidebar Play Kelas §9.12 → reuse Tugas Bootcamp §10.5 |
| Commerce | `CourseCard`, `Rating`, `DiscountTag` | Home §9.1, Course Details §9.2–4, Dashboard §9.11 → reuse Katalog §11.2, Bootcamp Landing §10.1 |
| Forms | `Input`, `Checkbox` | Checkout §9.5, Login/Signup §9.9–10 |
| Media | `Avatar`, `AvatarStack`, `AvatarNotificationDot`, `Progress`, `PlayBadge` | Dashboard §9.11, sidebar Play Kelas §9.12 → reuse Tracker Bootcamp §10.4, Reviews §11.1/§11.9 |

Komponen di atas adalah set **hand-authored** resmi milik CRYGLE. Paket yang sama juga membawa komponen **imported** dari `buildwithangga.com` &amp; `easy-course-buy.lovable.app` (§5.3) — dipertahankan untuk fidelitas terhadap file sumber, tapi ⚠️ **jangan dipakai untuk kerja baru**; pakai komponen hand-authored di atas.

### 13.7 Status implementasi

Design System resmi sudah membangun satu **click-through prototype** (`ui_kits/academy-web/`) untuk alur Home → Course Details → Login/Checkout. Layar yang **belum** direplikasi ke kit komponen: 3× Konfirmasi (§9.6–8), 02-Signup (§9.10), Kelas Saya (§9.11), Play Kelas (§9.12), dan seluruh alur usulan §10–§11 — semua ini masih perlu dibangun dari token &amp; komponen di atas.

### 13.8 Higiene file Figma (belum diperbaiki)
- Banyak instance bernama generic ("Frame 1321314831", "Group") berulang tanpa rename.
- Label layer beberapa radio metode bayar tidak sinkron dengan teks tampil.
- Placeholder trailer video di Course Details masih memakai layer bernama "BWA Class" — tanda konten asli belum di-final-kan.
- 2 ikon (`VuesaxLinearArrowDown`, `VuesaxLinearUser`) tidak punya geometri valid di source — render kosong.

---

## 14. Gap Analysis — Ringkasan Status (diperbarui v3.1 setelah 2 putaran perbaikan langsung di situs statis live)

| # | Item | Dampak | Status v3.1 | Ref |
|---|---|---|---|---|
| 1 | Tab "Reviews" kelas | 🟡 Medium | ✅ Selesai | §11.1 |
| 2 | Halaman katalog "Semua Kelas" | 🟠 High | ✅ Selesai — `kelas.html` (10 kelas, filter kategori), bug link mati diperbaiki | §11.2 |
| 3 | State pembayaran gagal | 🔴 **Critical** | ✅ Selesai — `payment-failed.html` + toggle Sandbox Mode di Konfirmasi Review | §11.3 |
| 4 | Halaman "Lihat Kuitansi" | ⚪ Low | ✅ Selesai (sbg modal) | §11.4 |
| 5 | Submenu dropdown navbar | 🟡 Medium | ✅ Selesai | §11.5 |
| 6 | 6 menu sidebar dashboard | 🟠 High | ✅ Selesai (7/7 panel) | §11.6, §10 |
| 7 | UI "Chat Mentor Terkait" | 🟡 Medium | ✅ Selesai (sbg modal) | §11.7 |
| 8 | Tab "Ringkasan" &amp; "Review" kosong | ⚪ Low | ✅ Diverifikasi langsung dari `classroom.html` — kontennya lengkap (4 key takeaway + 1 review + form ulasan), bukan kosong | §11.8–9 |
| 9 | "Lupa Password?" | 🟡 Medium | ✅ Selesai — `lupa-password.html` | §11.10 |
| 10 | Verifikasi email/OTP | 🟡 Medium | ✅ Selesai — `verifikasi-otp.html`, disisipkan ke alur Signup | §11.11 |
| 11 | Duplikasi frame "01 Login" | ⚪ Low | ⚪ Belum dicek (housekeeping Figma) | Hapus/rename di file Figma |
| 12 | Halaman Tentang/Mentor/legal | 🟡 Medium | ✅ Selesai — Tentang &amp; Mentor sudah ada, Privasi/S&amp;K baru dibangun (`privasi.html`, `syarat-ketentuan.html`) | §11.12 |

**Ringkasan v3.1:** Ke-12 gap dari v1.0 sekarang tuntas (11 ✅, 1 ⚪ housekeeping Figma non-kode). Plus 2 temuan baru selama audit yang juga sudah ditutup: **Bootcamp Landing publik** (§10.1, `bootcamp.html`) dan **Join WA sebagai step terpisah** (§10.3, `bootcamp-join.html`) — keduanya bukan bagian dari 12 gap asli tapi flagged di §16.1/§16.4 sebagai 🔴. Juga ditemukan &amp; diperbaiki: link navbar/footer "Bootcamp Intensif" di 10 halaman salah arah ke `#program-section` (section "Rangkaian Program" generik, bukan konten Bootcamp).

> ⚠️ **Tetap perlu keputusan manusia di level bisnis, bukan lagi soal UI yang hilang** — §11.3 (aturan kapan status pembayaran benar-benar dianggap gagal oleh payment gateway sungguhan), §11.11 (kewajiban OTP untuk target usia SD–SMK — implementasi UI-nya sudah ada, tinggal keputusan apakah wajib atau opsional), dan §12 (konten kurikulum) levelnya bisnis/konten. Halaman Kebijakan Privasi &amp; Syarat &amp; Ketentuan berisi draf standar — **wajib direview tim legal/bisnis sebelum dianggap final**, bukan dokumen hukum yang sudah disahkan.

---

## 15. Ide Ekspansi Masa Depan: B2B Sekolah/Instansi 💭 IDEATION

> **Ini murni ideation, bukan temuan dari desain atau dokumen tim.** Perlu divalidasi dengan tim bisnis &amp; sekolah mitra sebelum masuk roadmap resmi.

Branding "Crygle Academy x Boarding School" (§2) tersirat sebagai kemitraan B2B2C, tapi seluruh 11 layar yang ada murni alur B2C individual (satu siswa, satu akun, satu checkout). Tiga arah yang layak dieksplorasi:

- **Portal Admin Sekolah** — pendaftaran massal satu angkatan sekaligus, dashboard progress belajar per siswa teragregasi per kelas/asrama, laporan berkala ke wali kelas. Memakai pola progress-bar &amp; card yang sama seperti Dashboard siswa (§9.11), di-scope ke banyak siswa sekaligus.
- **Skema Harga Institusi** — lisensi tahunan per sekolah atau block-booking per angkatan, terpisah dari alur Checkout individual (§9.5) yang sudah ada — kemungkinan butuh flow "invoice ke sekolah" alih-alih kartu/VA per siswa.
- **Integrasi Rapor Digital** — menyambungkan Progress Belajar (§9.11) &amp; Leaderboard Bootcamp (§10.6) ke sistem akademik sekolah mitra — nilai tambah nyata untuk model sekolah asrama yang biasanya sudah punya sistem rapor sendiri.

---

## 16. Audit Implementasi Frontend &amp; Peta Migrasi ✅ BARU (v3.0)

Section ini adalah hasil evaluasi langsung terhadap frontend statis (HTML/CSS/JS) yang sudah dibangun tim lain di folder proyek `Crygle Acadey Website/`, dibandingkan dengan spesifikasi PRD ini. Tujuannya: jadi **satu sumber kebenaran** sebelum migrasi ke arsitektur final (React/Next.js + Design System resmi §13), dan jadi blueprint langsung untuk diagram FigJam (§16.4).

### 16.1 Status per halaman

| File | Layar PRD | Status | Catatan audit |
|---|---|---|---|
| `index.html` | Home Page (§9.1) | ✅ Lengkap | 9 section sesuai PRD; navbar dropdown (§11.5) &amp; testimonial slider berfungsi. Bug "Lihat Lainnya" → `#katalog` **diperbaiki**, sekarang → `kelas.html` (§11.2). |
| `login.html` | 01 Login (§9.9) | ✅ Lengkap | Form &amp; Google SSO lengkap. "Lupa Password?" sekarang mengarah ke `lupa-password.html` nyata (§11.10). |
| `signup.html` | 02 Signup (§9.10) | ✅ Lengkap | Form lengkap (4 input + T&amp;C). Sekarang mengalir ke `verifikasi-otp.html` sebelum Dashboard (§11.11), bukan langsung asumsi berhasil. |
| `course-details.html` | Course Details (§9.2–4) | ✅ Lengkap | 4 tab: Overview, Kurikulum Kelas, Tentang Mentor, **Reviews (§11.1)**. |
| `checkout.html` | Checkout (§9.5) | ✅ Lengkap | Stepper + 5 metode bayar + kode promo lengkap. |
| `payment-review.html` | Konfirmasi Review (§9.6) | ✅ Lengkap + tambahan | Ditambah toggle **Sandbox Mode** (Berhasil/Gagal) supaya alur pembayaran gagal bisa direview on-demand (§11.3). |
| `payment-processing.html` | Konfirmasi Processing (§9.7) | ✅ Lengkap | Copy "Sanctuary" brand voice sudah dipakai (§5.1). Redirect sekarang bercabang ke Berhasil/Gagal sesuai pilihan Sandbox Mode, bukan selalu ke Berhasil. |
| `payment-success.html` | Konfirmasi Berhasil (§9.8) | ✅ Lengkap + tambahan | "Lihat Kuitansi" dibangun sebagai modal (§11.4) — melebihi spesifikasi awal. |
| `dashboard.html` | Kelas Saya (§9.11) | ✅ Lengkap + tambahan | Ke-7 panel sidebar dibangun (§11.6) via hash router — jauh melebihi cakupan PRD v1–2. Termasuk Bootcamp Saya (§10) sebagai 4 sub-tab (masih 🟡, lihat §10 &amp; §16.3). |
| `classroom.html` | Play Kelas (§9.12) | ✅ Lengkap + tambahan | Video player custom, accordion modul, Chat Mentor modal (§11.7). Tab Ringkasan/Review **diverifikasi** (§11.8–9) — kontennya lengkap. |
| `mentor.html` | *(tidak ada di PRD asli)* | ✅ Dibangun | Sesuai usulan §11.12 — halaman baru di luar 12 layar Figma asli. |
| `tentang.html` | *(tidak ada di PRD asli)* | ✅ Dibangun | Sesuai usulan §11.12. |
| `kelas.html` | Katalog publik "Semua Kelas" | ✅ Dibangun (v3.1) | §11.2 — 10 kelas nyata (6 dari Home + 4 unik dari panel Explore Kelas dashboard), filter 4 kategori. |
| `payment-failed.html` | Payment Failed | ✅ Dibangun (v3.1) | Gap kritikal §11.3 — sekarang ditutup, mirror struktur visual `payment-success.html` dengan token `--color-danger`. |
| `lupa-password.html` | Reset Password | ✅ Dibangun (v3.1) | §11.10 — 2 state (form + konfirmasi terkirim). |
| `verifikasi-otp.html` | Verifikasi OTP | ✅ Dibangun (v3.1) | §11.11 — 6 digit OTP dengan auto-advance, resend cooldown 30s. |
| `bootcamp.html` | Bootcamp Landing (publik) | ✅ Dibangun (v3.1) | §10.1 — 3 track ditampilkan (Fullstack UI/UX, Frontend Web, 3D Environment &amp; Motion), sama seperti mega-dropdown navbar `index.html`. |
| `bootcamp-join.html` | Join WA (step terpisah) | ✅ Dibangun (v3.1) | §10.3 — 3 langkah (akun → checkout → grup WA cohort). |
| `privasi.html`, `syarat-ketentuan.html` | Halaman legal (Privasi, S&amp;K) | ✅ Dibangun (v3.1) | §11.12 — draf standar, **perlu review tim legal** sebelum final. |

### 16.2 Temuan tambahan di luar cakupan PRD sebelumnya
- **Istilah "Santri/Santriwati"** dipakai konsisten di beberapa layar — sekarang diformalkan (§4).
- **Pola modal** dipakai berulang untuk fitur sekunder (Kuitansi, Chat Mentor) alih-alih halaman terpisah — pola yang valid &amp; efisien, PRD ini mengikuti pendekatan tersebut untuk §11.4 &amp; §11.7.
- **`initDashboardHashRouter()`** di `main.js` — dashboard sudah jadi SPA ber-hash-route (`#overview`, `#course-saya`, dst.) sebelum framework apapun dipasang — sinyal kuat bahwa migrasi ke Next.js App Router (routing berbasis file) akan jadi peningkatan natural, bukan perubahan arsitektur asing.

### 16.3 Kesiapan migrasi (ringkas — bukan rencana teknis penuh)
Stack saat ini: HTML/CSS/JS statis (`styles/*.css`, `scripts/main.js`), token warna sudah dekat dengan Design System resmi (§13.1) tapi belum identik (radius, shadow, font-scale berbeda — lihat catatan versi 2.0). Tiga hal yang mengurangi beban migrasi ke React/Next.js (§13, stack disepakati sebelumnya):
1. Struktur per-fungsi di `main.js` (satu `init...()` per fitur) map hampir 1:1 ke komponen React yang akan dibuat.
2. Komentar `<!-- Node XXXX:YYYY -->` di tiap file HTML mempermudah verifikasi ulang ke Figma saat porting.
3. Bagian Bootcamp Intensif (§10) sudah py markup benar, tinggal diekstrak ke route terpisah (§10 catatan migrasi).

Rencana teknis detail (folder structure, urutan migrasi per halaman, penanganan `main.js` → komponen) di luar cakupan dokumen ini — akan jadi implementation plan terpisah setelah PRD &amp; diagram FigJam ini disepakati.

### 16.4 Peta alur master — sumber untuk diagram FigJam

Tujuh kelompok alur berikut adalah struktur langsung yang dipetakan ke board FigJam (§16.5). Warna status: 🟢 selesai · 🟡 sebagian/perlu verifikasi · 🔴 belum dibangun/gap.

1. **Marketing → Discovery** — Home 🟢 → (Explore Kelas / kartu Kelas Populer / Lihat Lainnya 🟢→) Katalog Publik 🟢 → Course Details 🟢 (tab Overview/Kurikulum/Mentor/Reviews, semua 🟢)
2. **Autentikasi** — Login 🟢 ⇄ Signup 🟢 → Lupa Password 🟢 → Verifikasi OTP 🟢 → Dashboard
3. **Commerce** — Course Details "Mulai Belajar" → Checkout 🟢 → Konfirmasi Review 🟢 (+ toggle Sandbox Mode 🟢) → Processing 🟢 → **cabang:** Berhasil 🟢 (+ Lihat Kuitansi 🟢 modal) **atau** Gagal 🟢
4. **Dashboard &amp; Learning** — Dashboard 🟢 (7 panel, semua 🟢) → kartu kelas → Classroom 🟢 (player, syllabus, Chat Mentor 🟢 modal, tab Resources 🟢/Ringkasan 🟢/Review 🟢)
5. **Bootcamp Intensif** — Landing 🟢 → Booking Konsultasi 🟡 → Join WA 🟢 (step terpisah, `bootcamp-join.html`) → Jadwal&amp;Absensi 🟡 → Tugas&amp;Quiz 🟡 → Leaderboard 🟡 *(🟡 = masih sub-tab dalam panel dashboard "Bootcamp Saya" — arsitektur "6 halaman terpisah penuh" tetap target migrasi Next.js, §16.3, bukan gap fungsional; sudah bisa diakses &amp; dipakai apa adanya)*
6. **Halaman info statis** — Navbar/Footer → Mentor 🟢 · Tentang 🟢 · Kebijakan Privasi 🟢 · Syarat &amp; Ketentuan 🟢
7. **Ekspansi B2B (§15)** — 💭 belum ada implementasi apapun, tetap murni ideation di diagram (ditandai jelas terpisah)

> **Catatan v3.1:** diagram FigJam di §16.5 digambar berdasarkan status v3.0 (sebelum 2 putaran perbaikan di atas) — warnanya belum mencerminkan status 🟢 terbaru. Perlu digambar ulang kalau diagram akan dipakai untuk presentasi/handoff berikutnya.

### 16.5 Diagram FigJam — status: ✅ dibuat

Diagram flowchart 7 kelompok di atas sudah digambar langsung di board FigJam yang disediakan user: **[Peta User Flow &amp; Fitur — Crygle Academy ↗](https://www.figma.com/board/JoA7Gvz89pjGJFIVFYHLXt/Untitled?node-id=0-1)** (dibuat 3 Sep 2026, via Figma MCP `generate_diagram`). Legenda warna sesuai §16.4. Tata letak otomatis dari Mermaid — kalau perlu dirapikan manual (drag-and-drop antar cluster), itu perlu dilakukan langsung di FigJam (di luar kemampuan tool generate).

## 17. Lampiran

### A. Sumber internal
- Figma: [Research Web Academy (Copy)](https://www.figma.com/design/ueGJd0omZ8gQNmGvAaz9G2/Research-Web-Academy--Copy-?node-id=735-1568) — page "Prototype" (`735:1568`), 11 layar (§7, §9); page "Design-System" (`467:326`) belum ditelusuri langsung oleh PRD ini, hanya lewat ekstraksi §B
- **[CRYGLE Academy Design System](https://claude.ai/design/p/d21a7fbc-41df-41a5-9ad8-4fa47db01baf)** (Claude Design, dibagikan user 3 Sep 2026) — dasar §5.1, §5.4, §13 seluruhnya; berisi token CSS resmi, 58 komponen siap pakai, dan click-through prototype `ui_kits/academy-web/`
- Screenshot catatan tim (dikirim user, 2 Sep 2026) — dasar §10 Alur Bootcamp Intensif
- `Outline Lanjutan Section 1 - Apa Itu UI dan UX Design.md` &amp; `Outline Sejarah UI-UX Design - Point 2.md` — dasar §2, §12
- `Audit Relevansi Materi UI-UX Binar Academy untuk Crygle Academy.docx` (Juli 2026) — dasar §12
- **12 file HTML frontend** (`Crygle Acadey Website/*.html` + `scripts/main.js` + `styles/*.css`) dibangun tim lain, diaudit langsung 3 Sep 2026 — dasar §16 seluruhnya

### B. Sumber riset eksternal (dicek September 2026)
- [Binar Academy — Bootcamp UI/UX Research &amp; Design](https://www.binar.co.id/ui-ux-design-1)
- [BuildWithAngga (BWA)](https://buildwithangga.com/)
- [Sanbercode — Katalog Bootcamp Online](https://sanbercode.com/bootcamp-katalog)
- [Xendit — Virtual Account expiration](https://help.xendit.co/hc/en-us/articles/360032276451-What-is-Expiration-Date-and-how-do-I-set-it) &amp; [Card declines and error codes](https://docs.xendit.co/credit-cards/understanding-card-declines) — dasar copy state Pembayaran Gagal §11.3
- [Udemy — How to Search for Courses](https://support.udemy.com/hc/en-us/articles/115012244007-How-to-Search-for-Courses-on-Udemy) — dasar pola filter Katalog §11.2 (kategori, level, harga, rating)

### C. Riwayat Dokumen

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 2 Sep 2026 | Draf awal — analisis penuh 11 layar Figma, peta alur, spesifikasi layar, gap analysis. |
| 2.0 | 2 Sep 2026 | Ditambah: konteks kurikulum &amp; boarding school (§2), strategi brand &amp; positioning vs. 3 kompetitor riil (§5), alur Bootcamp Intensif lengkap (§10), 12 solusi gap-fill (§11), risiko konten kurikulum (§12), ideation ekspansi B2B sekolah (§15). Dipublikasikan sebagai artifact HTML interaktif. |
| 2.1 | 2 Sep 2026 | Dikonversi ke format Markdown tunggal untuk keperluan handoff ke AI agent development &amp; design. Ditambahkan sistem label status (§0) dan tabel inventaris komponen (§13). |
| 2.2 | 3 Sep 2026 | Disinkronkan dengan **Design System resmi** yang ditemukan di Claude Design — §5 &amp; §13 ditulis ulang total dari rekonstruksi spekulatif menjadi token &amp; voice-guide resmi (warna, tipografi SF UI Text, spacing/radius/shadow, 58 komponen, ikonografi Huge Icons). Ditambahkan: model bisnis "LEVEL UP" &amp; syarat sertifikat rata-rata ≥80 (§2), konfirmasi hard-evidence BuildWithAngga + temuan baru easy-course-buy.lovable.app sebagai library yang di-*import* langsung ke Figma (§5.3), dan pertanyaan terbuka soal typeface Roboto vs. SF UI Text yang diwariskan dari sesi Design System sebelumnya (§5.4). |
| 3.0 | 3 Sep 2026 | **Audit langsung terhadap 12 halaman frontend** yang sudah dibangun tim lain (§16, baru) — 6 dari 12 gap v1.0 ternyata sudah selesai (kadang dengan pendekatan lebih baik: modal alih-alih halaman terpisah), 1 bug baru ditemukan (link "Lihat Lainnya" mati), 3 gap kritikal terkonfirmasi masih terbuka (pembayaran gagal, lupa password, verifikasi OTP). Diformalkan istilah **"Santri/Santriwati"** (§4). Diputuskan: katalog jadi halaman publik baru, Bootcamp Intensif tetap 6 halaman terpisah (bukan konsolidasi panel). §11 &amp; §14 ditulis ulang dengan status per-item. Ditambahkan riset pola Midtrans/Xendit &amp; Udemy untuk memperkuat spesifikasi §11.2–3. Disiapkan §16.4 sebagai blueprint langsung untuk diagram user-flow di FigJam. |

---

## 18. Perluasan Multi-Role & Sistem Sertifikat 🆕 DIUSULKAN — belum diimplementasikan

> **Dokumen lengkap:** [`Crygle-Academy-Flow-Expansion-Spec.md`](./Crygle-Academy-Flow-Expansion-Spec.md) (v1.0, 5-6 September 2026). Section ini cuma ringkasan + indeks — jangan duplikasi detail di sini, PRD ini tetap jadi satu-satunya indeks utama proyek.

Hasil brainstorming arsitektural (skill `superpowers:brainstorming` + `ui-ux-pro-max` + riset kompetitor Coursera/IBM SkillsBuild), dipicu permintaan pengguna untuk memperdalam flow existing dan memetakan role yang belum pernah ada. **Sudah melalui audit anti-halu penuh** — setiap klaim "data sudah ada" dicek langsung ke kode, ~15 kesalahan sitasi/asumsi ditemukan &amp; diperbaiki selama proses (lihat riwayat commit `Crygle-Academy-Flow-Expansion-Spec.md`).

Ringkasan isi:
- **Audit ulang diagram FigJam** — 20 dari 21 gap lama sudah tertutup oleh kerja sesi-sesi sebelumnya (§14 di atas); update terbaru digambar di board FigJam yang sama.
- **Sistem Sertifikat** (kelas &amp; bootcamp) — kredensial digital + halaman verifikasi publik tanpa login. **Ini permintaan klien asli yang tertunda**, bukan usulan baru (lihat catatan tim 5 Sep 2026).
- **Dashboard Peserta diperdalam** — Course Learning Hub (sidebar progress menggantikan harga untuk kelas yang sudah dibeli), Bootcamp Overview (lapisan ringkasan sebelum masuk sub-tab), Overview dengan 6 widget baru.
- **Role baru: Mentor Portal** (9 layar) &amp; **Admin Console** (11 layar) — saat ini kedua role ini sama sekali tidak punya representasi kerja apapun di platform, cuma data statis.
- **Roadmap 6 fase** (Fase 0 diagram → Fase 5 Admin lanjutan) &amp; **5 keputusan bisnis** yang perlu divalidasi sebelum build (skema payout mentor, consent orang tua untuk sertifikat publik, dll.) — levelnya sama seperti disiplin ⚠️ di §14.

**Status:** draf disetujui untuk lanjut ke `writing-plans` (rencana implementasi TDD per fase), belum ada satupun baris kode yang diubah untuk ini.

---

*Dokumen ini disusun dari reverse-engineering desain Figma + dokumen kerja internal tim + audit langsung terhadap frontend yang sudah dibangun, bukan spesifikasi resmi dari product owner. Semua item berlabel 🆕, 🔴, dan 💭 wajib direview manusia sebelum dieksekusi.*
