export interface ExploreCourse {
  category: 'design' | '3d' | 'code' | 'ai';
  levelBadge: string;
  title: string;
  rating: number;
  studentsLabel: string;
  price: string;
  originalPrice: string;
  image: string;
}

export const exploreCourses: ExploreCourse[] = [
  {
    category: 'design',
    levelBadge: 'ADVANCED LEVEL · 8 MODUL',
    title: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit',
    rating: 4.9,
    studentsLabel: '(1.6K Siswa)',
    price: 'Rp 350.000',
    originalPrice: 'Rp 700.000',
    image: '/dashboard-assets/lesson-video-poster.jpg',
  },
  {
    category: '3d',
    levelBadge: 'INTERMEDIATE · 8 MODUL',
    title: '3D Design : Membuat Animation 3D Produk di Blender',
    rating: 4.8,
    studentsLabel: '(940 Siswa)',
    price: 'Rp 320.000',
    originalPrice: 'Rp 640.000',
    image: '/dashboard-assets/blender-course-thumb.jpg',
  },
  {
    category: '3d',
    levelBadge: 'BEGINNER TO PRO · 6 MODUL',
    title: '3D Design : Mengembangkan Objek Menjadi Bangunan Digital',
    rating: 4.7,
    studentsLabel: '(620 Siswa)',
    price: 'Rp 290.000',
    originalPrice: 'Rp 580.000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'code',
    levelBadge: 'INTERMEDIATE · 10 MODUL',
    title: 'Front-End Modern: Slicing Desain Figma ke HTML, CSS & JavaScript',
    rating: 4.9,
    studentsLabel: '(1.2K Siswa)',
    price: 'Rp 340.000',
    originalPrice: 'Rp 680.000',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'ai',
    levelBadge: 'TRENDING 2026 · 5 MODUL',
    title: 'AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI',
    rating: 5.0,
    studentsLabel: '(820 Siswa)',
    price: 'Rp 280.000',
    originalPrice: 'Rp 560.000',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
  },
  {
    category: 'design',
    levelBadge: 'ADVANCED · 7 MODUL',
    title: 'Fintech & Banking App Design: Master Auto Layout & Design System',
    rating: 4.8,
    studentsLabel: '(710 Siswa)',
    price: 'Rp 350.000',
    originalPrice: 'Rp 700.000',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  },
];
