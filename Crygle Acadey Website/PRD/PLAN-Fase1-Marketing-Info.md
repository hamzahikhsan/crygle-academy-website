# Fase 1: Marketing &amp; Info — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Baca dulu:** `HANDOFF-Context-untuk-AI-Agent.md` — berisi ledger `'use client'`, gotcha teknis, dan keputusan yang sudah dikonfirmasi.

**Goal:** Isi 5 halaman stub (Home, Katalog, Course Details, Mentor, Tentang) dengan konten asli yang diport dari `index.html`, `course-details.html`, `mentor.html`, `tentang.html` — memakai komponen Design System resmi dan satu sumber data bersama (`src/data/*.ts`).

**Architecture:** Tiap halaman besar dipecah jadi sub-komponen presentational (satu file per section) yang di-compose di `page.tsx`. Data course/mentor/testimoni/FAQ hidup di `src/data/*.ts` — dipakai ulang oleh Fase 2-4 juga.

**Tech Stack:** Next.js 14 App Router, TypeScript, Vitest + React Testing Library (sama seperti Fase 0).

**Spec:** `PRD/Crygle-Academy-Migration-Spec.md`, `PRD/Crygle-Academy-PRD.md` §9.1–4, §9.12 (Mentor card pattern)

## Global Constraints

- Semua konten harus persis sama dengan HTML sumber — harga, nama, angka, copy. Jangan parafrase.
- Komponen baru yang punya `onClick`/`onChange`/`useState` wajib `'use client'` (lihat ledger di HANDOFF §3).
- Setiap task diakhiri hijau: `npx tsc --noEmit` dan `npx vitest run` tanpa error sebelum lanjut task berikutnya.
- **Rekonsiliasi harga UI/UX flagship**: `course-details.html` &amp; `index.html` sepakat di **Rp449.000 (coret Rp899.000, 50% off)** — pakai angka ini sebagai kebenaran di `courses.ts`.
- **Koreksi (ditulis ulang setelah membaca `dashboard.html` §Explore Kelas secara penuh di sesi Fase 3):** panel "Explore Kelas" **bukan** representasi harga berbeda dari 6 kelas yang sama di `courses.ts` — itu katalog terpisah berisi 6 course dengan sebagian besar nama, kategori (`design`/`3d`/`code`/`ai`, termasuk kategori "AI for Designers" yang tidak ada di `courses.ts` sama sekali), format harga (`Rp 350.000` spasi vs `Rp. 449.000` titik), dan format rating (`★ 4.9 (1.6K Siswa)` vs `4.3 (1.6K Reviews)`) yang berbeda dari `courses.ts`. Ini bukan inkonsistensi yang perlu "diperbaiki" — ini dua dataset asli yang memang berbeda di 12 halaman sumber. **Keputusan final:** Fase 3 membuat `exploreCourses.ts` terpisah (lihat `PLAN-Fase3-Dashboard-Learning.md` Task 4) berisi konten Explore Kelas apa adanya, **tidak** digabung ke `courses.ts`. Ralat ini menggantikan klaim yang salah di versi awal dokumen ini dan di Self-Review Notes di bawah.

---

### Task 1: Data layer bersama (`src/data/*.ts`)

**Files:**
- Create: `web/src/data/courses.ts`
- Create: `web/src/data/mentors.ts`
- Create: `web/src/data/testimonials.ts`
- Create: `web/src/data/faq.ts`
- Create: `web/src/data/alumniWork.ts`
- Create: `web/src/data/programs.ts`
- Test: `web/src/data/data.test.ts`

**Interfaces:**
- Produces: `courses: Course[]`, `mentors: Mentor[]`, `testimonials: Testimonial[]`, `faqItems: FaqItem[]`, `alumniWork: AlumniWorkItem[]`, `programs: Program[]` — semua fase mengimpor tipe &amp; data dari sini.

- [ ] **Step 1: Write the failing test**

```typescript
// web/src/data/data.test.ts
import { describe, expect, it } from 'vitest';
import { courses } from './courses';
import { mentors } from './mentors';
import { testimonials } from './testimonials';
import { faqItems } from './faq';
import { alumniWork } from './alumniWork';
import { programs } from './programs';

describe('shared data layer', () => {
  it('has 6 popular courses with the flagship UI/UX course priced correctly', () => {
    expect(courses).toHaveLength(6);
    const flagship = courses.find((c) => c.slug === 'ui-ux-menjual-produk-ui-kit');
    expect(flagship?.price).toBe('Rp. 449.000');
    expect(flagship?.originalPrice).toBe('Rp. 899.000');
    expect(flagship?.discount).toBe('50% off');
  });

  it('has 7 mentors including founder Dimas Pradipa Abiyuda', () => {
    expect(mentors).toHaveLength(7);
    const dimas = mentors.find((m) => m.slug === 'dimas-pradipa-abiyuda');
    expect(dimas?.role).toBe('Founder & CEO Crygle Academy');
  });

  it('has 1 testimonial from Andi Hidayat', () => {
    expect(testimonials).toHaveLength(1);
    expect(testimonials[0].name).toBe('Andi Hidayat');
  });

  it('has 8 FAQ items, first one about who can join', () => {
    expect(faqItems).toHaveLength(8);
    expect(faqItems[0].question).toBe('Siapa saja yang bisa ikut kelas di CRYGLE Academy?');
  });

  it('has 6 alumni work items', () => {
    expect(alumniWork).toHaveLength(6);
  });

  it('has 4 program cards with Kreatif Design active by default', () => {
    expect(programs).toHaveLength(4);
    expect(programs.find((p) => p.id === 'design')?.active).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/data/data.test.ts`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Create `web/src/data/courses.ts`** — 6 kelas dari `index.html` §4 "Kelas Populer" (baris 393–545)

```typescript
export interface Course {
  slug: string;
  title: string;
  level: string;
  rating: number;
  reviews: string;
  price: string;
  discount: string | null;
  originalPrice: string | null;
  image: string;
}

export const courses: Course[] = [
  {
    slug: '3d-objek-menjual-freepik',
    title: '3D Design : Bagaimana Cara Membuat 3D Objek yang Menjual di Freepik',
    level: 'Basic Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 0',
    discount: '100% off',
    originalPrice: 'Rp. 159.000',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: '3d-animasi-produk-blender',
    title: '3D Design : Membuat Animation 3D Produk di Blender',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 99.000',
    discount: '80% off',
    originalPrice: 'Rp. 449.000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'ui-ux-menjual-produk-ui-kit',
    title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 449.000',
    discount: '50% off',
    originalPrice: 'Rp. 899.000',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: '3d-bangun-ruang',
    title: '3D Design : Mengembangkan 3D Objek Menjadi 3D Bangun Ruang',
    level: 'Intermediate Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 59.000',
    discount: '76% off',
    originalPrice: 'Rp. 249.000',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'vector-ilustrasi-figma',
    title: 'Vector Design : Membuat Vector Ilustrasi Menggunakan Figma',
    level: 'Advanced Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 99.000',
    discount: '80% off',
    originalPrice: 'Rp. 449.000',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'web-portfolio-simpel',
    title: 'Front-End : Membuat Web Portfolio Simpel dan Berkelas',
    level: 'Basic Level Class |',
    rating: 4.3,
    reviews: '(1.6K Reviews)',
    price: 'Rp. 0',
    discount: '100% off',
    originalPrice: 'Rp. 159.000',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  },
];
```

- [ ] **Step 4: Create `web/src/data/mentors.ts`** — 6 mentor dari `mentor.html` + Dimas dari `course-details.html` tab "Tentang Mentor" (baris 382–434)

```typescript
export interface Mentor {
  slug: string;
  name: string;
  role: string;
  rating: number;
  students: string;
  bio: string;
  skills: string[];
  image: string;
}

export const mentors: Mentor[] = [
  {
    slug: 'dimas-pradipa-abiyuda',
    name: 'Dimas Pradipa Abiyuda',
    role: 'Founder & CEO Crygle Academy',
    rating: 4.8,
    students: '3.000 Siswa',
    bio: 'Seorang UI/UX Designer berpengalaman yang telah berhasil membuat dan menjual berbagai produk UI Kit di marketplace internasional seperti UI8, sekaligus CEO & Founder CRYGLE Academy, dengan pengalaman lebih dari 4 tahun di bidang UI/UX serta 3 tahun mengajar di lembaga pendidikan formal tingkat SMK.',
    skills: ['UI/UX Design', 'Figma Pro', 'UI Kit Monetization'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'dion-ahza-pratama',
    name: 'Dion Ahza Pratama',
    role: 'Lead 3D & Motion Director',
    rating: 4.9,
    students: '1.420+ Santri',
    bio: '7+ tahun memproduksi aset 3D & motion graphics komersial di platform global. Pembina utama kelas 3D Blender Crygle Studio.',
    skills: ['Blender 3D', 'Product Render', 'Freepik Seller'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'sarah-aulia-rahma',
    name: 'Sarah Aulia Rahma',
    role: 'Senior UI/UX Specialist',
    rating: 4.9,
    students: '1.600+ Santri',
    bio: 'Praktisi product design berpengalaman merancang antarmuka aplikasi fintech dan sistem desain skala enterprise berstandar industri.',
    skills: ['Figma Pro', 'Design System', 'User Research'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'fahri-al-farizi',
    name: 'Fahri Al-Farizi',
    role: 'Principal Frontend Engineer',
    rating: 4.8,
    students: '980+ Santri',
    bio: 'Software engineer fokus pada rekayasa antarmuka web modern, animasi performa tinggi, dan clean architecture front-end.',
    skills: ['Modern JS', 'Web Animation', 'Front-End UI'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'hendra-wijaya',
    name: 'Dr. Ir. Hendra Wijaya, M.T.',
    role: 'Robotics & Embedded IoT',
    rating: 5.0,
    students: '750+ Santri',
    bio: 'Dosen dan peneliti robotika terkemuka. Pembimbing kompetisi robotika nasional dengan pendekatan riset aplikatif ramah santri.',
    skills: ['Arduino', 'IoT Automation', 'Robotics'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'nadia-putri',
    name: 'Nadia Putri',
    role: 'Illustrator & Vector Artist',
    rating: 4.9,
    students: '1.100+ Santri',
    bio: 'Top-rated vector designer di pasar microstock internasional. Mengajarkan teknik menggambar karakter dan ikon grafis komersial.',
    skills: ['Vector Art', 'Illustration', 'Microstock'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  },
  {
    slug: 'reza-kurniawan',
    name: 'Reza Kurniawan',
    role: 'Career Coach & Portfolio Lead',
    rating: 4.9,
    students: '890+ Santri',
    bio: 'Spesialis kurasi portofolio santri bootcamp. Membantu mempersiapkan CV, interview simulasi, dan penyaluran bakat ke ekosistem industri.',
    skills: ['Career Prep', 'Portfolio Curation', 'Sanbercode Model'],
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
  },
];
```

*(Catatan: Dimas dipakai `image` yang sama seperti Dion di HTML sumber — ini duplikasi foto yang sudah ada di source asli, bukan kesalahan transkripsi. Boleh diganti foto lain kalau ada aset baru.)*

- [ ] **Step 5: Create `web/src/data/testimonials.ts`** — dari `index.html` baris 655–697

```typescript
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Andi Hidayat',
    role: 'Peserta Creative Coding · Siswa SMK Asrama',
    quote:
      'Awalnya aku nggak ngerti coding sama sekali dan bingung harus mulai dari mana. Setelah ikut Crygle Academy, materinya gampang dipahami karena step by step. Sekarang aku sudah bisa bikin game sederhana sendiri!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
];
```

- [ ] **Step 6: Create `web/src/data/faq.ts`** — 8 item dari `index.html` baris 897–990

```typescript
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Siapa saja yang bisa ikut kelas di CRYGLE Academy?',
    answer:
      'CRYGLE Academy dirancang khusus untuk pemula mulai dari tingkat SD, SMP, hingga SMK. Materi kami disusun bertahap (step-by-step) dari pemahaman dasar hingga menghasilkan karya nyata yang dapat diandalkan.',
  },
  {
    question: 'Apakah saya membutuhkan laptop berspesifikasi tinggi?',
    answer:
      'Tidak perlu laptop mahal. Untuk kelas UI/UX Design dan Web Coding dasar, browser modern dan laptop standar sekolah sudah sangat cukup karena kita memanfaatkan alat berbasis cloud seperti Figma dan web editor.',
  },
  {
    question: 'Bagaimana ritme belajar untuk siswa sekolah asrama (Boarding School)?',
    answer:
      'Jadwal belajar sangat fleksibel. Video materi dapat diakses kapan saja selama jam bebas asrama, dan sesi konsultasi mentor dapat dibooking pada akhir pekan atau slot jam khusus yang telah disepakati bersama pihak sekolah mitra.',
  },
  {
    question: 'Apakah materi kelas bisa diakses selamanya?',
    answer:
      'Ya, betul sekali! Sekali kamu mendaftar di kelas Crygle Academy, kamu mendapatkan akses seumur hidup (lifetime access) ke modul video, file latihan, serta update materi di masa mendatang.',
  },
  {
    question: 'Apakah ada sertifikat resmi setelah menyelesaikan kelas?',
    answer:
      'Setiap peserta yang menyelesaikan 100% modul dan mengunggah tugas/portofolio akhir akan mendapatkan Sertifikat Kompetensi Digital resmi dari Crygle Academy yang dapat dilampirkan dalam portofolio akademik.',
  },
  {
    question: 'Bagaimana jika saya mengalami kendala saat mempraktikkan materi?',
    answer:
      'Kamu bisa langsung bertanya di Grup Komunitas Diskusi (WhatsApp Group) bersama mentor dan teman seangkatan, atau menggunakan fitur Chat Mentor untuk konsultasi langsung terkait materi modul.',
  },
  {
    question: 'Apa metode pembayaran yang didukung?',
    answer:
      'Kami mendukung pembayaran otomatis yang aman: QRIS (GoPay, OVO, Dana), Virtual Account bank nasional (BNI, Mandiri, BSI), dan Kartu Debit/Kredit.',
  },
  {
    question: 'Apakah sekolah saya bisa bekerja sama secara institusi?',
    answer:
      'Bisa! Kami memiliki program kemitraan khusus sekolah (Crygle Academy x Boarding School) untuk kurikulum ekstrakurikuler terintegrasi dan sistem pelaporan progres belajar ke wali kelas.',
  },
];
```

- [ ] **Step 7: Create `web/src/data/alumniWork.ts`** — dari `index.html` baris 586–637

```typescript
export interface AlumniWorkItem {
  title: string;
  student: string;
  image: string;
}

export const alumniWork: AlumniWorkItem[] = [
  { title: 'Fintech Kids Dashboard', student: 'Fajar · Kelas 9 SMP Asrama', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80' },
  { title: 'Mini Arcade Game', student: 'Zulfa · Kelas 11 SMK', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80' },
  { title: 'Isometric Bedroom 3D', student: 'Raka · Kelas 8 SMP', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80' },
  { title: 'E-Library School App', student: 'Sarah · Kelas 10 SMA', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&auto=format&fit=crop&q=80' },
  { title: 'Obstacle Avoider Bot', student: 'Tim Robotika SMK', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80' },
  { title: 'Travel Mascot Pack', student: 'Dimas Arya · Kelas 12 SMK', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80' },
];
```

- [ ] **Step 8: Create `web/src/data/programs.ts`** — dari `index.html` baris 225–306

```typescript
export interface Program {
  id: 'tentang' | 'design' | 'coding' | 'robot';
  title: string;
  description: string;
  active: boolean;
}

export const programs: Program[] = [
  {
    id: 'tentang',
    title: 'Tentang Kami',
    description: 'Filosofi Sanctuary belajar kreatif digital ramah pemula untuk siswa tingkat SD hingga SMK.',
    active: false,
  },
  {
    id: 'design',
    title: 'Kreatif Design',
    description: 'Menyalurkan imajinasi menjadi karya. Di Kreatif Academy, kreativitas adalah kunci untuk menciptakan solusi unik.',
    active: true,
  },
  {
    id: 'coding',
    title: 'Kreatif Coding',
    description: 'Bahasa masa depan untuk membangun ide. Disini kamu diajarkan coding dengan cara kreatif dan aplikatif.',
    active: false,
  },
  {
    id: 'robot',
    title: 'Kreatif Robot',
    description: 'Mengenal teknologi cerdas sejak dini. Belajar merancang dan mengendalikan robot secara kreatif dan menyenangkan.',
    active: false,
  },
];
```

- [ ] **Step 9: Run the test to verify it passes**

Run: `npx vitest run src/data/data.test.ts`
Expected: PASS — 6 tests passed.

- [ ] **Step 10: Commit**

```bash
git add web/src/data
git commit -m "feat: add shared data layer (courses, mentors, testimonials, faq, alumni, programs)"
```

---

### Task 2: Port remaining Design System components (`CourseCard`, `Rating`, `DiscountTag`, `Avatar`/`AvatarStack`)

**Files:**
- Create: `web/src/components/commerce/CourseCard.jsx` (+ `.d.ts`)
- Create: `web/src/components/commerce/Rating.jsx` (+ `.d.ts`)
- Create: `web/src/components/commerce/DiscountTag.jsx` (+ `.d.ts`)
- Create: `web/src/components/media/Avatar.jsx` (+ `.d.ts`) — exports both `Avatar` and `AvatarStack`
- Test: `web/src/components/commerce/CourseCard.test.tsx`

**Interfaces:**
- Consumes: `Course` type shape from `courses.ts` (Task 1).
- Produces: `CourseCard`, `Rating`, `DiscountTag`, `Avatar`, `AvatarStack` — consumed by every remaining task in this plan and by Fase 3/4.

- [ ] **Step 1: Write the failing test**

```tsx
// web/src/components/commerce/CourseCard.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CourseCard } from './CourseCard.jsx';

describe('CourseCard', () => {
  it('renders title, level, rating and price', () => {
    render(
      <CourseCard
        image="https://example.com/img.jpg"
        title="UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit"
        level="Advanced Level Class |"
        rating={4.3}
        reviews="(1.6K Reviews)"
        price="Rp. 449.000"
        discount="50% off"
        originalPrice="Rp. 899.000"
      />
    );
    expect(screen.getByText(/Menghasilkan Dolar/)).toBeInTheDocument();
    expect(screen.getByText('Rp. 449.000')).toBeInTheDocument();
    expect(screen.getByText('50% off')).toBeInTheDocument();
    expect(screen.getByText('Rp. 899.000')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CourseCard image="x.jpg" title="Test" onClick={onClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/commerce/CourseCard.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Copy the four components. `CourseCard` needs `'use client'` (wires `onClick`); `Rating`, `DiscountTag`, `Avatar`/`AvatarStack` stay server components.**

```bash
mkdir -p "web/src/components/commerce" "web/src/components/media"
DS="CRYGLE Academy Design System-handoff/crygle-academy-design-system/project/components"
cp "$DS/commerce/CourseCard.jsx" "web/src/components/commerce/CourseCard.jsx"
cp "$DS/commerce/CourseCard.d.ts" "web/src/components/commerce/CourseCard.d.ts"
cp "$DS/commerce/Rating.jsx" "web/src/components/commerce/Rating.jsx"
cp "$DS/commerce/Rating.d.ts" "web/src/components/commerce/Rating.d.ts"
cp "$DS/commerce/DiscountTag.jsx" "web/src/components/commerce/DiscountTag.jsx"
cp "$DS/commerce/DiscountTag.d.ts" "web/src/components/commerce/DiscountTag.d.ts"
cp "$DS/media/Avatar.jsx" "web/src/components/media/Avatar.jsx"
cp "$DS/media/Avatar.d.ts" "web/src/components/media/Avatar.d.ts"
```

Edit the first line of `web/src/components/commerce/CourseCard.jsx` to add the client directive:

```javascript
'use client';

import React from 'react';
import { Rating } from './Rating.jsx';
import { DiscountTag } from './DiscountTag.jsx';
// ...rest unchanged
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/commerce/CourseCard.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/commerce web/src/components/media
git commit -m "feat: port CourseCard, Rating, DiscountTag, Avatar/AvatarStack from Design System"
```

---

### Task 3: Home page (`web/app/page.tsx`)

**Files:**
- Create: `web/src/components/home/HeroSection.jsx`
- Create: `web/src/components/home/ProgramSection.jsx`
- Create: `web/src/components/home/AboutSection.jsx`
- Create: `web/src/components/home/PopularClassesSection.jsx`
- Create: `web/src/components/home/AlumniShowcaseSection.jsx`
- Create: `web/src/components/home/TestimonialSection.jsx`
- Create: `web/src/components/home/MentorSection.jsx`
- Create: `web/src/components/home/FaqSection.jsx`
- Create: `web/src/components/home/FinalCtaSection.jsx`
- Modify: `web/app/page.tsx`
- Test: `web/app/page.test.tsx`

**Interfaces:**
- Consumes: `courses`, `mentors`, `testimonials`, `faqItems`, `alumniWork`, `programs` (Task 1); `CourseCard`, `Rating`, `Avatar` (Task 2); `SectionHeading`, `Button` (Fase 0).
- Produces: the composed Home page — no other task depends on its internals, but §11.2/§11.5 (Fase 2+) link back here via `/#hash` anchors, so **keep the section `id` attributes** listed below.

Source: `index.html` (1105 baris). Section `id`s to preserve for anchor links used elsewhere in the site: `hero`, `program-section`, `about-section`, `popular-courses`, `mentor-section`, `faq-section`.

- [ ] **Step 1: Write the failing test — one representative assertion per section, not exhaustive**

```tsx
// web/app/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the hero headline and Explore Kelas CTA', () => {
    render(<HomePage />);
    expect(screen.getByText(/Tempat Perjuangan/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Kelas/ })).toBeInTheDocument();
  });

  it('renders all 6 popular course cards', () => {
    render(<HomePage />);
    expect(screen.getByText('3D Design : Membuat Animation 3D Produk di Blender')).toBeInTheDocument();
    expect(screen.getAllByText(/Level Class/).length).toBeGreaterThanOrEqual(6);
  });

  it('renders the FAQ section with 8 questions', () => {
    render(<HomePage />);
    expect(screen.getByText('Apakah sekolah saya bisa bekerja sama secara institusi?')).toBeInTheDocument();
  });

  it('renders the mentor directory teaser with 6 mentor cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Dion Ahza Pratama')).toBeInTheDocument();
    expect(screen.getByText('Nadia Putri')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — current `page.tsx` only renders the Fase 0 placeholder heading.

- [ ] **Step 3: Build each section component, then compose in `page.tsx`**

`web/src/components/home/HeroSection.jsx` (server component — no handlers of its own; the play-button/modal interaction is deliberately deferred, see Catatan below):

```jsx
import { Button } from '@/components/core/Button.jsx';

export function HeroSection() {
  return (
    <section id="hero" style={{ padding: '80px var(--gutter) 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 48, lineHeight: 1.15, color: 'var(--black)', maxWidth: 560 }}>
          Tempat Perjuangan Kreatif Anak Muda Dimulai
        </h1>
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontFamily: 'var(--font-core)', fontSize: 18, color: 'var(--grey-500)', marginBottom: 24 }}>
            Bukan hanya teori, tapi juga aksi. Di sini, kamu bisa belajar sambil bikin karya nyata.
          </p>
          <Button size="large" pill><a href="#popular-courses" style={{ color: 'inherit', textDecoration: 'none' }}>Explore Kelas</a></Button>
        </div>
      </div>
    </section>
  );
}
```

`web/src/components/home/PopularClassesSection.jsx` (server component — `CourseCard` handles its own client interactivity):

```jsx
import Link from 'next/link';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { CourseCard } from '@/components/commerce/CourseCard.jsx';
import { courses } from '@/data/courses';

export function PopularClassesSection() {
  return (
    <section id="popular-courses" style={{ padding: '100px var(--gutter)' }}>
      <SectionHeading
        title="Kelas Populer"
        supporting="Beberapa kelas andalan kami yang bisa diikuti secara gratis sebelum mengikuti kelas LEVEL UP yang sudah kami sediakan."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {courses.map((course) => (
          <Link key={course.slug} href={`/kelas/${course.slug}`} style={{ textDecoration: 'none' }}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </section>
  );
}
```

`web/src/components/home/FaqSection.jsx` (client component — uses `AccordionsContent` which has internal `useState`; port `AccordionsContent` from `components/disclosure/` the same way as Task 2 before using it here — add that copy step to this task if not already done in a prior session):

```jsx
'use client';

import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { AccordionsContent } from '@/components/disclosure/AccordionsContent.jsx';
import { faqItems } from '@/data/faq';

export function FaqSection() {
  const left = faqItems.slice(0, 4);
  const right = faqItems.slice(4, 8);
  return (
    <section id="faq-section" style={{ padding: '100px var(--gutter)' }}>
      <SectionHeading title="Frequently Asked Questions" supporting="Masih bingung? Kami bantu jawab di sini." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48 }}>
        <AccordionsContent items={left} defaultOpenIndex={0} />
        <AccordionsContent items={right} defaultOpenIndex={-1} />
      </div>
    </section>
  );
}
```

*(Untuk `ProgramSection`, `AboutSection`, `AlumniShowcaseSection`, `TestimonialSection`, `MentorSection`, `FinalCtaSection`: ikuti pola yang sama persis — `SectionHeading` + data dari `src/data/*.ts` + komponen Design System yang sesuai. `ProgramSection` butuh `useState` untuk tab aktif (`data-program` di HTML asli) sehingga **wajib `'use client'`**. Konten teks lengkap tiap section ada di §7 Task 1 di atas — jangan ketik ulang dari ingatan, salin dari situ.)*

`web/app/page.tsx`:

```tsx
import { HeroSection } from '@/components/home/HeroSection.jsx';
import { ProgramSection } from '@/components/home/ProgramSection.jsx';
import { AboutSection } from '@/components/home/AboutSection.jsx';
import { PopularClassesSection } from '@/components/home/PopularClassesSection.jsx';
import { AlumniShowcaseSection } from '@/components/home/AlumniShowcaseSection.jsx';
import { TestimonialSection } from '@/components/home/TestimonialSection.jsx';
import { MentorSection } from '@/components/home/MentorSection.jsx';
import { FaqSection } from '@/components/home/FaqSection.jsx';
import { FinalCtaSection } from '@/components/home/FinalCtaSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <AboutSection />
      <PopularClassesSection />
      <AlumniShowcaseSection />
      <TestimonialSection />
      <MentorSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/home web/app/page.tsx web/app/page.test.tsx
git commit -m "feat: build Home page from ported index.html content"
```

> **Catatan disengaja diluar cakupan:** video trailer modal (play button di hero) dan navbar mega-dropdown (Video Kelas/Bootcamp Intensif hover menu di `index.html` baris 26–133) **tidak** diport di task ini — itu perilaku `NavBar` dari Fase 0 yang belum punya varian dropdown. Kalau dibutuhkan, itu jadi task tambahan terpisah setelah Fase 1 selesai (perluasan `NavBar`), bukan bagian Home page murni.

---

### Task 4: Katalog Publik (`web/app/kelas/page.tsx`) — halaman baru

**Files:**
- Modify: `web/app/kelas/page.tsx`
- Test: `web/app/kelas/page.test.tsx`

**Interfaces:**
- Consumes: `courses` (Task 1), `CourseCard` (Task 2).
- Produces: memperbaiki bug PRD §11.2 — link "Lihat Lainnya" di Home (saat ini `href="#katalog"`, dead) harus diarahkan ke rute ini di task terpisah setelah halaman ini ada (update `PopularClassesSection`'s "Lihat Lainnya" button, ditambahkan di Step 3 di bawah).

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/kelas/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import KatalogPage from './page';

describe('KatalogPage', () => {
  it('renders all 6 courses from the shared data layer', () => {
    render(<KatalogPage />);
    expect(screen.getByText('Vector Design : Membuat Vector Ilustrasi Menggunakan Figma')).toBeInTheDocument();
  });

  it('renders category filter chips', () => {
    render(<KatalogPage />);
    expect(screen.getByText('Semua Kelas')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/kelas/page.test.tsx`
Expected: FAIL — stub page has no course content yet.

- [ ] **Step 3: Build the page — grid of `CourseCard` + simple category chip row (reuse the chip pattern from `dashboard.html`'s Explore Kelas panel, PRD §11.2)**

```tsx
// web/app/kelas/page.tsx
import Link from 'next/link';
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { CourseCard } from '@/components/commerce/CourseCard.jsx';
import { courses } from '@/data/courses';

export default function KatalogPage() {
  return (
    <section style={{ padding: '60px var(--gutter)' }}>
      <SectionHeading title="Katalog Kelas" supporting="Semua kelas yang tersedia di Crygle Academy — pilih sesuai minatmu." />
      <div style={{ display: 'flex', gap: 12, margin: '32px 0' }}>
        {['Semua Kelas', 'UI/UX Design', '3D & Animation', 'Front-End Coding'].map((label) => (
          <span key={label} style={{ padding: '8px 18px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-tint)', fontFamily: 'var(--font-core)', fontSize: 14, fontWeight: 600 }}>
            {label}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {courses.map((course) => (
          <Link key={course.slug} href={`/kelas/${course.slug}`} style={{ textDecoration: 'none' }}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </section>
  );
}
```

Then update `web/src/components/home/PopularClassesSection.jsx` — replace the `href="#katalog"` "Lihat Lainnya" link (dead in the original) with `<Link href="/kelas">`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/kelas/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/app/kelas/page.tsx web/app/kelas/page.test.tsx web/src/components/home/PopularClassesSection.jsx
git commit -m "feat: add public course catalog page, fix dead 'Lihat Lainnya' link (PRD 11.2)"
```

---

### Task 5: Course Details (`web/app/kelas/[slug]/page.tsx`)

**Files:**
- Create: `web/src/components/course-details/CourseTabs.jsx` (client — manages active tab state)
- Create: `web/src/components/course-details/OverviewTab.jsx`
- Create: `web/src/components/course-details/CurriculumTab.jsx`
- Create: `web/src/components/course-details/MentorTab.jsx`
- Create: `web/src/components/course-details/ReviewsTab.jsx`
- Modify: `web/app/kelas/[slug]/page.tsx`
- Test: `web/app/kelas/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `courses`, `mentors` (Task 1); `CourseCard`, `Rating` (Task 2); `AccordionsContent` pattern (Task 3).
- Produces: full course detail page for the flagship course. Source: `course-details.html` (680 baris) — this task ports the **flagship UI/UX course content specifically**; other 5 courses can reuse the same tab structure with different data once they get their own detail content (out of scope here — flag as follow-up, not invented).

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/kelas/[slug]/page.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CourseDetailsPage from './page';

describe('CourseDetailsPage', () => {
  it('renders the course title and price sidebar', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByRole('heading', { name: /Menghasilkan Dolar Hanya Dengan Menjual/ })).toBeInTheDocument();
    expect(screen.getByText('Rp449.000')).toBeInTheDocument();
  });

  it('switches to the Kurikulum Kelas tab and shows Chapter 1', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kurikulum Kelas' }));
    expect(screen.getByText('Chapter 1 : Introduction to UI/UX & Digital Product')).toBeInTheDocument();
  });

  it('switches to the Tentang Mentor tab and shows mentor bio', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tentang Mentor' }));
    expect(screen.getByText('Dimas Pradipa Abiyuda')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run "app/kelas/[slug]/page.test.tsx"`
Expected: FAIL — stub page has no tab content.

- [ ] **Step 3: Build `CourseTabs.jsx` (client, manages `activeTab` state) composing the 4 tab components, then wire into `page.tsx` with the sidebar pricing block**

Konten persis tiap tab (jangan diringkas — ini konten final):

- **Overview**: 4 paragraf `overview-paragraph` (baris 145–159 `course-details.html`) + "Apa yang Akan Kamu Dapat?" 5 bullet (baris 161–186).
- **Kurikulum Kelas**: 8 chapter (judul persis di baris 197–375), Chapter 1 berisi 5 lesson (baris 203–237), Chapter 2–8 masing-masing 1–2 lesson (judul lesson ada di HTML, salin persis).
- **Tentang Mentor**: pakai `mentors.find(m => m.slug === 'dimas-pradipa-abiyuda')` untuk foto/nama/role, plus 3 paragraf bio panjang (baris 392–402, **beda dari `bio` singkat di `mentors.ts`** — paragraf panjang ini khusus tab ini, simpan sebagai konstanta lokal di `MentorTab.jsx`, bukan field baru di `mentors.ts`), metrics (Review 4.8 (2.650 Reviews), Total Siswa 3.000, Total Course 5), quote penutup.
- **Reviews**: 2 review (Fathan Al-Ghifari "Siswa SMK Pekanbaru · 2 minggu lalu" + Clarissa Putri "Santriwati Boarding School · 1 bulan lalu"), teks persis baris 447–469.

Sidebar: Invest Rp449.000, coret Rp899.000, badge "50% off", tombol "Mulai Belajar" → `Link href="/checkout"`, 5 benefit list (20+ Jam Durasi Belajar, Advanced Level Class, Konsultasi Kapan Saja, Lifetime Access/Akses Seumur Hidup, Certificate of Completion).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run "app/kelas/[slug]/page.test.tsx"`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/course-details web/app/kelas
git commit -m "feat: build Course Details page with 4 tabs from ported course-details.html content"
```

---

### Task 6: Mentor directory (`web/app/mentor/page.tsx`)

**Files:**
- Create: `web/src/components/mentor/MentorCard.jsx`
- Modify: `web/app/mentor/page.tsx`
- Test: `web/app/mentor/page.test.tsx`

**Interfaces:**
- Consumes: `mentors` (Task 1, filtered to the 6 non-founder entries — `mentor.html` doesn't list Dimas in its grid).

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/mentor/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MentorPage from './page';

describe('MentorPage', () => {
  it('renders all 6 mentor cards with rating and student count', () => {
    render(<MentorPage />);
    expect(screen.getByText('Reza Kurniawan')).toBeInTheDocument();
    expect(screen.getByText('1.420+ Santri')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/mentor/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build `MentorCard.jsx` (server component) and the page**

```jsx
// web/src/components/mentor/MentorCard.jsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';

export function MentorCard({ mentor }) {
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <img src={mentor.image} alt={mentor.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <h3 style={{ fontFamily: 'var(--font-core)', fontWeight: 700, fontSize: 16 }}>{mentor.name}</h3>
          <span style={{ fontFamily: 'var(--font-core)', fontSize: 13, color: 'var(--grey-400)' }}>{mentor.role}</span>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>⭐ {mentor.rating}</span>
            <span style={{ fontSize: 12, color: 'var(--grey-400)' }}>{mentor.students}</span>
          </div>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-core)', fontSize: 13.5, color: 'var(--grey-500)', lineHeight: 1.6, marginBottom: 12 }}>{mentor.bio}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {mentor.skills.map((skill) => (
          <span key={skill} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--surface-tint)', color: 'var(--blue-500)' }}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// web/app/mentor/page.tsx
import { SectionHeading } from '@/components/core/SectionHeading.jsx';
import { MentorCard } from '@/components/mentor/MentorCard.jsx';
import { mentors } from '@/data/mentors';

export default function MentorPage() {
  const directoryMentors = mentors.filter((m) => m.slug !== 'dimas-pradipa-abiyuda');
  return (
    <section style={{ padding: '60px var(--gutter)' }}>
      <SectionHeading
        title="Para Mentor Praktisi Industri"
        supporting="Belajar langsung dari praktisi yang aktif berkarya di studio 3D, agency desain global, dan tech startup. Dapatkan bimbingan 1-on-1, code review, dan kurasi karir."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
        {directoryMentors.map((mentor) => (
          <MentorCard key={mentor.slug} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/mentor/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/mentor web/app/mentor
git commit -m "feat: build Mentor directory page from ported mentor.html content"
```

---

### Task 7: Tentang (`web/app/tentang/page.tsx`)

**Files:**
- Modify: `web/app/tentang/page.tsx`
- Test: `web/app/tentang/page.test.tsx`

Konten dari `tentang.html` (250 baris): hero ("Sanctuary Belajar Kreatif Digital untuk Masa Depan Nyata"), 3 pilar (Kreatif Design/Coding/Robot — sama seperti `programs.ts` tapi dengan deskripsi lebih panjang khusus halaman ini, simpan sebagai konstanta lokal), 4 angka stats (10.000+ Santri, 94% Kelulusan, 150+ Mitra, 350+ Portofolio), section metodologi "80% Praktek Nyata, 20% Fondasi Konsep" dengan 3 checklist + info lokasi studio Pekanbaru.

- [ ] **Step 1: Write the failing test**

```tsx
// web/app/tentang/page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TentangPage from './page';

describe('TentangPage', () => {
  it('renders the hero headline and the 4 stats', () => {
    render(<TentangPage />);
    expect(screen.getByText('Sanctuary Belajar Kreatif Digital untuk Masa Depan Nyata')).toBeInTheDocument();
    expect(screen.getByText('10.000+')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/tentang/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Build the page** — port `tentang.html` §2–4 (baris 120–232) directly, following the same section-composition pattern as Task 3.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/tentang/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/app/tentang
git commit -m "feat: build Tentang page from ported tentang.html content"
```

---

### Task 8: Fase 1 verification

- [ ] **Step 1:** `npx vitest run` — expect all Fase 0 + Fase 1 tests green.
- [ ] **Step 2:** `npx tsc --noEmit` — expect zero errors.
- [ ] **Step 3:** `npx next build` — expect success.
- [ ] **Step 4:** Manual: `npm run dev`, klik dari Home → tiap kartu Kelas Populer → Course Details → tab-tab-nya, Home → Mentor, Home → Tentang, Home → "Lihat Lainnya" → Katalog. Semua harus nyambung tanpa 404, konten cocok dengan HTML sumber.
- [ ] **Step 5:** Commit checkpoint: `git commit -m "chore: Fase 1 Marketing & Info complete"`.

## Self-Review Notes

- **Spec coverage:** kelima halaman Fase 1 dari `HANDOFF-Context-untuk-AI-Agent.md` §5 masing-masing punya task. Bug link mati "Lihat Lainnya" (PRD §11.2, §14 item 2) ditutup di Task 4.
- **Data konsisten:** `courses.ts` jadi satu-satunya sumber harga — dipakai Task 3 (Home), Task 4 (Katalog), Task 5 (Course Details sidebar seharusnya pakai `courses.find(c => c.slug === params.slug)`, bukan hardcode ulang harga).
- **Rekonsiliasi diketahui (diralat):** Explore Kelas panel di `dashboard.html` ternyata katalog 6-course terpisah dan sah, bukan duplikat `courses.ts` dengan harga beda — lihat ralat di Global Constraints di atas. Fase 3 memodelkannya sebagai `exploreCourses.ts` sendiri.
