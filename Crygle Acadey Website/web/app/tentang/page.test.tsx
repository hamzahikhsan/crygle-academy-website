import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TentangPage from './page';

describe('TentangPage', () => {
  it('renders the hero headline and the 4 stats', () => {
    render(<TentangPage />);
    expect(screen.getByText('Sanctuary Belajar Kreatif Digital untuk Masa Depan Nyata')).toBeInTheDocument();
    expect(screen.getByText('10.000+')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
  });
});
