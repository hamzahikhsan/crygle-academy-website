import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const routes = [
  { heading: 'Tempat Perjuangan Kreatif Anak Muda Dimulai', importPage: () => import('./page') },
  { heading: 'Katalog Kelas', importPage: () => import('./kelas/page') },
  { heading: 'UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit', importPage: () => import('./kelas/[slug]/page'), params: { slug: 'ui-ux-design' } },
  { heading: 'Masuk', importPage: () => import('./login/page') },
  { heading: 'Buat Akun', importPage: () => import('./signup/page') },
  { heading: 'Lupa Password', importPage: () => import('./lupa-password/page') },
  { heading: 'Verifikasi Email', importPage: () => import('./verifikasi/page') },
  { heading: 'Checkout', importPage: () => import('./checkout/page') },
  { heading: 'Konfirmasi Review', importPage: () => import('./checkout/review/page') },
  { heading: 'Konfirmasi Processing', importPage: () => import('./checkout/processing/page') },
  { heading: 'Pembayaran Berhasil', importPage: () => import('./checkout/berhasil/page') },
  { heading: 'Pembayaran Gagal', importPage: () => import('./checkout/gagal/page') },
  { heading: 'Kelas Saya', importPage: () => import('./dashboard/page') },
  { heading: 'Play Kelas', importPage: () => import('./classroom/[courseId]/page'), params: { courseId: 'ui-ux-design' } },
  { heading: 'Bootcamp Intensif', importPage: () => import('./bootcamp/page') },
  { heading: 'Booking Konsultasi', importPage: () => import('./bootcamp/booking/page') },
  { heading: 'Jadwal dan Absensi', importPage: () => import('./bootcamp/jadwal/page') },
  { heading: 'Pengumpulan Tugas dan Quiz', importPage: () => import('./bootcamp/tugas/page') },
  { heading: 'Leaderboard Ranking', importPage: () => import('./bootcamp/leaderboard/page') },
  { heading: 'Para Mentor Praktisi Industri', importPage: () => import('./mentor/page') },
  { heading: 'Sanctuary Belajar Kreatif Digital untuk Masa Depan Nyata', importPage: () => import('./tentang/page') },
];

describe('route smoke tests', () => {
  it.each(routes)('$heading renders correctly', async ({ importPage, heading, params }) => {
    const mod = await importPage();
    const Page = mod.default as ComponentType<{ params: Record<string, string> }>;
    render(<Page params={(params ?? {}) as Record<string, string>} />);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });
});
