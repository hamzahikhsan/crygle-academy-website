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
4. **Daftar kebutuhan Bootcamp** (dikutip langsung) — **dikoreksi setelah verifikasi grep langsung ke `dashboard.html`/`bootcamp.html`/`bootcamp-join.html`**, bukan asumsi dari draf sebelumnya:

| Item Diminta Klien | Status Sebenarnya | Bukti |
|---|---|---|
| Video materi gratis | 🔴 **Belum ada** | Tidak ditemukan satupun section "video gratis" di `bootcamp.html`/`bootcamp-join.html`/panel Bootcamp `dashboard.html`. Draf v1.0 dokumen ini salah menandainya ✅ — dikoreksi di sini. |
| Grup chat WhatsApp | ✅ Terverifikasi | Link nyata `chat.whatsapp.com/demo-crygle-bootcamp-cohort` ada di `dashboard.html` & `bootcamp-join.html` |
| Spreadsheet jadwal + nama siswa + absensi + tracker tugas | 🟡 **Sebagian**, bukan penuh | Yang ada: tabel jadwal **sisi santri sendiri** (1 baris = 1 sesi, status hadir milik santri yang login) di `dashboard.html`. Yang **belum ada**: roster satu-layar berisi *banyak* nama santri + absensi masing-masing untuk dilihat mentor/admin — ini baru rencana di §8.4 (Cohort Bootcamp Saya, sisi Mentor) & §9.5 (Admin), bukan sudah jadi |
| Halaman pengumpulan tugas & quiz | ✅ Terverifikasi | `subtab-tugas` dengan form unggah link tugas, ada di `dashboard.html` |
| Leaderboard ranking | ✅ Terverifikasi | `subtab-leaderboard` dengan 4 baris ranking bermedali, ada di `dashboard.html` |
| Sertifikat | 🔴 Belum ada | Sama seperti draf sebelumnya |

**Kesimpulan (dikoreksi dari draf v1.0):** dari 6 item, **3 benar-benar tuntas** (Grup WA, Tugas & Quiz, Leaderboard), **1 sebagian** (Spreadsheet — baru sisi santri), **2 sama sekali belum ada** (Video Gratis, Sertifikat). Klaim "5 dari 6 sudah dibangun" di draf v1.0 **tidak akurat** — Video Materi Gratis salah dihitung selesai padahal tidak pernah ditemukan di kode. Prioritas jadi bertambah satu: **Video Materi Gratis untuk Bootcamp** perlu masuk roadmap (lihat catatan di §11), sejajar dengan Sertifikat di §7.

> ⚠️ **Dampak ke §2 (diagram FigJam v2):** diagram yang baru saya buat kemarin **juga ikut salah** — node "Video Gratis" yang ada di diagram lama malah saya hilangkan sama sekali di v2, bukan diberi status 🔴. Perlu ditambal saat diagram direvisi lagi (belum saya lakukan sekarang, supaya tidak boros pemanggilan tool — tunggu instruksi lanjut).

---

## 4. Riset Kompetitor — Apa yang Dipakai, Apa yang Tidak

| Platform | Temuan | Diadopsi ke Crygle? |
|---|---|---|
| **Coursera** | Dikonfirmasi via WebFetch langsung ke artikel: dashboard punya **progress bar**, **panduan mingguan**, dan **link ke video/tugas berikutnya** — semuanya ada di "course dashboard dan course page", terpisah dari halaman player video. *(Catatan koreksi: tombol "continue learning" spesifik yang saya sebut di draf awal **tidak terkonfirmasi** ada di artikel ini — itu inferensi UX saya sendiri berdasarkan pola umum, bukan kutipan langsung. Tetap saya pakai sebagai rekomendasi, tapi jangan dianggap fakta Coursera.)* | ✅ Sebagian besar valid — jadi dasar §6.2 Course Learning Hub |
| **IBM SkillsBuild + Credly** | **Dikoreksi setelah WebFetch ke 2 URL sumber asli (`skillsbuild.org/.../digital-credentials` dan `credly.com/org/ibm-skillsbuild`) — KEDUANYA TIDAK menyebut verifikasi publik atau share LinkedIn sama sekali**, cuma halaman navigasi. Klaim itu berasal dari WebSearch generik sebelumnya yang mencampur beberapa sumber, lalu **salah saya kutip seolah dari 2 URL tersebut**. Setelah dicari ulang khusus ke `support.credly.com`, fitur share-ke-LinkedIn **benar ada** (dikonfirmasi), tapi mekanisme "verifikasi publik tanpa login" adalah **inferensi saya** dari pola URL `credly.com/.../verify` yang ditemukan, bukan kutipan eksplisit. | 🟡 Konsepnya tetap dipakai untuk §7, tapi labelnya diperbaiki jadi "terinspirasi pola Credly", bukan "replikasi fitur Credly yang terverifikasi" |
| **LMS Instruktur (LifterLMS, Tutor LMS, dll.)** | Dashboard mentor: sapaan personal, analitik pendapatan, leaderboard top-student, tab kursus/coaching, progress bar siswa, notifikasi tenggat otomatis, showcase kualifikasi mentor. | ✅ Ya — jadi dasar §8 Mentor Portal |
| **LMS Admin Console (umum)** | Fitur inti: tracking real-time, laporan kepatuhan, engagement metric, role-based view, alert otomatis. Manajemen user: tambah/hapus, assign role, log aktivitas. Bisa drill-down ke 1 siswa: kelas, poin, badge, sertifikat, login terakhir. Deteksi siswa berisiko drop-out & kelas dgn completion rendah. | ✅ Ya — jadi dasar §9 Admin Console |
| **ui-ux-pro-max — product match "LMS"** | Gaya rekomendasi: **Flat Design + Accessible & Ethical**. Palet: **biru tenang + warna kategori kelas + hijau nilai + merah alert**. | ✅ Sudah otomatis cocok — token warna Crygle yang ada (`--color-primary` biru, `--color-danger` merah, hijau status "Hadir/Selesai") sudah persis pola ini. Tinggal tambah 1-2 warna aksen baru untuk membedakan role (§5). |

**Sumber:**
- [What's New on Coursera: Dashboard and Course Home Page Updates](https://blog.coursera.org/whats-new-on-coursera-dashboard-and-course-home/) — diverifikasi via WebFetch, isinya sesuai kutipan di atas
- [How can I add my badge to my LinkedIn profile and share to my feed? – Credly Support](https://support.credly.com/hc/en-us/articles/360021221491-How-can-I-add-my-badge-to-my-LinkedIn-profile-and-share-to-my-feed) — sumber pengganti yang benar untuk klaim share-LinkedIn (2 link lama di bawah **tidak mendukung** klaim itu, dibiarkan untuk transparansi audit)
- ~~[Digital Credentials - IBM SkillsBuild](https://skillsbuild.org/adult-learners/digital-credentials)~~ — dicoret, WebFetch konfirmasi halaman ini cuma navigasi, tidak menyebut verifikasi/LinkedIn
- ~~[IBM SkillsBuild - Credly](https://www.credly.com/org/ibm-skillsbuild)~~ — dicoret, sama seperti di atas
- [Top 10 Online Course Platforms for Instructors 2025](https://vmedulife.com/blog/online-course/top-10-online-course-platforms-for-instructors-in-2025-feature-pricing-comparison/)
- [LMS Dashboard: Benefits, Core Features, and Best Examples](https://www.ispringsolutions.com/blog/lms-dashboard)
- [What Is an LMS Dashboard? Features, Benefits & Best Practices](https://www.apps365.com/blog/lms-dashboard/)

---

## 5. Prinsip Desain untuk Seluruh Perluasan Ini

1. **Reuse token, jangan bikin bahasa desain baru.** Semua warna/spacing/radius dari `styles/variables.css` yang sudah ada dipakai ulang — konsisten dengan seluruh pekerjaan sesi ini.
2. **Diferensiasi role lewat 1 warna aksen tambahan, bukan desain ulang total** (validasi ui-ux-pro-max: "role-based views" tidak berarti "look and feel berbeda", cukup penanda visual):
   - Santri (existing) → `--color-primary` biru `#235F9C` (tidak berubah)
   - **Mentor (baru)** → aksen `#0E8388` (**teal**) — **ralat dari draf v1.0**: awalnya saya usulkan ungu `#6D4FC2`, tapi setelah dicek langsung ke `styles/dashboard.css` (baris 88-90), ungu `#8C40D4` **sudah dipakai** untuk badge "Streak Belajar Santri" (gamifikasi). Warna ungu lain yang mirip akan membingungkan meski hex-nya beda — satu keluarga hue yang sama harus tetap 1 makna. Teal dipilih karena grep memastikan **belum ada satupun** penggunaan warna keluarga teal/cyan di `styles/*.css`.
   - **Admin (baru)** → aksen `#1B2A41` (navy gelap) — dicek, aman: berbeda dari `#100F14`/`#202020` (gradient banner Bootcamp, dipakai `styles/dashboard.css` baris 341, condong abu-abu bukan biru) dan dari `--color-primary` `#235F9C`. Dipakai di atas layout yang lebih padat (kepadatan data lebih tinggi, sesuai kebutuhan admin console — pakai skala spacing lebih rapat, mirip prinsip "density" untuk dashboard operasional)
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
| **Tenggat Terdekat** | List gabungan deadline tugas/quiz dari semua kelas + bootcamp, diurutkan tanggal, dengan badge "H-2", "H-1", "Hari ini" | 🟡 **Dikoreksi:** data tugas Bootcamp memang ada, tapi formatnya cuma teks relatif ("⏳ DEADLINE: 2 HARI LAGI" — dicek langsung di `dashboard.html`), **bukan tanggal absolut**. Supaya bisa digabung & diurutkan lintas kelas+bootcamp di satu widget, tiap tugas perlu diberi field tanggal asli dulu — ini kerja tambahan kecil, bukan sekadar "tinggal ambil data" |
| **Peta Kompetensi** | Bar chart horizontal 4 kategori (UI/UX Design, 3D & Animation, Front-End Coding, AI) — persentase berdasar jumlah modul selesai per kategori dari kelas yang diambil | Progress kelas yang sudah terdaftar |
| **Jadwal Personal Minggu Ini** | Kalender mini 7 hari — gabungan sesi live bootcamp + slot konsultasi mentor yang sudah dibooking. Ini **langsung menjawab** permintaan klien §3 ("User Melihat Schedule Kelas... include jadwal") | 🔴 **Dikoreksi, klaim awal salah:** dicek langsung ke `initBookingSlotPicker()` di `main.js` — klik "Konfirmasi Booking Sesi" **tidak menyimpan apapun**, cuma update teks ringkasan di halaman yang sama (wajar, situs statis belum punya database). Jadi widget ini **bukan "tinggal tarik data yang ada"** seperti klaim draf v1.0 — perlu mekanisme penyimpanan booking dulu (minimal `sessionStorage` untuk versi demo, idealnya backend asli) sebelum widget ini bisa nyata |
| **Rekomendasi Kelas Berikutnya** | 2 kartu kelas dari kategori yang belum diambil (cross-sell natural, bukan iklan acak) | **Dikoreksi:** draf v1.0 salah menyebut `courses.ts`/`exploreCourses.ts` — itu nama file dari rencana migrasi Next.js yang **tidak pernah dipakai di situs statis live ini**. Sumber data asli yang benar-benar ada: `scripts/course-catalog.js` (`CRYGLE_COURSES`), dibangun sesi sebelumnya untuk Course Details/Classroom dinamis |
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
- **Kartu "Peringkat Kamu"** — "Peringkat #2" (data rank sudah ada di sub-tab Leaderboard — **koreksi:** draf v1.0 menulis "dari 24 Santri", angka itu **karangan saya**, tidak ada di manapun; tabel Leaderboard yang nyata cuma menampilkan 4 baris tanpa total cohort disebutkan. Jangan tampilkan "dari X" kecuali ada data total peserta yang sungguhan)
- **Kartu "Materi & Attachment Terbaru"** — 🔴 **koreksi: ini fitur baru sepenuhnya**, bukan data yang sudah ada. Dicek ke `dashboard.html` baris 470-712 (seluruh isi panel Bootcamp) — kolom "Materi/Topik" di tabel Jadwal cuma teks judul sesi, **bukan file yang bisa diunduh**. Tidak ada satupun mekanisme upload/attachment mentor untuk Bootcamp saat ini — sejalan dengan tab "Attachment & Materi" di §6.2 yang juga saya tandai baru
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
| **Bootcamp** | Rata-rata skor tugas ≥80/100 — **koreksi sitasi:** draf v1.0 menulis "sudah ada di PRD §10.5", tapi §10 PRD tidak punya sub-nomor 10.5 literal. Aturan ini tetap **terverifikasi nyata**, buktinya lebih kuat: badge asli `⭐ Lolos Syarat Sertifikat (≥80)` di KPI "Rata-rata Skor Tugas" (`dashboard.html` baris 279) + kehadiran sesi live ≥75% (aturan baru, wajar untuk model live-cohort, belum ada di kode manapun) |

### 7.2 Halaman Sertifikat Individual — `sertifikat.html?id={certId}`

Konten: logo Crygle Academy, nama penerima, judul kelas/bootcamp, tanggal selesai, **ID unik format `CRYGLE-CERT-2026-XXXXX`**, tanda tangan digital (Founder untuk kelas, Mentor Utama untuk bootcamp), QR code menuju halaman verifikasi. Tombol: **Download PDF**, **Share ke LinkedIn/WhatsApp**.

### 7.3 Halaman Verifikasi Publik — `verifikasi-sertifikat.html?id={certId}`

**Bisa diakses siapa saja tanpa login** (sekolah mitra, wali santri, calon employer). Form input ID sertifikat atau scan QR. Hasil: "✅ Sertifikat Valid" / "❌ Tidak Ditemukan", lalu nama pemilik (**dengan masking sebagian untuk privasi anak di bawah umur**, mis. "D**n A**a" — **koreksi sitasi:** bukan §4 PRD (itu section Persona, bukan kebijakan privasi), rujukan yang benar adalah `privasi.html` §3 "Perlindungan Data Anak & Remaja" yang sudah dibangun sesi sebelumnya), judul kelas/bootcamp, tanggal terbit. Pola ini meniru langsung Credly/IBM SkillsBuild (§4).

---

## 8. Role Baru: Mentor Portal

Saat ini mentor HANYA punya representasi visual (kartu profil di `mentor.html`, data statis) — tidak ada satupun halaman tempat mentor benar-benar login dan bekerja. Berikut peta layar lengkapnya:

| # | Halaman | Isi & Fungsi |
|---|---|---|
| 8.1 | **Login Mentor** (`mentor/login.html`, atau login gabungan dengan pemilihan role) | Sama seperti login Santri, redirect ke Mentor Dashboard setelah masuk |
| 8.2 | **Mentor Dashboard — Overview** | KPI: Pendapatan Bulan Ini (dari konsultasi berbayar §3.3), Sesi Konsultasi Mendatang, Tugas Menunggu Dinilai, Jumlah Santri Bimbingan Aktif. Kartu "Sesi Live Berikutnya" kalau mengajar bootcamp |
| 8.3 | **Kelas Saya (Mentor)** | Daftar kelas video yang diampu, tombol "Kelola Materi" per kelas — upload/edit video, kurikulum, dan attachment (menu admin-lite terbatas ke kelas miliknya sendiri) |
| 8.4 | **Cohort Bootcamp Saya** | Daftar cohort yang dibimbing, per cohort: roster santri, tombol tandai kehadiran per sesi live, upload materi/attachment cohort — ⚠️ **bukan reuse:** per koreksi §3, roster multi-santri & attachment cohort **belum ada sama sekali** di kode manapun (yang ada cuma tabel jadwal 1-santri di sisi Santri). Ini genuinely fitur baru, bukan "sisi lain" dari yang sudah ada |
| 8.5 | **Booking Konsultasi (sisi Mentor)** | Kalender slot yang sudah diatur mentor (bisa tambah/hapus jam tersedia), daftar booking masuk (terima/reschedule/tandai selesai) — UI picker-nya memang pasangan dari sisi Santri, **tapi** ⚠️ **per koreksi §6**, klik "Konfirmasi Booking Sesi" di sisi Santri **tidak menyimpan apapun** (`initBookingSlotPicker()` cuma update teks di halaman yang sama). Jadi "daftar booking masuk" di sisi Mentor **tidak punya data sungguhan untuk ditarik** sampai ada lapisan penyimpanan booking dibangun dulu — prasyarat baru, bukan cuma "buka dari sudut pandang lain" |
| 8.6 | **Pusat Penilaian (Grading Center)** | Daftar submission tugas/quiz yang menunggu dinilai (lintas kelas & bootcamp), beri skor + feedback tertulis — **ini yang menghasilkan data feedback yang SUDAH ditampilkan** ke Santri di panel Tugas dashboard (mis. *"Riset pasar sangat tajam..."*) — sekarang jelas dari mana asalnya |
| 8.7 | **Chat Santri (sisi Mentor)** | Pasangan dari Panel Chat Mentor Santri — daftar thread masuk, balas pesan |
| 8.8 | **Pendapatan & Pencairan** | Riwayat sesi konsultasi terbayar (Rp15.000/sesi atau Rp150.000/bulan), status pencairan — mirror dari pola Panel Affiliate Santri yang sudah ada, dipakai ulang untuk konteks mentor |
| 8.9 | **Profil & Ketersediaan** | Edit bio/skill (tarik dari `mentor.html`), atur jam ketersediaan konsultasi default |

**Prinsip kunci (dikoreksi — angka "80%" di draf v1.0 terlalu optimis):** dari 9 layar, **5 memang reuse murah** (8.2 Dashboard — pola KPI card sama, 8.6 narasi feedback sudah ada datanya, 8.7 Chat — struktur thread Santri sudah ada, 8.8 Pendapatan — mirror persis Panel Affiliate, 8.9 Profil — tarik dari `mentor.html`). Tapi **3 layar butuh kerja baru yang nyata, bukan sekadar buka sudut pandang lain**: 8.3 (upload/kelola materi — Santri tidak punya padanan fitur edit apapun), 8.4 (roster multi-santri — belum ada di manapun), dan 8.5 (butuh lapisan penyimpanan booking dulu, per koreksi §6). Tetap jauh lebih murah dibangun dibanding Admin Console (§9) yang seluruhnya baru, tapi jangan diperlakukan sebagai "tinggal reskin" — 3 dari 9 layar itu pekerjaan penuh.

---

## 9. Role Baru: Admin Console

Saat ini tidak ada satupun cara mengelola platform dari sisi bisnis — semua konten (kelas, harga, mentor, cohort) hardcoded di file statis. Admin Console adalah **kontrol pusat** yang dibutuhkan supaya bisnis ini benar-benar bisa dioperasikan tanpa developer.

| # | Halaman | Isi & Fungsi |
|---|---|---|
| 9.1 | **Login Admin** | Terpisah dari login Santri/Mentor (level akses lebih sensitif) |
| 9.2 | **Admin Dashboard — Overview** | KPI bisnis: Total Pendapatan (harian/bulanan), Santri Aktif, Tingkat Penyelesaian Kelas rata-rata, Santri Berisiko Drop-out (tidak aktif >14 hari — validasi riset §4), Kelas dengan Completion Rate Terendah, Tren Pendaftaran Baru (grafik) |
| 9.3 | **Manajemen Pengguna** | Tabel semua Santri & Mentor — cari/filter, lihat detail 1 pengguna (kelas diambil, poin, badge, sertifikat, login terakhir — pola persis Credly/LMS umum §4), suspend/aktifkan akun, ubah role |
| 9.4 | **Manajemen Kelas** | CRUD kelas video: judul, harga, kategori, mentor pengampu, publish/unpublish, urutan modul & attachment. **Ini yang menggantikan hardcode di `scripts/course-catalog.js`/HTML** menjadi benar-benar dikelola (koreksi: nama file sebelumnya salah kutip, sama seperti error yang sudah dibenahi di §6.1) |
| 9.5 | **Manajemen Cohort Bootcamp** | Buat batch baru (nama, periode, kuota), assign mentor utama & fasilitator, atur jadwal sesi live, lihat roster & progress agregat per cohort |
| 9.6 | **Transaksi & Pembayaran** | Log semua transaksi checkout (§9.5 PRD), status (berhasil/gagal/pending), proses refund manual jika perlu, rekonsiliasi dengan payment gateway |
| 9.7 | **Manajemen Sertifikat** | Daftar semua sertifikat terbit, cari by nama/ID, **cabut sertifikat** kalau ada kasus kecurangan (fitur wajib untuk kredibilitas jangka panjang) |
| 9.8 | **Moderasi Konten** | Review kelas yang di-flag tidak pantas, kelola FAQ Home, kelola isi halaman Legal (`privasi.html`/`syarat-ketentuan.html` — supaya tidak perlu edit HTML manual lagi setelah draf yang ada direview legal — **koreksi:** draf v1.0 salah kutip "§7.2/§7.3 PRD", dicek ulang PRD §7 ternyata isinya Sitemap, bukan halaman legal) |
| 9.9 | **Konsol Kemitraan Sekolah (B2B)** | **Ini yang mengonkretkan ideation PRD §15** — import massal santri per sekolah, lihat laporan agregat progress per sekolah/kelas asrama, invoice institusi terpisah dari checkout individual |
| 9.10 | **Laporan & Ekspor** | Unduh laporan (CSV/PDF): pendapatan per kelas, performa mentor, tingkat kelulusan per cohort |
| 9.11 | **Pengaturan Platform** | Konfigurasi metode pembayaran aktif, template notifikasi (email/WA), pengaturan umum situs |

---

## 10. Peta Alur Master — Revisi Lengkap (menggantikan §16.4 PRD versi lama)

Menambah 3 kelompok alur baru ke 7 kelompok yang sudah ada di PRD. **Catatan penomoran (supaya tidak rancu):** angka di bawah ini melanjutkan penomoran **kelompok flow di diagram FigJam** (yang lama cuma sampai kelompok 7), BUKAN nomor bagian (§) dokumen ini — kelompok 8 di sini ≠ §8 dokumen ini (yang isinya Mentor Portal, bukan Sertifikat). Dua sistem penomoran yang beda, sengaja dipisah:

- **Kelompok 8: Sistem Sertifikat** (dibahas di §7 dokumen ini) — Penyelesaian Kelas/Bootcamp 🔴 → Halaman Sertifikat Individual 🔴 → (opsional) Download/Share 🔴 → Halaman Verifikasi Publik 🔴
- **Kelompok 9: Mentor Portal** (dibahas di §8 dokumen ini) — Login Mentor 🔴 → Dashboard Overview 🔴 → {Kelas Saya 🔴 · Cohort Saya 🔴 · Booking 🔴 · Grading Center 🔴 · Chat 🔴 · Pendapatan 🔴}
- **Kelompok 10: Admin Console** (dibahas di §9 dokumen ini) — Login Admin 🔴 → Dashboard Overview 🔴 → {User 🔴 · Kelas 🔴 · Cohort 🔴 · Transaksi 🔴 · Sertifikat 🔴 · Moderasi 🔴 · B2B 🔴 · Laporan 🔴 · Setting 🔴}

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
| **Fase 2** | Sistem Sertifikat (§7) **+ Video Materi Gratis Bootcamp** (§3 — ralat: ternyata belum ada sama sekali, bukan cuma sub-fitur kecil) | Permintaan klien yang sudah lama tertunda (§3) — dan jadi PRASYARAT alami untuk Fase 1 selesai terasa lengkap (Course Learning Hub butuh "apa yang didapat setelah selesai"). Video Gratis digabung di sini karena effort-nya kecil (reuse pola kartu kelas yang sudah ada) — tidak perlu fase sendiri |
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
