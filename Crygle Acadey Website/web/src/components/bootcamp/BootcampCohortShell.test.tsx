import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BootcampCohortShell } from './BootcampCohortShell.jsx';

describe('BootcampCohortShell', () => {
  it('renders the cohort banner with mentor and period', () => {
    render(<BootcampCohortShell active="jadwal"><p>content</p></BootcampCohortShell>);
    expect(screen.getByText('Bootcamp Intensif UI/UX Design & Digital Product')).toBeInTheDocument();
    expect(screen.getByText(/Mentor Utama: Dimas Pradipa Abiyuda/)).toBeInTheDocument();
  });

  it('highlights the active sub-nav link', () => {
    render(<BootcampCohortShell active="tugas"><p>content</p></BootcampCohortShell>);
    expect(screen.getByRole('link', { name: /Pengumpulan Tugas/ })).toHaveClass('active');
    expect(screen.getByRole('link', { name: /Leaderboard/ })).toHaveAttribute('href', '/bootcamp/leaderboard');
  });
});
