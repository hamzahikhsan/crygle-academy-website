import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRouter } from 'next/navigation';
import ProcessingPage from './page';

describe('ProcessingPage', () => {
  it('renders the merchant, order ID, and total', () => {
    render(<ProcessingPage />);
    expect(screen.getByText('Memproses pembayaran kamu...')).toBeInTheDocument();
    expect(screen.getByText('CRYGLE Academy')).toBeInTheDocument();
    expect(screen.getByText('#CR-99201-AX')).toBeInTheDocument();
  });

  it('redirects to the success page after the simulated delay', () => {
    vi.useFakeTimers();
    const router = useRouter();
    render(<ProcessingPage />);
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(router.push).toHaveBeenCalledWith('/checkout/berhasil');
    vi.useRealTimers();
  });
});
