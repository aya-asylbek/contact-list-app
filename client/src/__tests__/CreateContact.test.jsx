import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateContact from '../components/CreateContact'; 

describe('CreateContact Component', () => {
  it('renders the form with required fields and a submit button', () => {
    render(<CreateContact onCreateContact={() => {}} />);

    expect(screen.getByRole('heading', { name: /create new contact/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Notes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add contact/i })).toBeInTheDocument();
  });
});
