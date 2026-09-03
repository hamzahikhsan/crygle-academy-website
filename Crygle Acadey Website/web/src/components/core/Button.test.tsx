import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Daftar</Button>);
    expect(screen.getByRole('button', { name: 'Daftar' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Masuk</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Bayar Sekarang</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Bayar Sekarang' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
