import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CourseSayaPanel } from './CourseSayaPanel.jsx';

describe('CourseSayaPanel', () => {
  it('renders all 3 enrolled courses with their progress', () => {
    render(<CourseSayaPanel />);
    expect(screen.getByText('5/8 Modul')).toBeInTheDocument();
    expect(screen.getByText('3/8 Modul')).toBeInTheDocument();
    expect(screen.getByText('2/8 Modul')).toBeInTheDocument();
  });

  it('links the flagship course card to the classroom route', () => {
    render(<CourseSayaPanel />);
    expect(
      screen.getByText('UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit').closest('a')
    ).toHaveAttribute('href', '/classroom/ui-ux-menjual-produk-ui-kit');
  });
});
