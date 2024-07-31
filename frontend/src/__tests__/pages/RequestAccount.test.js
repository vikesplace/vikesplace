import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import RequestAccount from '../../pages/RequestAccount';
import mockAxios from 'jest-mock-axios';

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe('RequestAccount page', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );
  };

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('renders RequestAccount component', () => {
    renderComponent();

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter your "@uvic.ca" email to sign up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email@uvic.ca/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Have an account already\? Login/i)).toBeInTheDocument();
  });

  test('shows email validation error on invalid email', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/Must be a valid @uvic.ca email/i)).toBeInTheDocument();
  });

  test('shows required email error on empty email input', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    expect(screen.queryByText((content, element) => {
      return content.includes('Must be a valid @uvic.ca email');
    })).toBeInTheDocument();
  });

  test('navigates to /check-email on successful form submission', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/email@uvic.ca/i);
    const submitButton = screen.getByRole('button', { name: /Request Account/i });

    const email = 'test@uvic.ca';
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);

    const callback = process.env.REACT_APP_FRONT_URL + 'verify-account/';
    expect(mockAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'request_account', 
      { email, callback }
    );

    // Simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/check-email');
    });
  });
});
