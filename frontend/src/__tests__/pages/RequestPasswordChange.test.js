// RequestPasswordChange.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestPasswordChange from '../../pages/RequestPasswordChange';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
      ...originalModule,
      useNavigate: () => jest.fn(),
    };
  });

describe('RequestPasswordChange Component', () => {
  test('renders the component correctly', () => {
    render(
      <Router>
        <RequestPasswordChange />
      </Router>
    );

    // Check for the heading
    expect(screen.getByRole('heading', { level: 1, name: /Request Password Change/i })).toBeInTheDocument();
    // Check for the subheading
    expect(screen.getByRole('heading', { level: 6, name: /Enter the "@uvic.ca" email to assocaited with your account/i })).toBeInTheDocument();
    // Check for the email input field
    expect(screen.getByLabelText(/email@uvic.ca/i)).toBeInTheDocument();
    // Check for the submit button
    expect(screen.getByRole('button', { name: /Request Password Change/i })).toBeInTheDocument();
    // Check for the login link
    expect(screen.getByRole('link', { name: /Prefer to login?/i })).toBeInTheDocument();
  });

  test('displays an error message for invalid email', async () => {
    render(
      <Router>
        <RequestPasswordChange />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Must be a valid @uvic.ca email/i)).toBeInTheDocument();
    });
  });

  test('displays an error message for empty email', async () => {
    render(
      <Router>
        <RequestPasswordChange />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);

    fireEvent.change(emailInput, { target: { value: ""} });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  test('navigates to /check-password on successful form submission', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    render(
      <Router>
        <RequestPasswordChange />
      </Router>
    );
  
    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    const submitButton = screen.getByRole('button', { name: /Request Password Change/i });
  
    fireEvent.change(emailInput, { target: { value: 'test@uvic.ca' } });
    fireEvent.click(submitButton);
  
    expect(navigate).toHaveBeenCalledWith('/check-email');
  });
});
