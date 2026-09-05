export interface ChatMessage {
  id: string;
  sender: 'mentor' | 'student';
  text: string;
  time: string;
  linkPreview?: string;
}

export interface ChatThread {
  id: string;
  name: string;
  role: string;
  status: 'Online' | 'Offline';
  avatar: string;
  preview: string;
  isCustomAvatarIcon?: boolean;
  messages: ChatMessage[];
}

export const initialChatThreads: ChatThread[] = [
  {
    id: 'dimas',
    name: 'Dimas Pradipa',
    role: 'Mentor UI/UX Crygle Academy',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    preview: 'File Figma kamu sudah saya review...',
    messages: [
      {
        id: 'd1',
        sender: 'mentor',
        text: 'Halo Dion! Bagaimana progres pengerjaan modul Brainstorming Fitur Produk UI Kit kamu? Ada kendala di penyusunan Auto Layout atau riset kompetitor di UI8?',
        time: '10:15 WIB',
      },
      {
        id: 'd2',
        sender: 'student',
        text: 'Halo Mas Dimas! Sudah saya kerjakan sesuai materi video. Saya sudah buat 10 artboard dashboard analytics dengan atomic tokens. Ini link Figma-nya mas:',
        time: '10:18 WIB',
        linkPreview: '🔗 figma.com/@dion/ui-kit-crypto-project',
      },
      {
        id: 'd3',
        sender: 'mentor',
        text: 'Keren Dion! Penataan component properties-nya sudah rapi. Nanti saat sesi live mentoring jam 16:00 kita bahas cara membuat packaging preview thumbnail yang menarik calon pembeli ya! 👍',
        time: '10:20 WIB',
      },
    ],
  },
  {
    id: 'randy',
    name: 'Randy Pratama',
    role: 'Mentor 3D Animation',
    status: 'Offline',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    preview: 'Shader blender: periksa node metallic...',
    messages: [
      {
        id: 'r1',
        sender: 'mentor',
        text: 'Untuk shader blender, periksa node metallic dan roughness-nya ya Dion agar pantulan cahayanya pas.',
        time: '08:45 WIB',
      },
    ],
  },
  {
    id: 'siti',
    name: 'Siti Aminah',
    role: 'Mentor Riset Pasar',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    preview: 'Metode riset pasar sudah oke Dion.',
    messages: [
      {
        id: 's1',
        sender: 'mentor',
        text: 'Metode riset pasar sudah oke Dion. Lanjutkan ke tahap wireframing low-fidelity ya.',
        time: 'Kemarin',
      },
    ],
  },
  {
    id: 'admin',
    name: 'Bantuan Asrama',
    role: 'Support & Akademik',
    status: 'Online',
    avatar: '🏛️',
    isCustomAvatarIcon: true,
    preview: 'Data pendaftaran sertifikasi diterima.',
    messages: [
      {
        id: 'a1',
        sender: 'mentor',
        text: 'Data pendaftaran sertifikasi diterima. Ujian online akan dijadwalkan pekan depan.',
        time: '2 hari lalu',
      },
    ],
  },
];
