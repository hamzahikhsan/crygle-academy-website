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
