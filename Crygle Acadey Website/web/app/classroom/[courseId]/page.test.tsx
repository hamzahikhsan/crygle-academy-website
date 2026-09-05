import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ClassroomPage from './page';

describe('ClassroomPage', () => {
  it('renders the course title, active lesson, and progress', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByRole('heading', { name: /Brainstorming Fitur/ })).toBeInTheDocument();
    expect(screen.getByText('5/8 Modul')).toBeInTheDocument();
  });

  it('switches between Resources, Ringkasan, and Review tabs', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByText('UI Kit Asset.fig')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ringkasan' }));
    expect(screen.getByText('Key Takeaways:')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Review' }));
    expect(screen.getByText(/Farhan Maulana/)).toBeInTheDocument();
  });

  it('opens the mentor chat modal', () => {
    render(<ClassroomPage params={{ courseId: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Chat Mentor Terkait' }));
    expect(screen.getByText('Konsultasi Mentor: Dimas Pradipa')).toBeInTheDocument();
  });
});
