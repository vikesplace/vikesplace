import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  let useNavigateMock;

  beforeEach(() => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText('Welcome to VikesPlace!')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows username error on blur when username is empty', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    fireEvent.blur(usernameInput);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  test('shows password error on blur when password is empty', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('does not show username error when username is valid', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    fireEvent.change(usernameInput, { target: { value: 'validUsername' } });
    fireEvent.blur(usernameInput);

    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
  });

  test('does not show password error when password is valid', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    fireEvent.blur(passwordInput);

    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  test('submits form and navigates to / when form is valid', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'validUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(useNavigateMock).toHaveBeenCalledWith('/');
  });

  test('does not navigate when form is invalid on submission', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(useNavigateMock).not.toHaveBeenCalled();
  });

  test('navigates to request account page when "Create Account" button is clicked', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(useNavigateMock).toHaveBeenCalledWith('/request-account');
  });
});
