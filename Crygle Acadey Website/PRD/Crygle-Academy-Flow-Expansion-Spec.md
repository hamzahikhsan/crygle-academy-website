# Crygle Academy — Spesifikasi Perluasan Flow & Sistem Multi-Role

**Versi:** 1.0 (Draft untuk direview) · **Tanggal:** 5 September 2026
**Ditulis dengan:** `superpowers:brainstorming` (arsitektural) + `ui-ux-pro-max` (product/ux domain) + riset kompetitor + audit ulang diagram FigJam
**Status:** 💭 Draft brainstorming — belum diimplementasikan. Dokumen ini adalah hasil analisis, bukan kode. Perlu direview dulu sebelum masuk `writing-plans`.

---

## 0. Cara Membaca Dokumen Ini

Dokumen ini adalah **lapisan baru di atas** `Crygle-Academy-PRD.md` (v3.1) — bukan pengganti. PRD mendokumentasikan apa yang sudah ada di 20 halaman situs statis live. Dokumen ini menjawab permintaan berikut dari pengguna (5 September 2026):

1. Audit ulang diagram FigJam — mana yang sudah dibangun, mana yang belum.
2. Perinci setiap flow jadi sub-flow yang lebih detail.
3. Petakan flow untuk **role baru**: Mentor, Admin Console.
4. Tambahkan fitur **Sertifikat** (kelas & bootcamp) — dikonfirmasi memang diminta klien sejak awal (§3).
5. Perdalam **Dashboard Peserta**: alur Kelas (sidebar progress bukan harga, atau halaman materi/attachment/quiz), alur Bootcamp (jangan langsung masuk program — perlu lapisan overview/dashboard bootcamp dulu), dan Overview yang lebih kompleks.
6. Riset kompetitor (Coursera, IBM SkillsBuild) sebagai pembanding.
7. Dibagi jadi beberapa tahap (roadmap).

Status emoji dipakai konsisten dengan PRD: ✅ selesai dibangun · 🟡 sebagian/perlu kerja lanjutan · 🔴 belum ada sama sekali · 💭 ideation/perlu validasi bisnis.

---

## 1. Konteks Saat Ini (Ringkasan dari PRD v3.1)

Situs statis 20 halaman sudah live di `crygle-academy-website.vercel.app`. Seluruh 12 gap PRD v1.0 sudah tertutup (§14 PRD), termasuk Katalog Publik, Lupa Password, Verifikasi OTP, Payment Gagal, Bootcamp Landing, Join WA, dan halaman legal. Course Details & Classroom baru saja dibuat merespons kelas mana yang benar-benar diklik (`?slug=`/`?course=`), memakai mentor asli dari `mentor.html` yang dipetakan per kategori.

**Yang belum tersentuh sama sekali:** semua yang diminta di §2 di atas. Dokumen ini fokus ke situ.

---

## 2. Audit Ulang Diagram FigJam — Status Terkini

Diagram di [FigJam ↗](https://www.figma.com/board/JoA7Gvz89pjGJFIVFYHLXt/Untitled?node-id=0-1) dibuat 3 September 2026 (status v3.0, sebelum 2 putaran perbaikan). Setelah dibaca ulang node-by-node, berikut revisinya:

| Node di FigJam | Warna Lama | Status Sebenarnya Sekarang | Catatan |
|---|---|---|---|
| Katalog Publik — kelas.html | 🔴 Merah "BARU perlu dibangun" | ✅ Hijau | Dibangun, 10 kelas, filter kategori |
| "Lihat Lainnya" — bug link mati | 🔴 Merah | ✅ Hijau | Diperbaiki, arah ke kelas.html |
| Reset Password — link mati | 🔴 Merah | ✅ Hijau | lupa-password.html dibangun |
| Verifikasi Email OTP | 🔴 Merah | ✅ Hijau | verifikasi-otp.html dibangun, disisipkan ke alur Signup |
| Pembayaran Gagal | 🔴 Merah "kritikal" | ✅ Hijau | payment-failed.html + toggle Sandbox Mode di Review |
| Bootcamp Landing publik | 🔴 Merah | ✅ Hijau | bootcamp.html dibangun |
| Join Grup WhatsApp (step terpisah) | 🔴 Merah | ✅ Hijau | bootcamp-join.html dibangun |
| Kebijakan Privasi | 🔴 Merah "placeholder" | ✅ Hijau | privasi.html — **draf, perlu review legal** |
| Syarat dan Ketentuan | 🔴 Merah "placeholder" | ✅ Hijau | syarat-ketentuan.html — **draf, perlu review legal** |
| "3 tab konten Classroom — 2 perlu verifikasi" | 🟡 Kuning | ✅ Hijau | Sudah diverifikasi, kontennya lengkap |
| Booking Konsultasi / Jadwal / Tugas / Leaderboard | 🟡 Kuning "4 sub-tab, target akhir 6 halaman" | 🟡 Kuning (tetap) | Belum berubah — masih sub-tab satu panel, bukan halaman terpisah |
| **(tidak ada di diagram)** Course Details/Classroom multi-kelas | — | ✅ Hijau **(baru, di luar diagram)** | 10 kelas sekarang tampil akurat sesuai yang diklik, bukan selalu UI/UX |
| **(tidak ada di diagram)** Role Mentor | — | 🔴 Merah | **Belum ada sama sekali** — dibahas §8 |
| **(tidak ada di diagram)** Role Admin Console | — | 🔴 Merah | **Belum ada sama sekali** — dibahas §9 |
| **(tidak ada di diagram)** Sistem Sertifikat | — | 🔴 Merah | **Belum ada sama sekali** — dibahas §7 |
| **(tidak ada di diagram)** Dashboard Peserta versi diperdalam | — | 🔴 Merah | **Belum ada** — dibahas §6 |
| Ekspansi B2B Sekolah (§7 diagram) | 💭 Ungu ideation | 💭 Ungu (tetap, tapi sekarang lebih konkret) | Lihat §9.5 — sekarang terhubung ke Admin Console |

**Ringkasan:** Dari 20 node gap yang tercatat di diagram v3.0, **hanya 1 yang masih benar-benar terbuka** (pemisahan Bootcamp jadi 6 halaman — status 🟡, bukan gap fungsional). Sisa pekerjaan yang diminta sesi ini semuanya **baru** — tidak ada padanannya sama sekali di diagram v3.0, karena memang belum pernah dipetakan.

> **Rekomendasi:** diagram FigJam perlu digambar ulang dengan struktur baru (bukan cuma ubah warna) begitu dokumen ini disetujui — akan jadi tugas terakhir sebelum masuk `writing-plans`, dicatat di §11 Fase 0.

---

## 3. Reminder Requirement Klien — Dari Catatan Tim Asli

Dua screenshot catatan tim jadi rujukan (bukan interpretasi bebas):

**Screenshot 2 September 2026** (sudah jadi dasar PRD §10 — Alur Bootcamp Intensif, model Sanbercode).

**Screenshot 5 September 2026** (baru dibaca sesi ini) — isinya:
1. *"User Flow Learning Video materi"* + *"User Melihat Schedule Kelas yang sudah di daftar dan di ikuti (include ada jadwalnya atau ke arah spreadsheet)"* → menegaskan kebutuhan halaman jadwal/kalender personal santri, bukan cuma progress bar.
2. *"Flow Bootcamp yang di free Video Learning dan konsultasi gratis (Sanbercode)"* — model bisnis: video gratis + konsultasi berbayar.
3. *"Flow Video Learning yang dia itu beli video materi kaya BWA (BuildWithAngga). Lalu kita sediakan fitur secondary chat mentor terkait... Opsi ada 2: bayar per konsul Rp15.000 atau perbulan Rp150.000. Ada jam-jam tertentu yang sudah disediakan"* — ini **sudah dibangun** (Booking Konsultasi Mentor di dashboard, harga persis sama).
4. **Daftar kebutuhan Bootcamp** (dikutip langsung): Video materi gratis ✅ · Grup chat WhatsApp ✅ · Spreadsheet jadwal+nama+absensi+tracker tugas ✅ (sebagai tabel HTML, bukan Google Sheet — keputusan desain yang valid) · Halaman pengumpulan tugas & quiz ✅ · Leaderboard ranking ✅ · **Sertifikat** 🔴.

**Kesimpulan:** dari 6 item kebutuhan Bootcamp yang diminta klien sejak awal, **5 sudah dibangun** dan **Sertifikat adalah satu-satunya yang belum ada sama sekali** — ini bukan usulan baru saya, ini menyelesaikan permintaan klien yang sudah lama tertunda. Prioritaskan §7.

---

## 4. Riset Kompetitor — Apa yang Dipakai, Apa yang Tidak

| Platform | Temuan | Diadopsi ke Crygle? |
|---|---|---|
| **Coursera** | Dashboard punya progress bar + panduan mingguan + link langsung ke video/tugas berikutnya. Halaman "Course Home" (silabus+progress) terpisah dari halaman player video. | ✅ Ya — jadi dasar §6.2 Course Learning Hub |
| **IBM SkillsBuild + Credly** | Sertifikat = kredensial digital terenkripsi, diverifikasi via halaman publik (Credly dashboard), bisa di-share ke LinkedIn/medsos. Syarat lulus: semua modul + skor ujian ≥70%. | ✅ Ya — jadi dasar §7 (nomor unik + halaman verifikasi publik) |
| **LMS Instruktur (LifterLMS, Tutor LMS, dll.)** | Dashboard mentor: sapaan personal, analitik pendapatan, leaderboard top-student, tab kursus/coaching, progress bar siswa, notifikasi tenggat otomatis, showcase kualifikasi mentor. | ✅ Ya — jadi dasar §8 Mentor Portal |
| **LMS Admin Console (umum)** | Fitur inti: tracking real-time, laporan kepatuhan, engagement metric, role-based view, alert otomatis. Manajemen user: tambah/hapus, assign role, log aktivitas. Bisa drill-down ke 1 siswa: kelas, poin, badge, sertifikat, login terakhir. Deteksi siswa berisiko drop-out & kelas dgn completion rendah. | ✅ Ya — jadi dasar §9 Admin Console |
| **ui-ux-pro-max — product match "LMS"** | Gaya rekomendasi: **Flat Design + Accessible & Ethical**. Palet: **biru tenang + warna kategori kelas + hijau nilai + merah alert**. | ✅ Sudah otomatis cocok — token warna Crygle yang ada (`--color-primary` biru, `--color-danger` merah, hijau status "Hadir/Selesai") sudah persis pola ini. Tinggal tambah 1-2 warna aksen baru untuk membedakan role (§5). |

**Sumber:**
- [What's New on Coursera: Dashboard and Course Home Page Updates](https://blog.coursera.org/whats-new-on-coursera-dashboard-and-course-home/)
- [Digital Credentials - IBM SkillsBuild](https://skillsbuild.org/adult-learners/digital-credentials)
- [IBM SkillsBuild - Credly](https://www.credly.com/org/ibm-skillsbuild)
- [Top 10 Online Course Platforms for Instructors 2025](https://vmedulife.com/blog/online-course/top-10-online-course-platforms-for-instructors-in-2025-feature-pricing-comparison/)
- [LMS Dashboard: Benefits, Core Features, and Best Examples](https://www.ispringsolutions.com/blog/lms-dashboard)
- [What Is an LMS Dashboard? Features, Benefits & Best Practices](https://www.apps365.com/blog/lms-dashboard/)

---

## 5. Prinsip Desain untuk Seluruh Perluasan Ini

1. **Reuse token, jangan bikin bahasa desain baru.** Semua warna/spacing/radius dari `styles/variables.css` yang sudah ada dipakai ulang — konsisten dengan seluruh pekerjaan sesi ini.
2. **Diferensiasi role lewat 1 warna aksen tambahan, bukan desain ulang total** (validasi ui-ux-pro-max: "role-based views" tidak berarti "look and feel berbeda", cukup penanda visual):
   - Santri (existing) → `--color-primary` biru `#235F9C` (tidak berubah)
   - **Mentor (baru)** → aksen `#6D4FC2` (ungu) — dipilih karena belum dipakai untuk status apapun (hijau=selesai, kuning=progress, merah=gagal/alert, biru=aksi utama Santri), jadi tidak tabrakan makna
   - **Admin (baru)** → aksen `#1B2A41` (navy gelap) di atas layout yang lebih padat (kepadatan data lebih tinggi, sesuai kebutuhan admin console — pakai skala spacing lebih rapat, mirip prinsip "density" untuk dashboard operasional)
3. **Progress-first untuk yang sudah terdaftar, price-first untuk yang belum** — prinsip inti §6.2, tervalidasi pola Coursera.
4. **Semua data contoh tetap ditandai jelas sebagai demo** (nama "Dion Ahza", dst.) — konsisten prinsip "PORT bukan RECREATE" yang dipegang sepanjang proyek ini. Tidak ada fabrikasi baru.
5. **Sertifikat harus bisa diverifikasi pihak ketiga** (sekolah mitra, wali santri) tanpa perlu akun — krusial untuk kepercayaan target pasar SD–SMK/boarding school (§4 PRD).

---

## 6. Perluasan Dashboard Peserta (Role Existing, Diperdalam)

### 6.1 Panel Overview — Lebih Kompleks

**Kondisi sekarang:** 4 KPI card + kartu resume 1 kelas + kartu sesi live + grafik aktivitas 7 hari (lihat PRD §9.11).

**Widget baru yang diusulkan** (semua data agregat dari data yang SUDAH ada di halaman lain — bukan data baru yang harus dikarang):

| Widget | Isi | Sumber Data |
|---|---|---|
| **Sertifikat Saya (preview)** | 2-3 badge sertifikat terbaru + tombol "Lihat Semua" | Sistem Sertifikat §7 |
| **Tenggat Terdekat** | List gabungan deadline tugas/quiz dari semua kelas + bootcamp, diurutkan tanggal, dengan badge "H-2", "H-1", "Hari ini" | Data tugas yang sudah ada di panel Bootcamp Tugas + (baru) tugas per-kelas §6.2 |
| **Peta Kompetensi** | Bar chart horizontal 4 kategori (UI/UX Design, 3D & Animation, Front-End Coding, AI) — persentase berdasar jumlah modul selesai per kategori dari kelas yang diambil | Progress kelas yang sudah terdaftar |
| **Jadwal Personal Minggu Ini** | Kalender mini 7 hari — gabungan sesi live bootcamp + slot konsultasi mentor yang sudah dibooking. Ini **langsung menjawab** permintaan klien §3.1 ("User Melihat Schedule Kelas... include jadwal") | Data booking konsultasi + jadwal bootcamp yang sudah ada |
| **Rekomendasi Kelas Berikutnya** | 2 kartu kelas dari kategori yang belum diambil (cross-sell natural, bukan iklan acak) | `courses.ts`/`exploreCourses.ts`-equivalent (§14 PRD sudah ada datanya) |
| **Linimasa Aktivitas** | Feed kronologis: "Menyelesaikan Modul 3 — 3D Blender · 2 jam lalu", "Mendapat Sertifikat UI/UX · Kemarin" | Turunan dari event penyelesaian modul/sertifikat |

### 6.2 Kelas — Course Learning Hub (Halaman Baru, Dual-State)

Ini jawaban langsung untuk permintaan: *"ketika card kelas di klik... floating card di bagian kanan bukan lagi tentang price/harga kelas namun adalah bar progress kelas dan button untuk melanjutkan kelas, atau bisa juga menampilkan halaman... materi, attachment, asesmen/quiz."*

**Keputusan desain (menggabungkan kedua opsi yang diajukan, bukan memilih salah satu):** `course-details.html` yang sekarang (dipakai untuk *browsing*, belum beli) **tetap seperti itu** — jangan diubah, itu halaman marketing yang sudah benar. Untuk kelas yang **sudah dibeli**, dibuat halaman baru **Course Learning Hub** yang memakai layout serupa tapi state-nya berbeda total:

| Elemen | State A: Belum Beli (`course-details.html`, sudah ada) | State B: Sudah Beli (Course Learning Hub, **baru**) |
|---|---|---|
| Area video atas | Trailer/preview kelas | Thumbnail lesson yang sedang aktif + tombol "Lanjutkan" besar |
| **Sidebar kanan (floating)** | Harga + diskon + tombol "Mulai Belajar" | **Progress ring/bar (%) + "X dari Y Modul" + tombol besar "Lanjutkan Belajar"** → langsung ke lesson terakhir di `classroom.html` |
| Tab "Overview" | Deskripsi jual | Deskripsi kelas (sama, tapi tanpa nada "jual") |
| Tab "Kurikulum Kelas" | Daftar chapter statis | **Upgrade:** tiap lesson punya ikon status (✅ selesai / ▶ sedang jalan / 🔒 terkunci karena belum sampai urutannya), diklik langsung buka lesson itu di `classroom.html?lesson=` |
| Tab **"Attachment & Materi"** (baru) | — (tidak ada, belum relevan) | Daftar file unduhan per modul — **terkunci sampai modul terkait selesai** (validasi progress sebelum akses, bukan semua terbuka dari awal) |
| Tab **"Asesmen & Quiz"** (baru) | — | Daftar quiz per modul: Belum Dikerjakan / Sudah Dikerjakan (skor X/100) / Terkunci |
| Tab "Tentang Mentor" | Ada | Ada (sama) + tombol langsung "Chat Mentor Ini" |
| Tab "Reviews" | Baca-only | Baca-only + form submit review baru (hanya muncul kalau progress >50%, mencegah review kelas yang belum benar-benar dijalani) |

**Alur lengkap:** Dashboard "Course Saya" → klik kartu kelas → **Course Learning Hub** (ringkasan+progress+materi) → klik lesson tertentu / tombol "Lanjutkan Belajar" → `classroom.html` (player video, tetap seperti sekarang). `classroom.html` TIDAK dihapus — perannya jadi lebih spesifik: murni halaman "sedang menonton", bukan lagi halaman pertama yang dituju.

### 6.3 Bootcamp — Bootcamp Overview Sebagai Lapisan Baru

Permintaan: *"jangan langsung masuk ke program bootcamp, coba diperdalam, mungkin card bootcamp yang sedang berjalan atau dashboard bootcamp dengan daftar meet, asesmen, attachment."*

**Kondisi sekarang (persis seperti yang dikeluhkan):** panel "Bootcamp Saya" di dashboard langsung menampilkan sub-tab "Jadwal & Absensi" sebagai default aktif — tidak ada ringkasan dulu.

**Perbaikan:** tambah 1 langkah **Bootcamp Overview** sebagai tampilan default panel (menggantikan langsung-ke-Jadwal):

- Cohort banner (sudah ada, tetap)
- **Kartu "Sesi Live Berikutnya"** — tanggal, topik, mentor fasilitator, tombol Join (data sudah ada di tabel Jadwal, ditarik baris paling dekat)
- **Kartu "Progress Tugas"** — "2 dari 3 Tugas Selesai · Rata-rata Skor 89" (data sudah ada di sub-tab Tugas)
- **Kartu "Peringkat Kamu"** — "#2 dari 24 Santri" (data sudah ada di sub-tab Leaderboard)
- **Kartu "Materi & Attachment Terbaru"** — 2-3 file terbaru yang di-upload mentor untuk cohort ini
- 4 tombol besar ke sub-area (Jadwal & Absensi / Booking Konsultasi / Tugas & Quiz / Leaderboard) — tetap ada, tapi sekarang jadi navigasi LANJUTAN dari overview, bukan tampilan pertama
- **Jika santri belum ikut cohort manapun:** tampilkan state kosong dengan CTA besar "Lihat Program Bootcamp" → `bootcamp.html` (landing publik yang sudah dibangun)

Ini murni penataan ulang urutan tampilan (arsitektur informasi), bukan fitur baru — semua data sudah ada, cuma belum pernah dirangkum di satu layar ringkasan.

### 6.4 Sertifikat Saya (Menu Sidebar Baru)

Ditambahkan sebagai menu ke-8 di sidebar dashboard (setelah Setting): grid kartu semua sertifikat yang didapat, klik → halaman detail sertifikat (§7.2).

---

## 7. Fitur Baru: Sistem Sertifikat

### 7.1 Aturan Kelulusan (Trigger)

| Jenis | Syarat Lulus |
|---|---|
| **Kelas Video** | 100% modul ditandai selesai + seluruh quiz per modul (kalau ada) sudah dikerjakan minimal sekali |
| **Bootcamp** | Rata-rata skor tugas ≥80/100 (aturan ini **sudah ada** di PRD §10.5) + kehadiran sesi live ≥75% (aturan baru, wajar untuk model live-cohort) |

### 7.2 Halaman Sertifikat Individual — `sertifikat.html?id={certId}`

Konten: logo Crygle Academy, nama penerima, judul kelas/bootcamp, tanggal selesai, **ID unik format `CRYGLE-CERT-2026-XXXXX`**, tanda tangan digital (Founder untuk kelas, Mentor Utama untuk bootcamp), QR code menuju halaman verifikasi. Tombol: **Download PDF**, **Share ke LinkedIn/WhatsApp**.

### 7.3 Halaman Verifikasi Publik — `verifikasi-sertifikat.html?id={certId}`

**Bisa diakses siapa saja tanpa login** (sekolah mitra, wali santri, calon employer). Form input ID sertifikat atau scan QR. Hasil: "✅ Sertifikat Valid" / "❌ Tidak Ditemukan", lalu nama pemilik (**dengan masking sebagian untuk privasi anak di bawah umur**, mis. "D**n A**a" — lihat §4 PRD soal perlindungan data anak), judul kelas/bootcamp, tanggal terbit. Pola ini meniru langsung Credly/IBM SkillsBuild (§4).

---

## 8. Role Baru: Mentor Portal

Saat ini mentor HANYA punya representasi visual (kartu profil di `mentor.html`, data statis) — tidak ada satupun halaman tempat mentor benar-benar login dan bekerja. Berikut peta layar lengkapnya:

| # | Halaman | Isi & Fungsi |
|---|---|---|
| 8.1 | **Login Mentor** (`mentor/login.html`, atau login gabungan dengan pemilihan role) | Sama seperti login Santri, redirect ke Mentor Dashboard setelah masuk |
| 8.2 | **Mentor Dashboard — Overview** | KPI: Pendapatan Bulan Ini (dari konsultasi berbayar §3.3), Sesi Konsultasi Mendatang, Tugas Menunggu Dinilai, Jumlah Santri Bimbingan Aktif. Kartu "Sesi Live Berikutnya" kalau mengajar bootcamp |
| 8.3 | **Kelas Saya (Mentor)** | Daftar kelas video yang diampu, tombol "Kelola Materi" per kelas — upload/edit video, kurikulum, dan attachment (menu admin-lite terbatas ke kelas miliknya sendiri) |
| 8.4 | **Cohort Bootcamp Saya** | Daftar cohort yang dibimbing, per cohort: roster santri, tombol tandai kehadiran per sesi live, upload materi/attachment cohort |
| 8.5 | **Booking Konsultasi (sisi Mentor)** | Kalender slot yang sudah diatur mentor (bisa tambah/hapus jam tersedia), daftar booking masuk (terima/reschedule/tandai selesai) — **pasangan langsung** dari fitur booking yang sudah ada di sisi Santri |
| 8.6 | **Pusat Penilaian (Grading Center)** | Daftar submission tugas/quiz yang menunggu dinilai (lintas kelas & bootcamp), beri skor + feedback tertulis — **ini yang menghasilkan data feedback yang SUDAH ditampilkan** ke Santri di panel Tugas dashboard (mis. *"Riset pasar sangat tajam..."*) — sekarang jelas dari mana asalnya |
| 8.7 | **Chat Santri (sisi Mentor)** | Pasangan dari Panel Chat Mentor Santri — daftar thread masuk, balas pesan |
| 8.8 | **Pendapatan & Pencairan** | Riwayat sesi konsultasi terbayar (Rp15.000/sesi atau Rp150.000/bulan), status pencairan — mirror dari pola Panel Affiliate Santri yang sudah ada, dipakai ulang untuk konteks mentor |
| 8.9 | **Profil & Ketersediaan** | Edit bio/skill (tarik dari `mentor.html`), atur jam ketersediaan konsultasi default |

**Prinsip kunci:** Portal Mentor bukan fitur baru dari nol — 80%-nya adalah **sisi lain dari fitur yang sudah dibangun untuk Santri** (chat, booking, tugas, cohort). Ini secara alami paling murah untuk dibangun karena datanya sudah ada, tinggal dibuka dari sudut pandang mentor.

---

## 9. Role Baru: Admin Console

Saat ini tidak ada satupun cara mengelola platform dari sisi bisnis — semua konten (kelas, harga, mentor, cohort) hardcoded di file statis. Admin Console adalah **kontrol pusat** yang dibutuhkan supaya bisnis ini benar-benar bisa dioperasikan tanpa developer.

| # | Halaman | Isi & Fungsi |
|---|---|---|
| 9.1 | **Login Admin** | Terpisah dari login Santri/Mentor (level akses lebih sensitif) |
| 9.2 | **Admin Dashboard — Overview** | KPI bisnis: Total Pendapatan (harian/bulanan), Santri Aktif, Tingkat Penyelesaian Kelas rata-rata, Santri Berisiko Drop-out (tidak aktif >14 hari — validasi riset §4), Kelas dengan Completion Rate Terendah, Tren Pendaftaran Baru (grafik) |
| 9.3 | **Manajemen Pengguna** | Tabel semua Santri & Mentor — cari/filter, lihat detail 1 pengguna (kelas diambil, poin, badge, sertifikat, login terakhir — pola persis Credly/LMS umum §4), suspend/aktifkan akun, ubah role |
| 9.4 | **Manajemen Kelas** | CRUD kelas video: judul, harga, kategori, mentor pengampu, publish/unpublish, urutan modul & attachment. **Ini yang menggantikan hardcode di `courses.ts`/HTML** menjadi benar-benar dikelola |
| 9.5 | **Manajemen Cohort Bootcamp** | Buat batch baru (nama, periode, kuota), assign mentor utama & fasilitator, atur jadwal sesi live, lihat roster & progress agregat per cohort |
| 9.6 | **Transaksi & Pembayaran** | Log semua transaksi checkout (§9.5 PRD), status (berhasil/gagal/pending), proses refund manual jika perlu, rekonsiliasi dengan payment gateway |
| 9.7 | **Manajemen Sertifikat** | Daftar semua sertifikat terbit, cari by nama/ID, **cabut sertifikat** kalau ada kasus kecurangan (fitur wajib untuk kredibilitas jangka panjang) |
| 9.8 | **Moderasi Konten** | Review kelas yang di-flag tidak pantas, kelola FAQ Home, kelola isi halaman Legal (Privasi/S&K — supaya tidak perlu edit HTML manual lagi setelah draf awal §7.2/§7.3 PRD direview legal) |
| 9.9 | **Konsol Kemitraan Sekolah (B2B)** | **Ini yang mengonkretkan ideation PRD §15** — import massal santri per sekolah, lihat laporan agregat progress per sekolah/kelas asrama, invoice institusi terpisah dari checkout individual |
| 9.10 | **Laporan & Ekspor** | Unduh laporan (CSV/PDF): pendapatan per kelas, performa mentor, tingkat kelulusan per cohort |
| 9.11 | **Pengaturan Platform** | Konfigurasi metode pembayaran aktif, template notifikasi (email/WA), pengaturan umum situs |

---

## 10. Peta Alur Master — Revisi Lengkap (menggantikan §16.4 PRD versi lama)

Menambah 3 kelompok alur baru ke 7 kelompok yang sudah ada di PRD:

8. **Sistem Sertifikat** — Penyelesaian Kelas/Bootcamp 🔴 → Halaman Sertifikat Individual 🔴 → (opsional) Download/Share 🔴 → Halaman Verifikasi Publik 🔴
9. **Mentor Portal** — Login Mentor 🔴 → Dashboard Overview 🔴 → {Kelas Saya 🔴 · Cohort Saya 🔴 · Booking 🔴 · Grading Center 🔴 · Chat 🔴 · Pendapatan 🔴}
10. **Admin Console** — Login Admin 🔴 → Dashboard Overview 🔴 → {User 🔴 · Kelas 🔴 · Cohort 🔴 · Transaksi 🔴 · Sertifikat 🔴 · Moderasi 🔴 · B2B 🔴 · Laporan 🔴 · Setting 🔴}

Plus revisi kelompok yang sudah ada:
- **Kelompok 4 (Dashboard & Learning)** pecah jadi sub-alur baru: Dashboard → Course Saya → **Course Learning Hub 🔴 (baru)** → Classroom (player, tetap ✅)
- **Kelompok 5 (Bootcamp)** dapat lapisan baru: Dashboard → Bootcamp Saya → **Bootcamp Overview 🔴 (baru)** → 4 sub-area (tetap 🟡)

---

## 11. Roadmap Bertahap

Urutan disusun berdasar dependensi teknis & dampak bisnis — bukan asal bagi rata:

| Fase | Fokus | Kenapa Urutannya di Sini |
|---|---|---|
| **Fase 0** | Gambar ulang diagram FigJam dengan struktur baru (§10) + finalisasi dokumen ini jadi disetujui | Alat komunikasi sebelum eksekusi — murah, cepat, mencegah salah paham |
| **Fase 1** | Dashboard Peserta diperdalam: Overview kompleks (§6.1), Course Learning Hub (§6.2), Bootcamp Overview (§6.3) | Semua datanya SUDAH ADA — cuma penataan ulang & UI baru, bukan sistem baru. ROI tercepat, langsung dirasakan pengguna existing |
| **Fase 2** | Sistem Sertifikat (§7) | Permintaan klien yang sudah lama tertunda (§3) — dan jadi PRASYARAT alami untuk Fase 1 selesai terasa lengkap (Course Learning Hub butuh "apa yang didapat setelah selesai") |
| **Fase 3** | Mentor Portal (§8) | 80% reuse data yang sudah ada (chat/booking/tugas) — begitu Sertifikat ada, mentor perlu bisa lihat siapa yang sudah lulus dari sisi mereka |
| **Fase 4** | Admin Console inti (§9.2–9.7: Overview, User, Kelas, Cohort, Transaksi, Sertifikat) | Butuh Mentor Portal lebih dulu ada supaya Admin py sesuatu untuk "mengelola" (assign mentor ke kelas/cohort) |
| **Fase 5** | Admin Console lanjutan (§9.8–9.11: Moderasi, B2B, Laporan, Setting) | Paling kompleks & paling bergantung pada validasi bisnis (§12) — wajar di akhir |

---

## 12. Keputusan yang Perlu Divalidasi Bisnis (Bukan Sekadar Desain)

> ⚠️ Sama seperti disiplin yang dipegang di PRD §14 — item berikut levelnya keputusan bisnis/hukum, bukan UI yang tinggal digambar.

1. **Skema payout mentor** — konsultasi Rp15.000/sesi atau Rp150.000/bulan (§3 dokumen ini) sudah jelas dari sisi Santri, tapi siapa yang approve pencairan ke mentor, kapan siklusnya (mingguan/bulanan), dan potongan platform berapa persen — belum ada aturannya.
2. **Consent orang tua untuk sertifikat publik** — target usia SD–SMK berarti sebagian santri di bawah umur. Halaman verifikasi publik (§7.3) menampilkan nama (meski di-mask sebagian) — perlu keputusan apakah butuh consent eksplisit wali sebelum sertifikat diterbitkan.
3. **Masa berlaku sertifikat** — apakah selamanya valid, atau perlu re-sertifikasi berkala (relevan untuk skill teknis yang cepat usang, mis. AI-Assisted Design)?
4. **RACI Admin vs Mentor** — siapa yang berwenang unpublish kelas, approve refund, atau menghapus akun santri? Perlu matriks kewenangan sebelum Fase 4-5 dibangun.
5. **Skema harga institusi B2B** (§9.9) — lisensi tahunan per sekolah atau block-booking per angkatan? Ini keputusan komersial murni, sudah diflag sejak PRD §15.

---

## 13. Lampiran — Sumber

- Diagram FigJam yang diaudit: [Peta User Flow & Fitur — Crygle Academy ↗](https://www.figma.com/board/JoA7Gvz89pjGJFIVFYHLXt/Untitled?node-id=0-1)
- Screenshot catatan tim klien: `Screenshot 2026-09-05 172916.png` (baru) dan sumber 2 September 2026 yang sudah dikutip di PRD §17.A
- Riset kompetitor: lihat tabel sumber lengkap di §4
- `ui-ux-pro-max` query: domain `product` ("LMS admin dashboard trustworthy education platform") dan domain `ux` (progress indicator pattern)
- `Crygle-Academy-PRD.md` v3.1 — dasar semua status "sudah ada" yang dirujuk di dokumen ini

---

## Catatan Penutup (Pendapat Saya, Diminta Langsung)

Tiga hal yang saya rekomendasikan kuat, di luar yang diminta eksplisit:

1. **Jangan bangun Mentor Portal dan Admin Console sekaligus.** Keduanya besar. Mentor Portal dulu (Fase 3) karena reuse data paling tinggi dan langsung menutup "siapa yang menilai tugas ini sebenarnya" yang sekarang implisit di data dummy.
2. **Sertifikat itu prioritas tertinggi dari semua yang baru**, lebih tinggi dari Mentor/Admin — ini permintaan klien yang sudah ada sejak awal (§3), bukan ide baru, dan efeknya langsung terasa ke kepercayaan wali santri/sekolah mitra yang jadi target pasar inti (§2 PRD).
3. **Course Learning Hub (§6.2) jangan dianggap "nice to have"** — ini memperbaiki kebingungan UX nyata (progress bar vs harga untuk kelas yang sudah dibeli) yang kalau dibiarkan bisa bikin santri mengira harus bayar lagi setiap buka kelasnya sendiri.
