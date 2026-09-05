/**
 * course-catalog.js — Sumber data bersama untuk kelas & mentor.
 *
 * Kenapa file ini ada: index.html, kelas.html, dan dashboard.html (Explore Kelas)
 * menampilkan 10 kelas berbeda, tapi sebelumnya cuma 1 kelas (UI/UX flagship) yang
 * punya halaman course-details.html & classroom.html "asli". Klik kelas lain akan
 * tetap menampilkan konten UI/UX — membingungkan.
 *
 * File ini menyediakan data untuk membuat course-details.html & classroom.html
 * merespons `?slug=` secara dinamis (lihat initDynamicCourseDetails &
 * initDynamicClassroom di scripts/main.js), TANPA mengarang kurikulum/lesson
 * spesifik yang tidak ada sumbernya — untuk kelas selain flagship, tab
 * Kurikulum/Overview menampilkan status "segera hadir" yang jujur, sementara
 * data yang memang sudah nyata (harga, rating, mentor yang relevan) ditampilkan
 * akurat. Mentor dipetakan ke mentor.html yang sudah ada — bukan tokoh karangan.
 */

const CRYGLE_MENTORS = {
  dimas: {
    name: 'Dimas Pradipa Abiyuda',
    role: 'Founder & CEO Crygle Academy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: '4.8',
    reviews: '(2.650 Reviews)',
  },
  dion: {
    name: 'Dion Ahza Pratama',
    role: 'Lead 3D & Motion Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: '7+ tahun memproduksi aset 3D & motion graphics komersial di platform global. Pembina utama kelas 3D Blender Crygle Studio.',
    skills: ['Blender 3D', 'Product Render', 'Freepik Seller'],
    rating: '4.9',
    reviews: '(1.420+ Santri)',
  },
  sarah: {
    name: 'Sarah Aulia Rahma',
    role: 'Senior UI/UX Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bio: 'Praktisi product design berpengalaman merancang antarmuka aplikasi fintech dan sistem desain skala enterprise berstandar industri.',
    skills: ['Figma Pro', 'Design System', 'User Research'],
    rating: '4.9',
    reviews: '(1.600+ Santri)',
  },
  fahri: {
    name: 'Fahri Al-Farizi',
    role: 'Principal Frontend Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Software engineer fokus pada rekayasa antarmuka web modern, animasi performa tinggi, dan clean architecture front-end.',
    skills: ['Modern JS', 'Web Animation', 'Front-End UI'],
    rating: '4.8',
    reviews: '(980+ Santri)',
  },
  nadia: {
    name: 'Nadia Putri',
    role: 'Illustrator & Vector Artist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    bio: 'Top-rated vector designer di pasar microstock internasional. Mengajarkan teknik menggambar karakter dan ikon grafis komersial.',
    skills: ['Vector Art', 'Illustration', 'Microstock'],
    rating: '4.9',
    reviews: '(1.100+ Santri)',
  },
};

// slug: identifier di URL (?slug=... untuk course-details, ?course=... untuk classroom)
const CRYGLE_COURSES = {
  'ui-ux-jual-produk': null, // flagship — konten asli course-details.html/classroom.html dipakai apa adanya, tidak di-override.

  'freepik-3d-objek': {
    title: '3D Design : Bagaimana Cara Membuat 3D Objek yang Menjual di Freepik',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    level: 'Basic Level', moduleCount: 6,
    rating: '4.3', ratingCount: '(1.6K Reviews)',
    price: 'Rp0', originalPrice: 'Rp159.000', discount: '100% off',
    mentor: 'dion', category: '3D & Animation',
  },
  'animasi-3d-blender': {
    title: '3D Design : Membuat Animation 3D Produk di Blender',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    level: 'Advanced Level', moduleCount: 8,
    rating: '4.3', ratingCount: '(1.6K Reviews)',
    price: 'Rp99.000', originalPrice: 'Rp449.000', discount: '80% off',
    mentor: 'dion', category: '3D & Animation',
  },
  'bangun-ruang-3d': {
    title: '3D Design : Mengembangkan 3D Objek Menjadi 3D Bangun Ruang',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80',
    level: 'Intermediate Level', moduleCount: 7,
    rating: '4.3', ratingCount: '(1.6K Reviews)',
    price: 'Rp59.000', originalPrice: 'Rp249.000', discount: '76% off',
    mentor: 'dion', category: '3D & Animation',
  },
  'vector-ilustrasi-figma': {
    title: 'Vector Design : Membuat Vector Ilustrasi Menggunakan Figma',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80',
    level: 'Advanced Level', moduleCount: 8,
    rating: '4.3', ratingCount: '(1.6K Reviews)',
    price: 'Rp99.000', originalPrice: 'Rp449.000', discount: '80% off',
    mentor: 'nadia', category: 'UI/UX Design',
  },
  'web-portfolio-frontend': {
    title: 'Front-End : Membuat Web Portfolio Simpel dan Berkelas',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    level: 'Basic Level', moduleCount: 6,
    rating: '4.3', ratingCount: '(1.6K Reviews)',
    price: 'Rp0', originalPrice: 'Rp159.000', discount: '100% off',
    mentor: 'fahri', category: 'Front-End Coding',
  },
  'bangunan-digital-3d': {
    title: '3D Design : Mengembangkan Objek Menjadi Bangunan Digital',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    level: 'Beginner to Pro', moduleCount: 6,
    rating: '4.7', ratingCount: '(620 Siswa)',
    price: 'Rp290.000', originalPrice: 'Rp580.000', discount: '50% off',
    mentor: 'dion', category: '3D & Animation',
  },
  'frontend-modern-slicing': {
    title: 'Front-End Modern: Slicing Desain Figma ke HTML, CSS & JavaScript',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    level: 'Intermediate', moduleCount: 10,
    rating: '4.9', ratingCount: '(1.2K Siswa)',
    price: 'Rp340.000', originalPrice: 'Rp680.000', discount: '50% off',
    mentor: 'fahri', category: 'Front-End Coding',
  },
  'ai-assisted-uiux': {
    title: 'AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
    level: 'Trending 2026', moduleCount: 5,
    rating: '5.0', ratingCount: '(820 Siswa)',
    price: 'Rp280.000', originalPrice: 'Rp560.000', discount: '50% off',
    mentor: 'sarah', category: 'AI for Designers',
  },
  'fintech-banking-design': {
    title: 'Fintech & Banking App Design: Master Auto Layout & Design System',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    level: 'Advanced', moduleCount: 7,
    rating: '4.8', ratingCount: '(710 Siswa)',
    price: 'Rp350.000', originalPrice: 'Rp700.000', discount: '50% off',
    mentor: 'sarah', category: 'UI/UX Design',
  },
};

// Progress nyata untuk 2 kelas yang sudah "terdaftar" di panel Course Saya dashboard.html
// (dashboard.html baris 428-462) — dipakai classroom.html biar konsisten dengan kartu dashboard.
const CRYGLE_ENROLLED_PROGRESS = {
  'animasi-3d-blender': { percent: 30, doneModules: 3, colorClass: 'progress-yellow' },
  'bangunan-digital-3d': { percent: 25, doneModules: 2, colorClass: 'progress-yellow' },
};

// Port dari dashboard.html baris 615-660 (Sub-Tab 3: Pengumpulan Tugas Mingguan, PRD §10.5).
// deadlineISO ditambahkan baru (Flow Expansion Fase 1, Task 2) — sumber teks aslinya cuma
// "⏳ DEADLINE: 2 HARI LAGI" tanpa tanggal absolut, dihitung mundur dari 6 September 2026 (hari ini).
const CRYGLE_BOOTCAMP_TUGAS = [
  { title: 'Tugas 1: Riset Tren Desain di UI8 & Freepik', status: 'selesai', score: 90, deadlineISO: null },
  { title: 'Tugas 2: Design Tokens, Varian & Typography', status: 'selesai', score: 88, deadlineISO: null },
  { title: 'Tugas 3: Desain 10 Screen Inti Dashboard UI Kit', status: 'aktif', score: null, deadlineISO: '2026-09-08' },
];
