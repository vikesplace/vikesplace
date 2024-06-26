import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../../pages/UserProfile';

describe('UserProfile Component', () => {
  test('renders without crashing', () => {
    render(<UserProfile />);
  });

  test('displays the correct user information', () => {
    render(<UserProfile />);

    const usernameElement = screen.getByText(/Username:/i);
    const emailElement = screen.getByText(/Email:/i);
    const postalCodeElement = screen.getByText(/Postal Code:/i);
    const createDateElement = screen.getByText(/Date Joined:/i);

    expect(usernameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(postalCodeElement).toBeInTheDocument();
    expect(createDateElement).toBeInTheDocument();

    expect(screen.getByText('vikesperson123')).toBeInTheDocument();
    expect(screen.getByText('fakeuser@uvic.ca')).toBeInTheDocument();
    expect(screen.getByText('A1B 2C3')).toBeInTheDocument();
    expect(screen.getByText('June 15, 2024')).toBeInTheDocument();
  });
});
