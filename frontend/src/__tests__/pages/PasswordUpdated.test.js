import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordUpdated from '../../pages/PasswordUpdated';

describe('PasswordUpdated', () => {
  const renderComponent = () => {
    return render(
      <Router>
        <PasswordUpdated />
      </Router>
    );
  };

  it('renders the Done! message', () => {
    renderComponent();
    expect(screen.getByText(/Done!/i)).toBeInTheDocument();
  });

  it('renders the password updated message', () => {
    renderComponent();
    expect(screen.getByText(/Your password has been updated and is ready for use./i)).toBeInTheDocument();
  });

  it('renders the login prompt message', () => {
    renderComponent();
    expect(screen.getByText(/Please login before continuing./i)).toBeInTheDocument();
  });

  it('renders the login button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('renders the login button with correct link', () => {
    renderComponent();
    expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
  });
});
