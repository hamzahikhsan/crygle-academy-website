import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SettingPanel } from './SettingPanel.jsx';

describe('SettingPanel', () => {
  it('renders the Profil Siswa form pre-filled with the demo student data', () => {
    render(<SettingPanel />);
    expect(screen.getByLabelText('Nama Lengkap Siswa')).toHaveValue('Dion Ahza');
    expect(screen.getByLabelText('Email Terdaftar')).toHaveValue('dion.ahza@smk.sch.id');
  });

  it('shows "Segera hadir" for the 3 subtabs with no source content', () => {
    render(<SettingPanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Akademik & Asrama' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Keamanan Sandi' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Notifikasi' }));
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument();
  });
});
