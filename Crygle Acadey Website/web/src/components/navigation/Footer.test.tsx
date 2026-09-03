import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer.jsx';

describe('Footer', () => {
  it('renders the default copyright line', () => {
    render(<Footer assetBase="/" />);
    expect(screen.getByText('© 2026 CRYGLE Academy. All rights reserved.')).toBeInTheDocument();
  });

  it('renders all three link columns', () => {
    render(<Footer assetBase="/" />);
    expect(screen.getByText('NAVIGASI')).toBeInTheDocument();
    expect(screen.getByText('PROGRAM')).toBeInTheDocument();
    expect(screen.getByText('DUKUNGAN')).toBeInTheDocument();
  });
});
