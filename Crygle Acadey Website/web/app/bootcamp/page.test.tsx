import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BootcampLandingPage from './page';

describe('BootcampLandingPage', () => {
  it('renders the hero and a CTA into the join flow', () => {
    render(<BootcampLandingPage />);
    expect(screen.getByRole('heading', { name: /Bootcamp Intensif/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Gabung Cohort Berikutnya/ })).toHaveAttribute('href', '/bootcamp/join');
  });

  it('states the real cohort facts (mentor, period, duration) consistently with the other Bootcamp pages', () => {
    render(<BootcampLandingPage />);
    expect(screen.getByText(/Dimas Pradipa Abiyuda/)).toBeInTheDocument();
    expect(screen.getByText(/12 Pekan/)).toBeInTheDocument();
  });
});
