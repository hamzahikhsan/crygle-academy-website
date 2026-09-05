import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams(''),
}));

import { DashboardShell } from './DashboardShell.jsx';

describe('DashboardShell', () => {
  it('defaults to the Course Saya panel and highlights it in the sidebar', () => {
    render(<DashboardShell />);
    expect(screen.getByText('Kelas Saya')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Course Saya/i })).toHaveClass('active');
  });

  it('switches tab and updates the URL when a sidebar item is clicked', () => {
    render(<DashboardShell />);
    fireEvent.click(screen.getByRole('link', { name: /Explore Kelas/i }));
    expect(pushMock).toHaveBeenCalledWith('/dashboard?tab=explore');
  });

  it('renders the user profile pill with the demo student name', () => {
    render(<DashboardShell />);
    expect(screen.getByText('Dion Ahza')).toBeInTheDocument();
  });
});
