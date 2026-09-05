import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(''),
}));

import DashboardPage from './page';

describe('DashboardPage', () => {
  it('renders the dashboard with default Course Saya panel and enrolled courses', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Kelas Saya')).toBeInTheDocument();
    expect(
      screen.getByText('UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit')
    ).toBeInTheDocument();
    expect(screen.getByText('5/8 Modul')).toBeInTheDocument();
  });
});
