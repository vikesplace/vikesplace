import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VerifyAccount from '../../pages/VerifyAccount';

describe('VerifyAccount Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('renders the component', () => {
    render(<VerifyAccount />);
    expect(screen.getByText('Finish Creating Account')).toBeInTheDocument();
  });

  test('validates the username field correctly', () => {
    render(<VerifyAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.blur(usernameInput);

    expect(screen.getByText('Username is required')).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.blur(usernameInput);

    expect(screen.getByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'valid_user' } });
    fireEvent.blur(usernameInput);

    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).not.toBeInTheDocument();
  });

  test('validates the password field correctly', () => {
    render(<VerifyAccount />);

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(passwordInput);

    expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).not.toBeInTheDocument();
  });

  test('validates the confirm password field correctly', () => {
    render(<VerifyAccount />);

    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass1!' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByText('Must match password')).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.queryByText('Must match password')).not.toBeInTheDocument();
  });

  test('validates the postal code field correctly', () => {
    render(<VerifyAccount />);

    const postalCodeInput = screen.getByLabelText(/postal code/i);
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByText('Please enter a valid postal code (format: A1A 1A1)')).toBeInTheDocument();

    fireEvent.change(postalCodeInput, { target: { value: 'K1A 0B1' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.queryByText('Please enter a valid postal code (format: A1A 1A1)')).not.toBeInTheDocument();
  });

  test('submits the form with valid data', () => {
    render(<VerifyAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const postalCodeInput = screen.getByLabelText(/postal code/i);
    const submitButton = screen.getByText(/sign up/i);

    fireEvent.change(usernameInput, { target: { value: 'valid_user' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(postalCodeInput, { target: { value: 'K1A 0B1' } });

    fireEvent.click(submitButton);

    // Assuming console.log is used to simulate form submission
    expect(console.log).toHaveBeenCalledWith({
      username: 'valid_user',
      password: 'ValidPass1!',
      postalCode: 'K1A 0B1',
    });
  });
});
