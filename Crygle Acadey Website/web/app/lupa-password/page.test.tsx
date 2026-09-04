import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LupaPasswordPage from './page';

describe('LupaPasswordPage', () => {
  it('renders the email form, then shows a confirmation message after submit', () => {
    render(<LupaPasswordPage />);
    expect(screen.getByText('Lupa Password')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Alamat Email'), { target: { value: 'santri@crygleacademy.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Kirim Link Reset' }));
    expect(screen.getByText(/Link reset password sudah dikirim ke santri@crygleacademy.com/)).toBeInTheDocument();
  });

  it('links back to Login', () => {
    render(<LupaPasswordPage />);
    expect(screen.getByRole('link', { name: /Kembali ke halaman Masuk/ })).toHaveAttribute('href', '/login');
  });
});
