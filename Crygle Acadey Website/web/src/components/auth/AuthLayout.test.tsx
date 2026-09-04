import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthLayout } from './AuthLayout.jsx';

describe('AuthLayout', () => {
  it('renders the brand logo link back to Home and the illustration column', () => {
    render(<AuthLayout><p>form content</p></AuthLayout>);
    expect(screen.getByRole('link', { name: /Kembali ke Beranda Crygle Academy/ })).toHaveAttribute('href', '/');
    expect(screen.getByAltText('Crygle Academy Digital Learning Illustration')).toBeInTheDocument();
    expect(screen.getByText('form content')).toBeInTheDocument();
  });
});
