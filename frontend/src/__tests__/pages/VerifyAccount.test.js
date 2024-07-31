import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import VerifyAccount from '../../pages/VerifyAccount';
import mockAxios from 'jest-mock-axios';
import { useNavigate } from 'react-router';

const API_URL = "http://localhost:8080/";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}));

describe('VerifyAccount Component', () => {
  let useLocationMock;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    useLocationMock = require('react-router-dom').useLocation;
    useLocationMock.mockReturnValue(jest.fn());

    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    mockAxios.reset();
    console.log.mockRestore();
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

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);


    expect(screen.getByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(passwordInput);
    expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).not.toBeInTheDocument();
  });

  test('validates the confirm password field correctly', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(confirmPasswordInput.tagName).toBe('INPUT');
    expect(passwordInput.tagName).toBe('INPUT');

   
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass1!' } });
    fireEvent.blur(confirmPasswordInput);


    expect(screen.getByText('Must match password')).toBeInTheDocument();


    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.queryByText('Must match password')).not.toBeInTheDocument();
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

  test('submits the form with valid data', () => {
    render(
      <MemoryRouter>
        <VerifyAccount />
      </MemoryRouter>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    const confirmPasswordInput = screen.getByRole('textbox', { name: /confirm password/i });
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    const username = "test@uvic.ca";
    const password = "PassVal123#";
    const postalCode = "V9V9V9";

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: password } });
    fireEvent.change(postalCodeInput, { target: { value: postalCode } });

    fireEvent.click(submitButton);
    const jwt = "ThisRepresentsAJWT1234";
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'verify_account', 
      {jwt, username, password, location}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/verified');
    });
  });
});
