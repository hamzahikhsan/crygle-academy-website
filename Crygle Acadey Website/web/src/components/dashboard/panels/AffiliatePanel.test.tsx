import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AffiliatePanel } from './AffiliatePanel.jsx';

describe('AffiliatePanel', () => {
  it('renders the referral code and 4 KPI cards', () => {
    render(<AffiliatePanel />);
    expect(screen.getByText('CRYGLE-DION-SMK')).toBeInTheDocument();
    expect(screen.getByText('142 Klik')).toBeInTheDocument();
    expect(screen.getByText('8 Siswa')).toBeInTheDocument();
  });

  it('copies the referral code to the clipboard when "Salin Kode" is clicked', () => {
    const writeText = vi.fn();
    Object.assign(navigator, { clipboard: { writeText } });
    render(<AffiliatePanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Salin Kode' }));
    expect(writeText).toHaveBeenCalledWith('CRYGLE-DION-SMK');
  });

  it('renders the 3-row commission history table', () => {
    render(<AffiliatePanel />);
    expect(screen.getByText('Ahmad Fauzi')).toBeInTheDocument();
    expect(screen.getAllByText('✓ Sudah Cair').length).toBe(2);
    expect(screen.getByText('Diproses')).toBeInTheDocument();
  });
});
