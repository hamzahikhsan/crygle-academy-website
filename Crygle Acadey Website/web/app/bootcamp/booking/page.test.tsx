import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BookingPage from './page';

describe('BookingPage', () => {
  it('defaults to Dimas Pradipa at 10:00-10:45 WIB in the summary', () => {
    render(<BookingPage />);
    expect(screen.getAllByText('Dimas Pradipa').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('10:00 – 10:45 WIB').length).toBeGreaterThanOrEqual(1);
  });

  it('updates the summary when a different mentor and slot are selected', () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByText('Randy Pratama'));
    fireEvent.click(screen.getByRole('button', { name: '14:00 – 14:45 WIB' }));
    const summary = screen.getByTestId('booking-summary');
    expect(summary).toHaveTextContent('Randy Pratama');
    expect(summary).toHaveTextContent('14:00 – 14:45 WIB');
  });

  it('confirms the booking on button click', () => {
    render(<BookingPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Konfirmasi Booking Sesi' }));
    expect(screen.getByText(/Sesi konsultasi berhasil dipesan/)).toBeInTheDocument();
  });
});
