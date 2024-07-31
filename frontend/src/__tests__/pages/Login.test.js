import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login';
import AuthService from '../../services/AuthService';
import { Store } from 'react-notifications-component';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../services/AuthService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

describe('Login Component', () => {
  let useNavigateMock;
  let navigate;

  beforeEach(() => {
    useNavigateMock = require('react-router-dom').useNavigate;
    navigate = jest.fn();
    useNavigateMock.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to VikesPlace!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows username error on blur when username is empty', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    fireEvent.blur(usernameInput);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  test('shows password error on blur when password is empty', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('does not show username error when username is valid', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.blur(usernameInput);

    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
  });

  test('does not show password error when password is valid', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.blur(passwordInput);

    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  test('submits form and navigates to /home when form is valid', async () => {
    AuthService.mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({ status: 200 }),
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/home');
    });
  });

  test('displays notification on login failure', async () => {
    AuthService.mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({ status: 401 }),
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Unable to Login',
        message: 'Please try again',
      }));
    });

    expect(navigate).not.toHaveBeenCalled();
  });

  test('does not navigate when form is invalid on submission', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByTestId('form'));


    expect(navigate).not.toHaveBeenCalled();
  });

  /*
  test('navigates to request account page when "Need an account?" link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Need an account?'));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/request-account');
    });
  });
  */

});
