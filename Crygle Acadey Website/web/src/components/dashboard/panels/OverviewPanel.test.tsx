import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OverviewPanel } from './OverviewPanel.jsx';

describe('OverviewPanel', () => {
  it('renders all 4 KPI cards', () => {
    render(<OverviewPanel />);
    expect(screen.getByText('24.5 Jam')).toBeInTheDocument();
    expect(screen.getByText('3 Kursus')).toBeInTheDocument();
    expect(screen.getByText('86/100')).toBeInTheDocument();
    expect(screen.getByText('🔥 14 Hari')).toBeInTheDocument();
  });

  it('renders the resume-learning CTA linking to the classroom', () => {
    render(<OverviewPanel />);
    expect(screen.getByRole('link', { name: /Lanjutkan Belajar/ })).toHaveAttribute(
      'href',
      '/classroom/ui-ux-menjual-produk-ui-kit'
    );
  });

  it('renders the weekly activity chart with 7 day columns', () => {
    render(<OverviewPanel />);
    expect(screen.getByTitle('Sabtu: 4.5 Jam (Hari Ini)')).toBeInTheDocument();
  });
});
