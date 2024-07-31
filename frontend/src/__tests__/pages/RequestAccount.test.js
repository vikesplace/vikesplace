// RequestAccount.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import RequestAccount from '../../pages/RequestAccount';
import { MemoryRouter } from 'react-router-dom';
import mockAxios from 'jest-mock-axios';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('RequestAccount page', () => {
  beforeEach(() => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('renders RequestAccount component', () => {
    render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter your "@uvic.ca" email to sign up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email@uvic.ca/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Have an account already\? Login/i)).toBeInTheDocument();
  });

  test('shows email validation error on invalid email', () => {
    render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/Must be a valid @uvic.ca email/i)).toBeInTheDocument();
  });


  test('shows required email error on empty email input', () => {
    render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    // More flexible text matcher to account for potential wrapping
    expect(screen.queryByText((content, element) => {
      return content.includes("Email is required");
    })).toBeInTheDocument();
  });

  test('navigates to /check-email on successful form submission', async () => {
    render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    const submitButton = screen.getByRole('button', { name: /Request Account/i });

    const email = 'test@uvic.ca';
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);

    const callback = process.env.REACT_APP_FRONT_URL + "verify-account/";
    expect(mockAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'request_account', 
      {email, callback}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    expect(useNavigateMock).toHaveBeenCalledWith('/check-email');
  });
});
