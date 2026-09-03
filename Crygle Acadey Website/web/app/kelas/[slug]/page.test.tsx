import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CourseDetailsPage from './page';

describe('CourseDetailsPage', () => {
  it('renders the course title and price sidebar', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    expect(screen.getByRole('heading', { name: /Menghasilkan Dolar Hanya Dengan Menjual/ })).toBeInTheDocument();
    expect(screen.getByText('Rp449.000')).toBeInTheDocument();
  });

  it('switches to the Kurikulum Kelas tab and shows Chapter 1', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kurikulum Kelas' }));
    expect(screen.getByText('Chapter 1 : Introduction to UI/UX & Digital Product')).toBeInTheDocument();
  });

  it('switches to the Tentang Mentor tab and shows mentor bio', () => {
    render(<CourseDetailsPage params={{ slug: 'ui-ux-menjual-produk-ui-kit' }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tentang Mentor' }));
    expect(screen.getByText('Dimas Pradipa Abiyuda')).toBeInTheDocument();
  });
});
