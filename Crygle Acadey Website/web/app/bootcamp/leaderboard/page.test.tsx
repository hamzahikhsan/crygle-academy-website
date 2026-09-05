import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LeaderboardPage from './page';

describe('LeaderboardPage', () => {
  it('renders all 4 ranked santri with the current user highlighted', () => {
    render(<LeaderboardPage />);
    expect(screen.getByText('Ahmad Fauzi')).toBeInTheDocument();
    expect(screen.getByText('Dion Ahza (Anda)')).toBeInTheDocument();
    expect(screen.getByText('485 Poin')).toBeInTheDocument();
    expect(screen.getByText('445 Poin')).toBeInTheDocument();
  });
});
