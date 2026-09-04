import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GagalPage from './page';

describe('GagalPage', () => {
  it('renders the failure message and a retry link back to checkout', () => {
    render(<GagalPage />);
    expect(screen.getByText(/Pembayaran (Belum Berhasil|Gagal)/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Coba Metode Lain' })).toHaveAttribute('href', '/checkout');
  });
});
