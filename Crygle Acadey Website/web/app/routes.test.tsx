import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const routes = [
  { heading: 'Home Page', importPage: () => import('./page') },
  { heading: 'Katalog Kelas', importPage: () => import('./kelas/page') },
  { heading: 'Course Details', importPage: () => import('./kelas/[slug]/page'), params: { slug: 'ui-ux-design' } },
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
  { heading: 'Mentor', importPage: () => import('./mentor/page') },
  { heading: 'Tentang Crygle Academy', importPage: () => import('./tentang/page') },
];

describe('route stubs', () => {
  it.each(routes)('$heading renders its placeholder heading', async ({ importPage, heading, params }) => {
    const mod = await importPage();
    const Page = mod.default;
    render(<Page params={params ?? {}} />);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });
});
