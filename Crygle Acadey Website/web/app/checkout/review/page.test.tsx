import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import ReviewPage from './page';

describe('ReviewPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders the order summary with mentor and total', () => {
    render(<ReviewPage />);
    expect(screen.getByText('Konfirmasi Pembayaran')).toBeInTheDocument();
    expect(screen.getByText('Dimas Pradipa Abiyuda')).toBeInTheDocument();
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Konfirmasi & Bayar" to the processing step', () => {
    render(<ReviewPage />);
    expect(screen.getByRole('link', { name: 'Konfirmasi & Bayar' })).toHaveAttribute('href', '/checkout/processing');
  });

  it('links back to checkout to change payment method', () => {
    render(<ReviewPage />);
    expect(screen.getByRole('link', { name: /Kembali & Ubah Metode Pembayaran/ })).toHaveAttribute('href', '/checkout');
  });
});
