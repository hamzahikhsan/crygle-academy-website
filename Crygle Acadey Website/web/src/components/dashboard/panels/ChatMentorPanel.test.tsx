import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChatMentorPanel } from './ChatMentorPanel.jsx';

describe('ChatMentorPanel', () => {
  it('renders all 4 threads and defaults to the Dimas conversation', () => {
    render(<ChatMentorPanel />);
    expect(screen.getByText('Randy Pratama')).toBeInTheDocument();
    expect(screen.getByText('Siti Aminah')).toBeInTheDocument();
    expect(screen.getByText('Bantuan Asrama')).toBeInTheDocument();
    expect(screen.getByText(/Bagaimana progres pengerjaan modul/)).toBeInTheDocument();
  });

  it('switches conversation when a different thread is clicked', () => {
    render(<ChatMentorPanel />);
    fireEvent.click(screen.getByText('Randy Pratama'));
    expect(screen.getByText(/Untuk shader blender, periksa node metallic/)).toBeInTheDocument();
  });

  it('appends a new message when the composer is submitted', () => {
    render(<ChatMentorPanel />);
    fireEvent.change(
      screen.getByPlaceholderText('Tulis pesan konsultasi atau tempel link Figma...'),
      { target: { value: 'Terima kasih mas!' } }
    );
    fireEvent.submit(
      screen.getByPlaceholderText('Tulis pesan konsultasi atau tempel link Figma...').closest('form')!
    );
    expect(screen.getByText('Terima kasih mas!')).toBeInTheDocument();
  });
});
