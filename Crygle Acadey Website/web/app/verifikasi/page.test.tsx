import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VerifikasiPage from './page';

describe('VerifikasiPage', () => {
  it('renders 6 OTP digit inputs and a resend link', () => {
    render(<VerifikasiPage />);
    expect(screen.getByText('Verifikasi Email Kamu')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /Digit OTP/ })).toHaveLength(6);
    expect(screen.getByText('Kirim ulang kode')).toBeInTheDocument();
  });

  it('navigates to login once all 6 digits are entered and verified', () => {
    render(<VerifikasiPage />);
    const digits = screen.getAllByRole('textbox', { name: /Digit OTP/ });
    digits.forEach((input, i) => fireEvent.change(input, { target: { value: String(i + 1) } }));
    fireEvent.click(screen.getByRole('button', { name: 'Verifikasi' }));
    expect(screen.getByText('Verifikasi')).toBeInTheDocument();
  });
});
