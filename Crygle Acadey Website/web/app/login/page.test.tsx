import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoginPage from './page';

describe('LoginPage', () => {
  it('renders the heading and both fields with NO pre-filled demo credentials', () => {
    render(<LoginPage />);
    expect(screen.getByText('Halo, Selamat Datang 👋')).toBeInTheDocument();
    const emailInput = screen.getByLabelText('Alamat Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('toggles password visibility', () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordInput.type).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Lihat Password' }));
    expect(passwordInput.type).toBe('text');
  });

  it('links Lupa Password to the forgot-password route', () => {
    render(<LoginPage />);
    expect(screen.getByText('Lupa Password?')).toHaveAttribute('href', '/lupa-password');
  });

  it('submitting valid credentials navigates to the dashboard', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('Alamat Email'), { target: { value: 'santri@crygleacademy.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'anything123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(screen.getByText('Masuk')).toBeInTheDocument();
  });
});
