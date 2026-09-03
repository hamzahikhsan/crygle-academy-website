import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MentorPage from './page';

describe('MentorPage', () => {
  it('renders all 6 mentor cards with rating and student count', () => {
    render(<MentorPage />);
    expect(screen.getByText('Reza Kurniawan')).toBeInTheDocument();
    expect(screen.getByText('1.420+ Santri')).toBeInTheDocument();
  });
});
