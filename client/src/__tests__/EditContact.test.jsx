import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditContact from '../components/EditContact'; 

describe('EditContact', () => {
  // Mock window.alert before each test
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    render(<EditContact />);
  });

  test('Shows error for required fields', async () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const saveButton = screen.getByRole('button', { name: /save changes/i });

    // Simulating clearing the fields
    await userEvent.clear(nameInput);
    await userEvent.clear(emailInput);

    // Simulating submitting the form (instead of just clicking the button)
    fireEvent.submit(saveButton);

    // Waiting for the alert to be called
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Name and Email are required!');
    });
  });
});
