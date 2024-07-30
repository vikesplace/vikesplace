// CompletePasswordChange.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CompletePasswordChange from '../../pages/CompletePasswordChange';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => jest.fn(),
    useParams: () => ({ jwt: 'mock-jwt' }) 
  };
});

describe('CompletePasswordChange Component', () => {
  test('renders the component correctly', () => {
    render(
      <Router>
        <CompletePasswordChange />
      </Router>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Change Password/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('displays error message for invalid password format', () => {
    render(
      <Router>
        <CompletePasswordChange />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/Must be 8\+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter/i)).toBeInTheDocument();
  });

  test('displays error message for password with spaces', () => {
    render(
      <Router>
        <CompletePasswordChange />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password with spaces' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/Must be 8\+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter/i)).toBeInTheDocument();
  });

  test('submits the form with valid password', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <Router>
        <CompletePasswordChange />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    const form = screen.getByTestId('password-form'); 

    fireEvent.change(passwordInput, { target: { value: 'StrongPassword!1' } });
    fireEvent.click(submitButton);

    expect(navigate).toHaveBeenCalledWith('/password-updated');
  });
});
