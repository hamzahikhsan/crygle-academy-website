import type { ReactElement, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RootLayout from './layout';

// RootLayout renders <html>/<body>, which JSDOM's render() cannot mount
// directly — test the visible shell by rendering its children slot instead.
function Shell({ children }: { children: ReactNode }) {
  const tree = RootLayout({ children }) as ReactElement<{ children: ReactElement<{ children: ReactNode }> }>;
  return tree.props.children.props.children;
}

describe('RootLayout', () => {
  it('renders the NavBar and Footer logo, plus the Footer copyright line, around the page content', () => {
    render(<Shell><p>Konten halaman</p></Shell>);
    // Logo renders as an <img alt="CRYGLE Academy"> wordmark, not text — one in
    // NavBar, one in Footer.
    expect(screen.getAllByAltText('CRYGLE Academy').length).toBe(2);
    expect(screen.getByText('Konten halaman')).toBeInTheDocument();
    expect(screen.getByText('© 2026 CRYGLE Academy. All rights reserved.')).toBeInTheDocument();
  });
});
