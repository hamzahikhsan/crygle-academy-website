import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CourseCard } from './CourseCard.jsx';

describe('CourseCard', () => {
  it('renders title, level, rating and price', () => {
    render(
      <CourseCard
        image="https://example.com/img.jpg"
        title="UI/UX Design : Menghasilkan Dolar Hanya Dengan Menjual Produk UI Kit"
        level="Advanced Level Class |"
        rating={4.3}
        reviews="(1.6K Reviews)"
        price="Rp. 449.000"
        discount="50% off"
        originalPrice="Rp. 899.000"
      />
    );
    expect(screen.getByText(/Menghasilkan Dolar/)).toBeInTheDocument();
    expect(screen.getByText('Rp. 449.000')).toBeInTheDocument();
    expect(screen.getByText('50% off')).toBeInTheDocument();
    expect(screen.getByText('Rp. 899.000')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CourseCard image="x.jpg" title="Test" onClick={onClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
