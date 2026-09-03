import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo.jsx';

describe('Logo', () => {
  it('renders the wordmark image with alt text', () => {
    render(<Logo assetBase="/" />);
    expect(screen.getByAltText('CRYGLE Academy')).toBeInTheDocument();
  });

  it('omits the wordmark image when wordmark is false', () => {
    render(<Logo assetBase="/" wordmark={false} />);
    expect(screen.queryByAltText('CRYGLE Academy')).not.toBeInTheDocument();
  });
});
