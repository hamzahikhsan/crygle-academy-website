import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JadwalPage from './page';

describe('JadwalPage', () => {
  it('renders all 4 session rows with attendance status', () => {
    render(<JadwalPage />);
    expect(screen.getByText('Orientasi Santri & Standarisasi Figma Dev Mode')).toBeInTheDocument();
    expect(screen.getAllByText('✓ Hadir (100%)')).toHaveLength(2);
    expect(screen.getAllByText('Terjadwal')).toHaveLength(2);
  });

  it('highlights Jadwal as the active shell tab', () => {
    render(<JadwalPage />);
    expect(screen.getByRole('link', { name: /Jadwal & Absensi/ })).toHaveClass('active');
  });
});
