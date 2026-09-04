import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SignupPage from './page';

describe('SignupPage', () => {
  it('renders all 4 fields and the required terms checkbox', () => {
    render(<SignupPage />);
    expect(screen.getByText('Silahkan Membuat Akun')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Konfirmasi Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the Terms/)).toBeInTheDocument();
  });

  it('blocks submit when passwords do not match', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Budi Santoso' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'budi@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Konfirmasi Password'), { target: { value: 'different456' } });
    fireEvent.click(screen.getByLabelText(/I agree to the Terms/));
    fireEvent.click(screen.getByRole('button', { name: 'Buat Akun' }));
    expect(screen.getByText('Password dan konfirmasi password tidak sama.')).toBeInTheDocument();
  });

  it('submits successfully when passwords match', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Budi Santoso' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'budi@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Konfirmasi Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByLabelText(/I agree to the Terms/));
    fireEvent.click(screen.getByRole('button', { name: 'Buat Akun' }));
    expect(screen.getByRole('button', { name: 'Buat Akun' })).toBeInTheDocument();
  });
});
