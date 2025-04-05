import { render, screen, fireEvent } from '@testing-library/react';
import ViewContact from '../components/ViewContact'; 

describe('ViewContact', () => {
  const contact = {
    name: 'Britney Spears',
    email: 'britney@gmail.com',
    phone: '123-456-7890',
    notes: 'Best singer',
    street: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '12345',
    profession: 'Artist',
  };

  test('displays contact information correctly', () => {
    render(<ViewContact contact={contact} onEdit={jest.fn()} onBack={jest.fn()} />);
    
    // Check if the contact details are displayed
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${contact.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Phone: ${contact.phone}`)).toBeInTheDocument();
    expect(screen.getByText(`Notes: ${contact.notes}`)).toBeInTheDocument();
    expect(screen.getByText(`Address: ${contact.street}, ${contact.city}, ${contact.state} ${contact.zip_code}`)).toBeInTheDocument();
    expect(screen.getByText(`Profession: ${contact.profession}`)).toBeInTheDocument();
  });

  test('calls onEdit when "Edit" button is clicked', () => {
    const onEdit = jest.fn();
    render(<ViewContact contact={contact} onEdit={onEdit} onBack={jest.fn()} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalled();
  });

  test('calls onBack when "Back" button is clicked', () => {
    const onBack = jest.fn();
    render(<ViewContact contact={contact} onEdit={jest.fn()} onBack={onBack} />);
    
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    
    expect(onBack).toHaveBeenCalled();
  });
});
