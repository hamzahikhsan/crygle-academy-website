import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BootcampSayaPanel } from './BootcampSayaPanel.jsx';

describe('BootcampSayaPanel', () => {
  it('renders the cohort summary and links out to the 4 dedicated Bootcamp pages', () => {
    render(<BootcampSayaPanel />);
    expect(screen.getByText('Bootcamp Intensif UI/UX Design & Digital Product')).toBeInTheDocument();
    expect(screen.getByText(/EDISI ASRAMA & SMK BATCH 12/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Jadwal & Absensi/ })).toHaveAttribute('href', '/bootcamp/jadwal');
    expect(screen.getByRole('link', { name: /Booking Konsultasi Mentor/ })).toHaveAttribute('href', '/bootcamp/booking');
    expect(screen.getByRole('link', { name: /Pengumpulan Tugas/ })).toHaveAttribute('href', '/bootcamp/tugas');
    expect(screen.getByRole('link', { name: /Leaderboard/ })).toHaveAttribute('href', '/bootcamp/leaderboard');
  });
});
