import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from './SectionHeading.jsx';

describe('SectionHeading', () => {
  it('renders the title', () => {
    render(<SectionHeading title="Rangkaian Program" />);
    expect(screen.getByText('Rangkaian Program')).toBeInTheDocument();
  });

  it('renders supporting text when provided', () => {
    render(<SectionHeading title="Kelas Populer" supporting="Beberapa kelas andalan kami" />);
    expect(screen.getByText('Beberapa kelas andalan kami')).toBeInTheDocument();
  });
});
