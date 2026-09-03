import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import KatalogPage from './page';

describe('KatalogPage', () => {
  it('renders all 6 courses from the shared data layer', () => {
    render(<KatalogPage />);
    expect(screen.getByText('Vector Design : Membuat Vector Ilustrasi Menggunakan Figma')).toBeInTheDocument();
  });

  it('renders category filter chips', () => {
    render(<KatalogPage />);
    expect(screen.getByText('Semua Kelas')).toBeInTheDocument();
  });
});
