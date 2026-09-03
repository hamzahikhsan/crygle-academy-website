import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the hero headline and Explore Kelas CTA', () => {
    render(<HomePage />);
    expect(screen.getByText(/Tempat Perjuangan/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Kelas/ })).toBeInTheDocument();
  });

  it('renders all 6 popular course cards', () => {
    render(<HomePage />);
    expect(screen.getByText('3D Design : Membuat Animation 3D Produk di Blender')).toBeInTheDocument();
    expect(screen.getAllByText(/Level Class/).length).toBeGreaterThanOrEqual(6);
  });

  it('renders the FAQ section with 8 questions', () => {
    render(<HomePage />);
    expect(screen.getByText('Apakah sekolah saya bisa bekerja sama secara institusi?')).toBeInTheDocument();
  });

  it('renders the mentor directory teaser with 6 mentor cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Dion Ahza Pratama')).toBeInTheDocument();
    expect(screen.getByText('Nadia Putri')).toBeInTheDocument();
  });
});
