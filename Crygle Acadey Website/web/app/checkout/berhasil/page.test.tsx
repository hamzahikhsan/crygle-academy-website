import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BerhasilPage from './page';

describe('BerhasilPage', () => {
  it('renders the success heading and enrolled course box', () => {
    render(<BerhasilPage />);
    expect(screen.getByText('Pembayaran Berhasil! 🎉')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit')).toBeInTheDocument();
  });

  it('opens the receipt modal showing invoice number and total', () => {
    render(<BerhasilPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Lihat Kuitansi' }));
    expect(screen.getByText('#INV-20260903-882')).toBeInTheDocument();
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Mulai Belajar" to the dashboard', () => {
    render(<BerhasilPage />);
    expect(screen.getByRole('link', { name: 'Mulai Belajar' })).toHaveAttribute('href', '/dashboard');
  });
});
