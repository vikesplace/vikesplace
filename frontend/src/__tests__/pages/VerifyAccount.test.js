import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import VerifyAccount from '../../pages/VerifyAccount';
import mockAxios from 'jest-mock-axios';
import AuthService from '../../services/AuthService';
import { Store } from 'react-notifications-component';

jest.mock('../../services/AuthService');

describe('VerifyAccount Component', () => {

  let mockVerify;

  beforeEach(() => {
    mockVerify = jest.fn();
    AuthService.mockImplementation(() => {
      return {
        verify: mockVerify
      };
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );
    expect(screen.getByText('Finish Creating Account')).toBeInTheDocument();
  });

  test('validates the username field correctly', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
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
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const passwordInput = screen.getByRole('textbox', { name: /password/i });

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(passwordInput);
    expect(screen.queryByText(/Must be 8+ characters/i)).not.toBeInTheDocument();
  });

  test('validates the confirm password field correctly', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const confirmPasswordInput = screen.getByLabelText(/confirm/i);
    const passwordInput = screen.getByRole('textbox', { name: /password/i });

    fireEvent.blur(confirmPasswordInput);
    expect(screen.queryByText('Must match password')).not.toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass1!' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByText('Must match password')).toBeInTheDocument();
  });

  test('validates the postal code field correctly', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByText('Please enter a valid postal code with format A1A1A1')).toBeInTheDocument();

    fireEvent.change(postalCodeInput, { target: { value: 'K1A0B1' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.queryByText('Please enter a valid postal code with format A1A1A1')).not.toBeInTheDocument();
  });

  test('submits the form correctly with valid inputs', async () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox', { name: /username/i }), { target: { value: 'valid_user' } });
    fireEvent.change(screen.getByRole('textbox', { name: /password/i }), { target: { value: 'ValidPass1!' } });
    fireEvent.change(screen.getByLabelText(/confirm/i), { target: { value: 'ValidPass1!' } });
    fireEvent.change(screen.getByRole('textbox', { name: /postal code/i }), { target: { value: 'K1A0B1' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockVerify).toHaveBeenCalled();
    });
  });

  test('displays errors when the form is submitted with invalid fields', async () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

})