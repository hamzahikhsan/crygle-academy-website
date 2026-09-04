import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import CheckoutPage from './page';

describe('CheckoutPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders all 5 payment methods and the correct VA numbers', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('BNI Virtual Account')).toBeInTheDocument();
    expect(screen.getByText('8808 2399 1029 384')).toBeInTheDocument();
    expect(screen.getByText('8950 8299 4402 119')).toBeInTheDocument();
    expect(screen.getByText('7029 1190 2839 001')).toBeInTheDocument();
  });

  it('renders the price breakdown totaling Rp507.000', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('Rp507.000')).toBeInTheDocument();
  });

  it('links "Bayar Sekarang" to the review step', () => {
    render(<CheckoutPage />);
    expect(screen.getByRole('link', { name: 'Bayar Sekarang' })).toHaveAttribute('href', '/checkout/review');
  });
});
