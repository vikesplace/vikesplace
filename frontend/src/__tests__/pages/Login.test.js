import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login';
import AuthService from '../../services/AuthService';
import { Store } from 'react-notifications-component';
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

jest.mock('../../services/AuthService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

describe('Login Component', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    renderComponent();

    expect(screen.getByText('Welcome to VikesPlace!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows username error on blur when username is empty', () => {
    renderComponent();

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    fireEvent.blur(usernameInput);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  test('shows password error on blur when password is empty', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('does not show username error when username is valid', () => {
    renderComponent();

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.blur(usernameInput);

    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
  });

  test('does not show password error when password is valid', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.blur(passwordInput);

    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  test('submits form and navigates to /home when form is valid', async () => {
    AuthService.mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({ status: 200 }),
    }));

    renderComponent();

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('displays notification on login failure', async () => {
    AuthService.mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({ status: 401 }),
    }));

    renderComponent();

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Unable to Login',
        message: 'Please try again',
      }));
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('does not navigate when form is invalid on submission', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates to request account page when "Need an account?" link is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('link', { name: /Need an account\?/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/request-account');
    });
  });

});