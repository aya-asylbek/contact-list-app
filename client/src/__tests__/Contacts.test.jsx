import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacts from '../components/Contacts';

describe('Contacts Component', () => {
  const mockContacts = [
    { id: 1, name: 'Aya Test' },
    { id: 2, name: 'Test Test' }
  ];
  const mockHandlers = {
    onViewContact: jest.fn(), 
    onEditContact: jest.fn(),
    onDeleteContact: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact list correctly', () => {
    render(<Contacts contacts={mockContacts} {...mockHandlers} />);
    
    // Fixed role queries
    expect(screen.getByRole('heading', { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /view/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
  });

  test('handles button clicks correctly', async () => {
    const user = userEvent.setup();
    render(<Contacts contacts={mockContacts} {...mockHandlers} />);

    // Test first contact buttons
    await user.click(screen.getAllByRole('button', { name: /view/i })[0]);
    expect(mockHandlers.onViewContact).toHaveBeenCalledWith(1);

    await user.click(screen.getAllByRole('button', { name: /edit/i })[0]);
    expect(mockHandlers.onEditContact).toHaveBeenCalledWith(mockContacts[0]);

    await user.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(mockHandlers.onDeleteContact).toHaveBeenCalledWith(1);
  });

  test('shows empty state when no contacts', () => {
    render(<Contacts contacts={[]} {...mockHandlers} />);
    
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});