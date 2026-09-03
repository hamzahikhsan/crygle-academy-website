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
