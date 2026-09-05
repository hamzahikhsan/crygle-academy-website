import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExploreKelasPanel } from './ExploreKelasPanel.jsx';

describe('ExploreKelasPanel', () => {
  it('renders the promo banner and all 6 courses by default', () => {
    render(<ExploreKelasPanel />);
    expect(screen.getByText(/Gunakan Kode "CRYGLE50" untuk Diskon 50%/)).toBeInTheDocument();
    expect(screen.getByText('AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI')).toBeInTheDocument();
  });

  it('filters to only the 3D & Animation category when that chip is clicked', () => {
    render(<ExploreKelasPanel />);
    fireEvent.click(screen.getByRole('button', { name: '3D & Animation' }));
    expect(screen.queryByText('AI-Assisted UI/UX Design: Akselerasi Wireframing & Riset Bersama AI')).not.toBeInTheDocument();
    expect(screen.getByText('3D Design : Membuat Animation 3D Produk di Blender')).toBeInTheDocument();
  });
});
