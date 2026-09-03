import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from './NavBar.jsx';

describe('NavBar', () => {
  it('renders the default nav items', () => {
    render(<NavBar assetBase="/" />);
    expect(screen.getByText('Beranda')).toBeInTheDocument();
    expect(screen.getByText('Video Kelas')).toBeInTheDocument();
    expect(screen.getByText('Bootcamp Intensif')).toBeInTheDocument();
    expect(screen.getByText('Mentor')).toBeInTheDocument();
    expect(screen.getByText('Tentang')).toBeInTheDocument();
  });

  it('calls onSignup when Daftar is clicked', () => {
    const onSignup = vi.fn();
    render(<NavBar assetBase="/" onSignup={onSignup} />);
    fireEvent.click(screen.getByText('Daftar'));
    expect(onSignup).toHaveBeenCalledOnce();
  });
});
