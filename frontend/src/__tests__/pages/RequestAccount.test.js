// RequestAccount.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import RequestAccount from '../../pages/RequestAccount';
import { MemoryRouter } from 'react-router-dom';

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


  expect(screen.getByText(/Must be a valid @uvic.ca email/i)).toBeInTheDocument();
});

test('navigates to /check-email on successful form submission', () => {
  render(
    <MemoryRouter>
      <RequestAccount />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/email@uvic.ca/i);
  const submitButton = screen.getByRole('button', { name: /Request Account/i });

  fireEvent.change(emailInput, { target: { value: 'test@uvic.ca' } });
  fireEvent.click(submitButton);


  expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
});
