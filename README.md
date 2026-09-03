# Crygle Academy — Digital Learning & Mentor Studio

Platform ekosistem pembelajaran desain grafis, UI/UX, dan 3D animation berbasis kurikulum industri dan pendampingan mentor praktisi profesional bagi siswa sekolah asrama (*boarding school*), SMK, dan santri digital.

---

## 🌟 Fitur Utama Website & Dashboard

1. **Landing Page Interaktif (`Crygle Acadey Website/index.html`)**:
   - Hero Section, Program Switcher (Mandiri vs Bootcamp), Alur Belajar, FAQ Accordion, Testimonial Slider, dan Navigasi Sticky Blur.
2. **Detail Kelas & Kurikulum (`course-details.html`)**:
   - Tab navigasi (*Deskripsi, Kurikulum, Mentor, Ulasan*), accordion modul silabus, dan pemesanan kelas.
3. **Alur Checkout & Pembayaran Multi-Payment (`checkout.html` s.d. `payment-success.html`)**:
   - Pilihan metode Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan QRIS Instan.
   - Perhitungan diskon kupon otomatis (`CRYGLE50`, `BOSSMUDA`), timer countdown 24 jam, dan invoice resmi `#INV-20260903-882`.
4. **Dashboard Peserta / LMS Lengkap (`dashboard.html`)**:
   - **Overview Belajar**: 4 Bento KPI metrik jam belajar, resume belajar, jadwal mentoring Google Meet, dan grafik mingguan.
   - **Course Saya**: Katalog kelas aktif dengan progress bar dinamis.
   - **Bootcamp Saya (Sanbercode Model)**: Spreadsheet jadwal & absensi, booking konsultasi mentor 1-on-1, pengumpulan tugas & quiz, serta leaderboard santri.
   - **Explore Kelas**: Katalog lengkap dengan filter kategori chip dan promo voucher.
   - **Chat Konsultasi Mentor**: Workspace chat real-time dengan mentor dan asisten asrama.
   - **Program Affiliate Santri**: Referral code unik `CRYGLE-DION-SMK` dengan sistem komisi dan leaderboard teman.
   - **Pengaturan Akun**: Manajemen profil santri, akademik, dan sekolah asrama.
5. **Ruang Belajar Interaktif (`classroom.html`)**:
   - Video player kontrol penuh, silabus modul interaktif, dan tombol langsung konsultasi mentor.

---

## 📂 Struktur Direktori Proyek

```
CRIGLE STUDIO MENTOR/
├── Crygle Acadey Website/          # Source Code Web & Dashboard
│   ├── index.html                  # Landing Page
│   ├── course-details.html         # Halaman Detail Kelas UI/UX
│   ├── checkout.html               # Form Checkout Pembayaran
│   ├── payment-review.html         # Konfirmasi Review Pesanan
│   ├── payment-processing.html     # Status Menunggu Pembayaran
│   ├── payment-success.html        # Status Sukses & Invoice Modal
│   ├── dashboard.html              # Dashboard Peserta (7 Panel Interaktif)
│   ├── classroom.html              # Ruang Belajar & Pemutar Modul
│   ├── styles/                     # CSS Modular (fonts, variables, main, components, dashboard)
│   ├── scripts/                    # main.js (Router, Controller, & Dynamic Handlers)
│   ├── images/                     # Asset Gambar & Cover Kelas
│   ├── icon/                       # Logo & Icon Resmi Brand
│   ├── font typhography/           # Tipografi Resmi SF UI Text
│   └── PRD/                        # Dokumen Spesifikasi Produk (PRD v2.1)
├── MATERI BINAR ACADEMY/           # Materi Referensi Kurikulum Desain & Riset UI/UX
├── MATERI PAK DIMAS/               # Bahan Ajar & Modul Praktisi Mentor
├── .opencode/                      # Skill Desain & Standar Desain Sistem
├── README.md                       # Dokumentasi Proyek
└── .gitignore                      # Git Ignore Rule
```

---

## 🚀 Cara Menjalankan Secara Lokal

1. Clone repository ini:
   ```bash
   git clone https://github.com/hamzahikhsan/crygle-academy-website.git
   ```
2. Buka direktori website:
   ```bash
   cd "Crygle Acadey Website"
   ```
3. Jalankan server lokal sederhana (misal menggunakan Python):
   ```bash
   python -m http.server 8088
   ```
4. Buka browser di [http://localhost:8088](http://localhost:8088)

---

## 🎨 Design Tokens & Standar Sistem
- **Primary Brand Color**: `#235F9C` (Blue 500)
- **Accent Color**: `#FCC112` (Yellow 500)
- **Success Color**: `#31BC53` (Green 500)
- **Soft Background**: `#F1F6FC`
- **Dark Neutral**: `#202020`
- **Typography**: Apple SF UI Text (Regular, Medium, Semibold, Bold, Heavy)
