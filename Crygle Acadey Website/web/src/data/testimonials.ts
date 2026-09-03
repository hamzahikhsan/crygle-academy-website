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
