# Fase 1: Dashboard Peserta Diperdalam — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Baca dulu:** `Crygle-Academy-Flow-Expansion-Spec.md` §6 (spek lengkap + audit anti-halu), `HANDOFF-Context-untuk-AI-Agent.md` (konteks umum situs statis).

**Goal:** Bangun §6.1 (Overview 5 widget baru), §6.2 (Course Learning Hub — halaman baru untuk kelas yang sudah dibeli), dan §6.3 (Bootcamp Overview — lapisan ringkasan baru) di situs statis live.

**Architecture:** Situs ini **statis HTML/CSS/JS tanpa test runner** (beda dari rencana migrasi Next.js yang terpisah di `web/`, tidak dipakai). Pola "TDD" di plan ini diadaptasi ke realita ini: tiap step tetap mendefinisikan **kriteria sukses konkret sebelum implementasi** (assertion `grep` untuk markup, atau interaksi browser spesifik untuk perilaku), dijalankan gagal dulu (elemen belum ada) → implementasi → dijalankan lagi sampai lolos → commit. Ini pola yang sama persis dipakai sepanjang sesi sebelumnya untuk `kelas.html`, `bootcamp.html`, dll.

**Tech Stack:** HTML/CSS/JS vanilla, `scripts/course-catalog.js` sebagai data layer, `sessionStorage` untuk state yang perlu "terasa persisten" tanpa backend sungguhan.

**Spec:** `PRD/Crygle-Academy-Flow-Expansion-Spec.md` §6 (§6.1, §6.2, §6.3), `PRD/Crygle-Academy-PRD.md` §18

## Global Constraints

- **Sertifikat Saya (preview)** dari §6.1 **TIDAK masuk Fase 1** — bergantung pada Sistem Sertifikat (§7, Fase 2 yang belum dibangun). Jangan bangun widget kosong untuk sistem yang belum ada (YAGNI). Ditunda ke Fase 2.
- **Course Learning Hub dibangun sebagai file baru** (`course-learning.html`), **bukan** menambah mode ganda ke `course-details.html` — supaya halaman marketing itu tetap sederhana & tidak berubah sama sekali (sesuai keputusan desain §6.2 spec).
- **Course Learning Hub hanya untuk 3 kelas yang sudah "terdaftar"** di panel Course Saya (`ui-ux-jual-produk` default, `animasi-3d-blender`, `bangunan-digital-3d`) — bukan seluruh 10 katalog, karena kelas lain memang belum "dibeli" di data demo.
- **Tidak ada backend sungguhan** — booking & tugas "tersimpan" via `sessionStorage` (per-browser, hilang kalau di-clear), didokumentasikan jelas di tiap komponen sebagai batasan versi demo, bukan disembunyikan.
- **Jangan mengarang attachment/file bootcamp** — kartu "Materi & Attachment Terbaru" di Bootcamp Overview harus pakai empty-state jujur ("belum ada materi diupload"), bukan nama file karangan, karena tidak ada sumber nyata (per audit §6.3 spec).
- Semua widget baru pakai token CSS yang sudah ada (`styles/variables.css`, `styles/dashboard.css`) — tidak ada bahasa desain baru.
- Setiap task diakhiri hijau: buka halaman di browser lokal, jalankan interaksi yang didefinisikan di step verifikasi, pastikan sesuai ekspektasi persis.

---

### Task 1: Booking Persistence Layer

**Files:**
- Modify: `web`-equivalent tidak dipakai — kerja di `scripts/main.js` (fungsi `initBookingSlotPicker()`)
- Modify: `dashboard.html` (tombol "Konfirmasi Booking Sesi")

**Interfaces:**
- Produces: `sessionStorage` key `crygle-bootcamp-booking` berisi `{ mentorName, slotTime, confirmedAt }` (JSON). Dipakai oleh Task 4 (Jadwal Personal Minggu Ini widget) dan bisa dipakai ulang nanti oleh Mentor Portal (Fase 3, di luar cakupan plan ini).

- [x] **Step 1: Definisikan kriteria sukses (pengganti "failing test")**

Buka `dashboard.html` di browser lokal, ke panel Bootcamp Saya → sub-tab Booking Konsultasi, klik mentor + slot + "Konfirmasi Booking Sesi", lalu jalankan di console:
```js
JSON.parse(sessionStorage.getItem('crygle-bootcamp-booking'))
```
**Ekspektasi saat ini (sebelum implementasi): `null`** — konfirmasi bug ini nyata sebelum memperbaikinya.

- [x] **Step 2: Implementasi — tambah penyimpanan di `initBookingSlotPicker()`**

Cari fungsi `initBookingSlotPicker()` di `scripts/main.js` (dekat baris 1306), cari event listener tombol `#btn-confirm-booking`, tambahkan sebelum/sesudah `showToastNotification(...)`:

```javascript
confirmBtn.addEventListener('click', () => {
  const mentorName = summaryMentor ? summaryMentor.textContent : '';
  const slotTime = summarySlot ? summarySlot.textContent : '';
  sessionStorage.setItem('crygle-bootcamp-booking', JSON.stringify({
    mentorName,
    slotTime,
    confirmedAt: new Date().toISOString(),
  }));
  showToastNotification(`🎉 Sesi bimbingan bersama ${mentorName} (${slotTime}) berhasil dipesan!`);
});
```

*(Cari listener `#btn-confirm-booking` yang sudah ada — kemungkinan besar cuma berisi `showToastNotification(...)`. Tambahkan baris `sessionStorage.setItem` sebelum toast, jangan buat listener baru/duplikat.)*

- [x] **Step 3: Verifikasi ulang kriteria sukses**

Ulangi Step 1. **Ekspektasi sekarang:** `{mentorName: "Dimas Pradipa", slotTime: "10:00 – 10:45 WIB", confirmedAt: "..."}`.

- [x] **Step 4: Commit**

```bash
git add scripts/main.js
git commit -m "feat: persist bootcamp consultation booking to sessionStorage"
```

---

### Task 2: Tugas Deadline — Tanggal Asli

**Files:**
- Modify: `scripts/course-catalog.js`

**Interfaces:**
- Produces: `CRYGLE_BOOTCAMP_TUGAS` array baru `{ title, status: 'selesai'|'aktif', score, deadlineISO }`. Dipakai Task 5 (Tenggat Terdekat).

- [x] **Step 1: Kriteria sukses**

`typeof CRYGLE_BOOTCAMP_TUGAS !== 'undefined' && CRYGLE_BOOTCAMP_TUGAS.length === 3` harus `true` di console setelah Step 2 — sebelum implementasi, ini `false` (variabel belum ada).

- [x] **Step 2: Implementasi — tambahkan ke `scripts/course-catalog.js`**

Data ini port dari 3 kartu tugas yang sudah nyata di `dashboard.html` (§10.5 Bootcamp) — cuma menambahkan field tanggal ISO yang tidak ada sebelumnya (sebelumnya cuma teks "2 HARI LAGI"). Tanggal dihitung mundur dari **6 September 2026** (hari ini) supaya "2 hari lagi" tetap konsisten dengan teks yang sudah ada:

```javascript
// Port dari dashboard.html baris 615-660 (Sub-Tab 3: Pengumpulan Tugas).
// deadlineISO ditambahkan baru — sumber teks aslinya cuma "⏳ DEADLINE: 2 HARI LAGI" tanpa tanggal absolut.
const CRYGLE_BOOTCAMP_TUGAS = [
  { title: 'Tugas 1: Riset Tren Desain di UI8 & Freepik', status: 'selesai', score: 90, deadlineISO: null },
  { title: 'Tugas 2: Design Tokens, Varian & Typography', status: 'selesai', score: 88, deadlineISO: null },
  { title: 'Tugas 3: Desain 10 Screen Inti Dashboard UI Kit', status: 'aktif', score: null, deadlineISO: '2026-09-08' },
];
```

- [x] **Step 3: Verifikasi ulang** — muat `course-catalog.js` di halaman manapun, cek `CRYGLE_BOOTCAMP_TUGAS[2].deadlineISO === '2026-09-08'`.

- [x] **Step 4: Commit**

```bash
git add scripts/course-catalog.js
git commit -m "feat: add real deadline dates to bootcamp tugas data"
```

---

### Task 3: Overview Widgets Batch A — Peta Kompetensi, Rekomendasi Kelas, Linimasa Aktivitas

**Files:**
- Modify: `dashboard.html` (panel `#panel-overview`)
- Modify: `scripts/main.js` (fungsi baru `initOverviewWidgets()`)

**Interfaces:**
- Consumes: `data-category` pada `.dashboard-course-card` (sudah ada), `CRYGLE_COURSES` dari `course-catalog.js` (sudah ada)
- Produces: 3 blok HTML baru dengan id `#widget-peta-kompetensi`, `#widget-rekomendasi-kelas`, `#widget-linimasa`

- [x] **Step 1: Kriteria sukses**

Buka `dashboard.html`, panel Overview. **Sebelum implementasi:** ketiga id di atas tidak ditemukan (`document.getElementById(...)` semua `null`).

- [x] **Step 2: Tambah markup di `dashboard.html`**, setelah blok `.overview-activity-card` yang sudah ada (akhir dari `#panel-overview`):

```html
<!-- Peta Kompetensi (Flow Expansion Spec §6.1) -->
<div class="overview-activity-card" id="widget-peta-kompetensi">
  <h3 style="font-size: 16px; font-weight: 800; color: #202020; margin-bottom: 16px;">Peta Kompetensi</h3>
  <div id="peta-kompetensi-bars"></div>
</div>

<!-- Rekomendasi Kelas Berikutnya -->
<div class="overview-activity-card" id="widget-rekomendasi-kelas">
  <h3 style="font-size: 16px; font-weight: 800; color: #202020; margin-bottom: 16px;">Rekomendasi Kelas Berikutnya</h3>
  <div id="rekomendasi-kelas-list" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;"></div>
</div>

<!-- Linimasa Aktivitas (data demo statis, konsisten dgn progres 60%/30%/25% yang sudah ada di Course Saya) -->
<div class="overview-activity-card" id="widget-linimasa">
  <h3 style="font-size: 16px; font-weight: 800; color: #202020; margin-bottom: 16px;">Linimasa Aktivitas</h3>
  <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; color: #5A6062;">
    <li>✅ Menyelesaikan Modul 3 — 3D Design Animation Blender · 2 jam lalu</li>
    <li>📝 Mengumpulkan Tugas 2: Design Tokens & Varian · Kemarin</li>
    <li>▶ Memulai Modul 2 — Research Pasar (UI/UX Design) · 3 hari lalu</li>
  </ul>
</div>
```

- [x] **Step 3: Tambah `initOverviewWidgets()` di `scripts/main.js`**, panggil di `DOMContentLoaded` (tambahkan setelah `initDashboardHashRouter();`):

```javascript
function initOverviewWidgets() {
  const kompetensiEl = document.getElementById('peta-kompetensi-bars');
  const rekomendasiEl = document.getElementById('rekomendasi-kelas-list');
  if (!kompetensiEl && !rekomendasiEl) return; // bukan dashboard.html

  // Peta Kompetensi — dihitung dari data-category kartu Course Saya yang sudah ada
  if (kompetensiEl) {
    const cards = document.querySelectorAll('.dashboard-course-card');
    const categoryLabels = { design: 'UI/UX Design', '3d': '3D & Animation', code: 'Front-End Coding', ai: 'AI for Designers' };
    const counts = {};
    cards.forEach((card) => {
      const cat = card.dataset.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const total = cards.length;
    kompetensiEl.innerHTML = Object.keys(categoryLabels).map((cat) => {
      const pct = total ? Math.round(((counts[cat] || 0) / total) * 100) : 0;
      return `
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
            <span>${categoryLabels[cat]}</span><span style="font-weight: 700;">${pct}%</span>
          </div>
          <div style="width: 100%; height: 8px; background: #E9E9E9; border-radius: 20px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--color-primary); border-radius: 20px;"></div>
          </div>
        </div>`;
    }).join('');
  }

  // Rekomendasi Kelas Berikutnya — 2 kelas dari kategori yang BELUM ada di Course Saya
  if (rekomendasiEl && typeof CRYGLE_COURSES !== 'undefined') {
    const takenCategories = new Set(Array.from(document.querySelectorAll('.dashboard-course-card')).map((c) => c.dataset.category));
    const recommended = Object.entries(CRYGLE_COURSES)
      .filter(([slug, course]) => course && !takenCategories.has(course.category === 'Front-End Coding' ? 'code' : course.category === '3D & Animation' ? '3d' : course.category === 'AI for Designers' ? 'ai' : 'design'))
      .slice(0, 2);
    rekomendasiEl.innerHTML = recommended.map(([slug, course]) => `
      <a href="course-details.html?slug=${slug}" style="text-decoration: none; color: inherit; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; display: block;">
        <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 100px; object-fit: cover;">
        <div style="padding: 10px;">
          <div style="font-size: 13px; font-weight: 700; color: #202020; line-height: 1.3; margin-bottom: 4px;">${course.title}</div>
          <div style="font-size: 12px; color: var(--color-primary); font-weight: 700;">${course.price}</div>
        </div>
      </a>`).join('');
  }
}
```

- [x] **Step 4: Verifikasi ulang** — reload `dashboard.html`, panel Overview. Peta Kompetensi harus tampil bar "UI/UX Design" & "3D & Animation" (2 kategori nyata dari 3 kartu Course Saya). Rekomendasi Kelas harus tampil 2 kartu dari kategori Front-End/AI/Vector yang belum diambil.

- [x] **Step 5: Commit**

```bash
git add dashboard.html scripts/main.js
git commit -m "feat: add Peta Kompetensi, Rekomendasi Kelas, and Linimasa Aktivitas widgets to Overview"
```

---

### Task 4: Overview Widgets Batch B — Tenggat Terdekat & Jadwal Personal Minggu Ini

**Files:**
- Modify: `dashboard.html`
- Modify: `scripts/main.js` (tambahan di `initOverviewWidgets()`)

**Interfaces:**
- Consumes: `CRYGLE_BOOTCAMP_TUGAS` (Task 2), `sessionStorage['crygle-bootcamp-booking']` (Task 1)

- [x] **Step 1: Kriteria sukses**

Sebelum implementasi: widget ini tidak ada di DOM. **Kasus uji 2 kondisi:**
- (a) Belum booking apapun → widget Jadwal Personal harus tampil state kosong "Belum ada jadwal personal minggu ini."
- (b) Sudah booking (dari Task 1) → widget harus menampilkan slot yang dibooking.

- [x] **Step 2: Tambah markup** (setelah widget Batch A di `dashboard.html`):

```html
<div class="overview-activity-card" id="widget-tenggat-terdekat">
  <h3 style="font-size: 16px; font-weight: 800; color: #202020; margin-bottom: 16px;">Tenggat Terdekat</h3>
  <div id="tenggat-terdekat-list" style="display: flex; flex-direction: column; gap: 10px;"></div>
</div>

<div class="overview-activity-card" id="widget-jadwal-personal">
  <h3 style="font-size: 16px; font-weight: 800; color: #202020; margin-bottom: 16px;">Jadwal Personal Minggu Ini</h3>
  <div id="jadwal-personal-content"></div>
</div>
```

- [x] **Step 3: Tambah logika di `initOverviewWidgets()`** (di dalam fungsi yang sama dari Task 3):

```javascript
  // Tenggat Terdekat — dari CRYGLE_BOOTCAMP_TUGAS yang punya deadlineISO
  const tenggatEl = document.getElementById('tenggat-terdekat-list');
  if (tenggatEl && typeof CRYGLE_BOOTCAMP_TUGAS !== 'undefined') {
    const upcoming = CRYGLE_BOOTCAMP_TUGAS.filter((t) => t.deadlineISO);
    tenggatEl.innerHTML = upcoming.length
      ? upcoming.map((t) => {
          const daysLeft = Math.ceil((new Date(t.deadlineISO) - new Date('2026-09-06')) / 86400000);
          const badge = daysLeft <= 0 ? 'Hari ini' : `H-${daysLeft}`;
          return `<div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
            <span>${t.title}</span>
            <span style="background: #FFF1F0; color: #E02B20; font-weight: 700; padding: 3px 10px; border-radius: 20px; font-size: 11px;">${badge}</span>
          </div>`;
        }).join('')
      : '<p style="font-size: 13px; color: #797979;">Tidak ada tenggat mendatang.</p>';
  }

  // Jadwal Personal Minggu Ini — dari sessionStorage booking (Task 1)
  const jadwalEl = document.getElementById('jadwal-personal-content');
  if (jadwalEl) {
    let booking = null;
    try { booking = JSON.parse(sessionStorage.getItem('crygle-bootcamp-booking')); } catch (e) { /* ignore corrupt data */ }
    jadwalEl.innerHTML = booking
      ? `<div style="font-size: 13px;"><strong>Konsultasi Mentor:</strong> ${booking.mentorName}<br><span style="color: #797979;">${booking.slotTime}</span></div>`
      : '<p style="font-size: 13px; color: #797979;">Belum ada jadwal personal minggu ini. <a href="#bootcamp" style="color: var(--color-primary); font-weight: 600;">Booking konsultasi mentor</a> untuk mengisi slot.</p>';
  }
```

- [x] **Step 4: Verifikasi ulang kedua kasus uji Step 1** — kosongkan `sessionStorage` dulu (`sessionStorage.clear()`), reload, cek state kosong. Lakukan booking via panel Bootcamp (Task 1), kembali ke Overview, cek widget terisi.

- [x] **Step 5: Commit**

```bash
git add dashboard.html scripts/main.js
git commit -m "feat: add Tenggat Terdekat and Jadwal Personal widgets to Overview"
```

---

### Task 5: Course Learning Hub — Kerangka Halaman & Header Dinamis

**Files:**
- Create: `course-learning.html`
- Modify: `scripts/course-catalog.js` (tambah field `moduleList` per kelas terdaftar)

**Interfaces:**
- Consumes: `CRYGLE_COURSES`, `CRYGLE_ENROLLED_PROGRESS` (sudah ada)
- Produces: `initCourseLearningHub()` di `main.js`, dipakai Task 6-7

- [x] **Step 1: Kriteria sukses**

Buka `course-learning.html?slug=animasi-3d-blender` (belum ada filenya — 404). Setelah implementasi: halaman termuat, judul "3D Design : Membuat Animation 3D Produk di Blender", sidebar menampilkan "30%" dan "3 dari 8 Modul" (bukan harga).

- [x] **Step 2: Buat `course-learning.html`** — struktur mengikuti `course-details.html` (navbar, breadcrumb, `course-detail-grid`, 5 tab) tapi sidebar diganti total:

```html
<!-- Sidebar kanan: GANTI dari harga jadi progress (§6.2 spec) -->
<aside class="course-sticky-sidebar">
  <div class="sidebar-price-block" style="text-align: center;">
    <span class="sidebar-price-label">Progress Belajar</span>
    <div class="sidebar-current-price" id="learning-progress-percent" style="font-size: 36px;">0%</div>
    <div class="dashboard-progress-track" style="margin: 12px 0;">
      <div class="dashboard-progress-fill" id="learning-progress-fill" style="width: 0%;"></div>
    </div>
    <span id="learning-progress-modul" style="font-size: 13px; color: var(--color-text-muted);">0 dari 0 Modul</span>
  </div>
  <a href="#" class="btn btn-primary sidebar-btn-cta" id="learning-continue-btn">Lanjutkan Belajar</a>
</aside>
```

Tab nav pakai 5 label: `Overview`, `Kurikulum Kelas`, `Attachment & Materi`, `Asesmen & Quiz`, `Tentang Mentor`, `Reviews` (6 total — tambahan dari `course-details.html` yang cuma 4). Body tab kosongkan dulu (`<div class="course-tab-pane" id="tab-overview"></div>` dst.) — diisi Task 6-7. Sertakan `<script src="scripts/course-catalog.js"></script>` sebelum `main.js`.

- [x] **Step 3: Tambah `initCourseLearningHub()` di `main.js`**, panggil di `DOMContentLoaded`:

```javascript
function initCourseLearningHub() {
  const progressEl = document.getElementById('learning-progress-percent');
  if (!progressEl || typeof CRYGLE_COURSES === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || 'ui-ux-jual-produk';
  const course = slug === 'ui-ux-jual-produk'
    ? { title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit', moduleCount: 8 }
    : CRYGLE_COURSES[slug];
  if (!course) return;

  const progress = slug === 'ui-ux-jual-produk'
    ? { percent: 60, doneModules: 5, colorClass: 'progress-green' }
    : (CRYGLE_ENROLLED_PROGRESS[slug] || { percent: 0, doneModules: 0, colorClass: 'progress-yellow' });

  document.title = `${course.title} — Sedang Dipelajari — Crygle Academy`;
  document.getElementById('course-title-h1').textContent = course.title;
  progressEl.textContent = `${progress.percent}%`;
  const fillEl = document.getElementById('learning-progress-fill');
  fillEl.style.width = `${progress.percent}%`;
  fillEl.classList.add(progress.colorClass);
  document.getElementById('learning-progress-modul').textContent = `${progress.doneModules} dari ${course.moduleCount} Modul`;
  document.getElementById('learning-continue-btn').href = `classroom.html${slug === 'ui-ux-jual-produk' ? '' : `?course=${slug}`}`;
}
```

*(Catatan: flagship `ui-ux-jual-produk` sengaja tidak ada di `CRYGLE_COURSES` karena entrinya `null` — data title/progress-nya di-hardcode di atas mengikuti pola yang sama dengan `course-details.html`/`classroom.html` untuk flagship.)*

- [x] **Step 4: Verifikasi ulang Step 1**, plus cek `course-learning.html` (tanpa param, default flagship) menampilkan "60%" dan "5 dari 8 Modul".

- [x] **Step 5: Commit**

```bash
git add course-learning.html scripts/main.js
git commit -m "feat: scaffold Course Learning Hub page with dynamic progress sidebar"
```

---

### Task 6: Course Learning Hub — Tab Kurikulum Upgrade

**Files:**
- Modify: `course-learning.html` / `scripts/main.js` (`initCourseLearningHub()`)

**Interfaces:**
- Consumes: struktur modul yang sudah ada di `classroom.html` (referensi konten, bukan diklaim ulang sebagai data terpisah)

- [x] **Step 1: Kriteria sukses** — tab Kurikulum kosong sebelum implementasi. Setelah implementasi, untuk `?slug=animasi-3d-blender`: 8 baris modul, 3 pertama beri ikon ✅, sisanya 🔒, semua diklik mengarah ke `classroom.html?course=animasi-3d-blender`.

- [x] **Step 2: Tambah rendering kurikulum** di `initCourseLearningHub()`:

```javascript
  const curriculumEl = document.getElementById('tab-curriculum');
  if (curriculumEl) {
    let rows = '';
    for (let i = 1; i <= course.moduleCount; i += 1) {
      const isDone = i <= progress.doneModules;
      const isActive = i === progress.doneModules + 1;
      const icon = isDone ? '✅' : isActive ? '▶' : '🔒';
      const href = slug === 'ui-ux-jual-produk' ? 'classroom.html' : `classroom.html?course=${slug}`;
      rows += `<a href="${href}" class="curriculum-lesson-item" style="text-decoration:none; color:inherit; display:flex; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--color-border);">
        <span>${icon} Modul ${i}${isDone ? ' — Selesai' : isActive ? ' — Sedang Berjalan' : ' — Terkunci'}</span>
      </a>`;
    }
    curriculumEl.innerHTML = `<h3 class="overview-heading" style="margin-bottom:16px;">Kurikulum Kelas</h3>${rows}`;
  }
```

- [x] **Step 3: Verifikasi ulang** Step 1 di browser.

- [x] **Step 4: Commit**

```bash
git add scripts/main.js
git commit -m "feat: build Course Learning Hub curriculum tab with real progress state"
```

---

### Task 7: Course Learning Hub — Tab Attachment & Materi, Asesmen & Quiz

**Files:**
- Modify: `scripts/main.js` (`initCourseLearningHub()`)

**Interfaces:**
- Consumes: `progress.doneModules` (Task 5) untuk logika lock/unlock

- [x] **Step 1: Kriteria sukses** — kedua tab kosong sebelum implementasi. Setelah implementasi: attachment untuk modul > `doneModules` tampil dengan ikon 🔒 dan tidak bisa diklik (tanpa `href`); attachment untuk modul ≤ `doneModules` bisa diklik.

- [x] **Step 2: Tambah rendering** di `initCourseLearningHub()`:

```javascript
  const attachmentEl = document.getElementById('tab-attachment');
  const quizEl = document.getElementById('tab-quiz');
  if (attachmentEl) {
    let rows = '';
    for (let i = 1; i <= course.moduleCount; i += 1) {
      const unlocked = i <= progress.doneModules;
      rows += unlocked
        ? `<div class="resource-download-pill"><span>📎 Materi Modul ${i}.fig</span></div>`
        : `<div class="resource-download-pill" style="opacity:0.5;"><span>🔒 Materi Modul ${i} — selesaikan modul sebelumnya dulu</span></div>`;
    }
    attachmentEl.innerHTML = `<h3 class="overview-heading" style="margin-bottom:16px;">Attachment & Materi</h3>${rows}`;
  }
  if (quizEl) {
    let rows = '';
    for (let i = 1; i <= course.moduleCount; i += 1) {
      const done = i <= progress.doneModules;
      const status = done ? 'Sudah Dikerjakan' : i === progress.doneModules + 1 ? 'Belum Dikerjakan' : 'Terkunci';
      rows += `<div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--color-border);">
        <span>Quiz Modul ${i}</span><span style="color:${done ? '#269C45' : '#797979'}; font-weight:700;">${status}</span>
      </div>`;
    }
    quizEl.innerHTML = `<h3 class="overview-heading" style="margin-bottom:16px;">Asesmen & Quiz</h3>${rows}`;
  }
```

- [x] **Step 3: Verifikasi ulang** Step 1.

- [x] **Step 4: Commit**

```bash
git add scripts/main.js
git commit -m "feat: build Course Learning Hub attachment and quiz tabs with lock state"
```

---

### Task 8: Wire Course Saya Cards ke Course Learning Hub

**Files:**
- Modify: `dashboard.html` (3 kartu `.dashboard-course-card`)

**Interfaces:** tidak ada (murni ubah `href`)

- [x] **Step 1: Kriteria sukses** — 3 kartu Course Saya saat ini mengarah langsung ke `classroom.html`(`?course=`). Setelah Task 8: mengarah ke `course-learning.html`(`?slug=`).

- [x] **Step 2: Ubah href 3 kartu** di `dashboard.html`:
  - Card 1 (flagship): `href="classroom.html"` → `href="course-learning.html"`
  - Card 2 (3D Blender): `href="classroom.html?course=animasi-3d-blender"` → `href="course-learning.html?slug=animasi-3d-blender"`
  - Card 3 (3D Bangunan): `href="classroom.html?course=bangunan-digital-3d"` → `href="course-learning.html?slug=bangunan-digital-3d"`

- [x] **Step 3: Verifikasi ulang** — klik tiap kartu di panel Course Saya, pastikan mendarat di Course Learning Hub yang benar (bukan langsung ke Classroom lagi).

- [x] **Step 4: Commit**

```bash
git add dashboard.html
git commit -m "feat: route Course Saya cards through Course Learning Hub instead of straight to Classroom"
```

---

### Task 9: Bootcamp Overview Sub-View

**Files:**
- Modify: `dashboard.html` (panel `#panel-bootcamp`)
- Modify: `scripts/main.js` (`initBootcampSubTabs()`)

**Interfaces:**
- Consumes: `CRYGLE_BOOTCAMP_TUGAS` (Task 2), tabel Leaderboard & Jadwal yang sudah ada di DOM

- [x] **Step 1: Kriteria sukses** — saat ini buka panel Bootcamp Saya langsung menampilkan sub-tab "Jadwal & Absensi" aktif. Setelah implementasi: sub-tab default adalah "Overview" (baru), dengan 4 kartu ringkasan.

- [x] **Step 2: Tambah sub-tab Overview** di `dashboard.html`, sebagai pane pertama sebelum `#subtab-jadwal`, dan ubah tombol nav `bootcamp-tab-btn` pertama jadi "📊 Overview" dengan `active` dipindah ke situ (dari sebelumnya di tombol Jadwal):

```html
<div class="bootcamp-subtabs-bar">
  <button type="button" class="bootcamp-tab-btn active" data-subtab="subtab-overview">📊 Overview</button>
  <button type="button" class="bootcamp-tab-btn" data-subtab="subtab-jadwal">📅 Jadwal & Absensi (§10.4)</button>
  <!-- 3 tombol lain tetap, hapus class "active" dari tombol Jadwal -->
</div>

<div class="bootcamp-subtab-pane" id="subtab-overview">
  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
    <div class="kpi-metric-card"><span class="kpi-label-text">Sesi Live Berikutnya</span><div id="bootcamp-next-session" style="font-size:14px; font-weight:700; margin-top:8px;"></div></div>
    <div class="kpi-metric-card"><span class="kpi-label-text">Progress Tugas</span><div id="bootcamp-tugas-progress" style="font-size:14px; font-weight:700; margin-top:8px;"></div></div>
    <div class="kpi-metric-card"><span class="kpi-label-text">Peringkat Kamu</span><div id="bootcamp-rank" style="font-size:14px; font-weight:700; margin-top:8px;"></div></div>
    <div class="kpi-metric-card"><span class="kpi-label-text">Materi & Attachment</span><div style="font-size:13px; color:#797979; margin-top:8px;">Belum ada materi diupload mentor untuk cohort ini.</div></div>
  </div>
</div>
<!-- #subtab-jadwal dan sisanya: tambahkan style="display:none;" (dipindah dari default-tampil ke default-sembunyi) -->
```

- [x] **Step 3: Isi data dinamis** — tambah di `initBootcampSubTabs()` (`scripts/main.js`, dipanggil sudah ada di `DOMContentLoaded`):

```javascript
  const nextSessionEl = document.getElementById('bootcamp-next-session');
  if (nextSessionEl) nextSessionEl.textContent = '17 Sep 2026 · Design Tokens, Auto Layout & Atomic System';

  const tugasProgressEl = document.getElementById('bootcamp-tugas-progress');
  if (tugasProgressEl && typeof CRYGLE_BOOTCAMP_TUGAS !== 'undefined') {
    const done = CRYGLE_BOOTCAMP_TUGAS.filter((t) => t.status === 'selesai');
    const avgScore = done.length ? Math.round(done.reduce((sum, t) => sum + t.score, 0) / done.length) : 0;
    tugasProgressEl.textContent = `${done.length} dari ${CRYGLE_BOOTCAMP_TUGAS.length} Tugas · Rata-rata ${avgScore}`;
  }

  const rankEl = document.getElementById('bootcamp-rank');
  if (rankEl) rankEl.textContent = 'Peringkat #2'; // dari tabel Leaderboard yang sudah ada, port manual (4 baris statis)
```

*("17 Sep 2026..." dan "Peringkat #2" adalah port langsung dari baris tabel Jadwal & Leaderboard yang sudah ada di `dashboard.html` — bukan data baru.)*

- [x] **Step 4: Verifikasi ulang** Step 1 — buka panel Bootcamp Saya, pastikan Overview tampil duluan dengan 4 kartu terisi benar, klik tombol Jadwal/Booking/Tugas/Leaderboard tetap berfungsi seperti sebelumnya.

- [x] **Step 5: Commit**

```bash
git add dashboard.html scripts/main.js
git commit -m "feat: add Bootcamp Overview as default sub-tab summarizing cohort status"
```

---

### Task 10: Verifikasi Penuh Fase 1

- [x] **Step 1:** `node --check scripts/main.js` dan `node --check scripts/course-catalog.js` — pastikan tidak ada syntax error.
- [x] **Step 2:** Buka `dashboard.html` lokal — cek 5 widget Overview baru semua terisi data yang benar (bukan kosong/error).
- [x] **Step 3:** Klik tiap 3 kartu Course Saya → mendarat di Course Learning Hub yang benar, cek sidebar progress + 5 tab semua terisi (Overview, Kurikulum dengan lock-state, Attachment, Quiz, Tentang Mentor).
- [x] **Step 4:** Klik "Lanjutkan Belajar" → mendarat di `classroom.html` yang benar.
- [x] **Step 5:** Panel Bootcamp Saya → Overview jadi default, 4 kartu terisi, 4 tombol sub-area masih berfungsi.
- [x] **Step 6:** Lakukan booking konsultasi → kembali ke Overview dashboard → widget Jadwal Personal terisi.
- [x] **Step 7:** Commit checkpoint: `git commit -m "chore: Fase 1 Dashboard Peserta diperdalam — selesai"` (kalau ada perubahan tersisa).
- [x] **Step 8:** Jalankan `superpowers:finishing-a-development-branch` untuk merge/PR sesuai preferensi pengguna saat itu.

## Self-Review Notes

- **Cakupan spec:** §6.1 (5 dari 6 widget — Sertifikat sengaja ditunda ke Fase 2 sesuai Global Constraints), §6.2 (halaman baru penuh, 5 tab), §6.3 (Overview sub-view baru) — semua tercakup.
- **Konsisten dengan audit anti-halu:** Task 1 & 2 sengaja jadi task tersendiri di awal karena §6 spec sudah membuktikan booking TIDAK persisten dan tugas TIDAK punya tanggal asli — dua prasyarat ini harus ada dulu sebelum widget yang bergantung padanya (Task 4) bisa jujur menampilkan data nyata, bukan data kosong yang terlihat rusak.
- **Tidak mengarang konten:** kartu "Materi & Attachment" Bootcamp Overview sengaja pakai empty-state, bukan nama file karangan (Global Constraints).

## Bug Log — Ditemukan Selama Eksekusi (bukan diprediksi plan)

Plan ini ditulis sebelum eksekusi, jadi ada beberapa gap nyata yang baru ketahuan saat coding & verifikasi browser. Dicatat di sini (bukan cuma disebut di chat) supaya tidak hilang kalau sesi terputus. Semua di bawah **sudah diperbaiki & di-commit** pada saat ditemukan — bukan utang.

1. **Task 3 — `dashboard.html` tidak memuat `scripts/course-catalog.js`.** Plan mengasumsikan `CRYGLE_COURSES` sudah tersedia di halaman itu (padahal cuma `classroom.html`/`course-details.html` yang memuatnya). Widget Rekomendasi Kelas render kosong sampai `<script src="scripts/course-catalog.js">` ditambahkan sebelum `main.js`. Fix + commit: `bebd354`.
2. **Task 4 — widget Jadwal Personal tidak update live.** `dashboard.html` adalah SPA hash-router (panel di-toggle `display`, bukan reload), tapi `initOverviewWidgets()` cuma jalan sekali saat `DOMContentLoaded`. Booking baru dari panel Bootcamp tidak pernah muncul di Overview tanpa reload penuh. Fix: pisah jadi `renderJadwalPersonalWidget()`, dipanggil ulang dari handler konfirmasi booking (Task 1). Commit: `aa4a6de`.
3. **Task 5 — potensi crash id collision.** Plan minta reuse id `course-title-h1` di `course-learning.html`, tapi id itu jadi guard `initDynamicCourseDetails()` (fungsi punya `course-details.html`) — begitu guard lolos untuk slug valid non-flagship, fungsi itu langsung nulis ke `#sidebar-current-price` dkk. yang sudah tidak ada di halaman baru (diganti progress bar) → `TypeError`, dan semua `init*()` setelahnya di `DOMContentLoaded` batal jalan untuk 2 dari 3 kelas terdaftar. Fix: id di-rename jadi `learning-course-title-h1` supaya guard lama berhenti duluan, tanpa ubah kode existing. Commit: `0af73a1`.

4. **Task 7 — bukan bug fungsional, tapi dicatat untuk transparansi.** Step 1 plan bilang attachment yang unlocked "bisa diklik", tapi kode Step 2-nya sendiri render semua baris sebagai `<div>` biasa (tanpa `<a>`/`href`) baik locked maupun unlocked — tidak ada satupun yang benar-benar bisa diklik. Ini inkonsistensi teks vs kode di plan, BUKAN diperbaiki, karena tidak ada file download sungguhan untuk di-link (Global Constraints eksplisit melarang mengarang nama file attachment) — jadi div non-klik yang jujur ini justru perilaku yang benar. Tidak ada commit fix karena tidak ada yang perlu diubah.

5. **Task 10 — `tab-overview` & `tab-mentor` tidak pernah diisi Task 5-7.** Task 10 Step 3 sendiri mensyaratkan kedua tab itu "terisi", tapi tidak ada task manapun (5, 6, atau 7) yang menulis kontennya — hanya Kurikulum/Attachment/Quiz yang diisi. Ketahuan pas verifikasi penuh, persis fungsi Task 10. Fix: pakai ulang template `initDynamicCourseDetails()` yang sudah teruji (bukan konten baru), plus tambah field `level`/`category`/`mentor` ke object flagship supaya lookup mentor bisa seragam. `tab-reviews` (tidak masuk checklist Task 10) juga diisi state jujur minimal supaya tidak benar-benar kosong. Commit: `78d9b11`.

Ringkasan: 4 bug fungsional ditemukan & diperbaiki selama eksekusi Fase 1 (poin 1-3 dan 5 di atas — asal Task 3, 4, 5, dan 10), semua sudah di-commit. Ditambah 1 catatan non-bug (poin 4, asal Task 7). Task 8 dan 9 tidak menghasilkan temuan baru.
