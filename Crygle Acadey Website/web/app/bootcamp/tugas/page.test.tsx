import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TugasPage from './page';

describe('TugasPage', () => {
  it('renders 2 graded assignments and 1 active assignment with its feedback', () => {
    render(<TugasPage />);
    expect(screen.getByText('90/100')).toBeInTheDocument();
    expect(screen.getByText('88/100')).toBeInTheDocument();
    expect(screen.getByText(/Riset pasar sangat tajam/)).toBeInTheDocument();
    expect(screen.getByText('⏳ DEADLINE: 2 HARI LAGI')).toBeInTheDocument();
  });

  it('submits the active assignment Figma link', () => {
    render(<TugasPage />);
    fireEvent.change(screen.getByPlaceholderText('https://figma.com/file/...'), { target: { value: 'https://figma.com/file/abc123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Unggah Link Tugas' }));
    expect(screen.getByText(/Link tugas Figma berhasil dikumpulkan/)).toBeInTheDocument();
  });
});
