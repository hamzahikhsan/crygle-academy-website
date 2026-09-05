import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BootcampJoinPage from './page';

describe('BootcampJoinPage', () => {
  it('renders the 3-step onboarding with links to checkout and the WA cohort group', () => {
    render(<BootcampJoinPage />);
    expect(screen.queryByText('Segera hadir')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Selesaikan pembayaran/ })).toHaveAttribute('href', '/checkout');
    expect(screen.getByRole('link', { name: /Gabung Grup WhatsApp Cohort/ })).toHaveAttribute('href', 'https://chat.whatsapp.com/demo-crygle-bootcamp-cohort');
  });

  it('links back to the dashboard Bootcamp Saya panel for already-enrolled santri', () => {
    render(<BootcampJoinPage />);
    expect(screen.getByRole('link', { name: /Buka Dashboard Bootcamp Saya/ })).toHaveAttribute('href', '/dashboard?tab=bootcamp');
  });
});
