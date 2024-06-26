import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import RequestAccount from "../../pages/RequestAccount";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RequestAccount Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RequestAccount />
      </MemoryRouter>
    );
  });

  test('renders without crashing', () => {
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByText('Enter your "@uvic.ca" email to sign up')).toBeInTheDocument();
    expect(screen.getByLabelText('email@uvic.ca')).toBeInTheDocument();
    expect(screen.getByText('Request Account')).toBeInTheDocument();
    expect(screen.getByText('Have an account already? Login')).toBeInTheDocument();
  });

  test('displays email validation error', async () => {
    const emailInput = screen.getByLabelText('email@uvic.ca');
    const submitButton = screen.getByText('Request Account');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('Must be a valid @uvic.ca email')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('handles form submission with valid email', async () => {
    const emailInput = screen.getByLabelText('email@uvic.ca');
    const submitButton = screen.getByText('Request Account');

    fireEvent.change(emailInput, { target: { value: 'validemail@uvic.ca' } });
    fireEvent.blur(emailInput);
    fireEvent.click(submitButton);

    // Wait for async navigation to finish
    await act(async () => {
      expect(mockNavigate).toHaveBeenCalledWith('/check-email');
    });
  });
});
