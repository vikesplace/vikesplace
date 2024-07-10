import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../../pages/UserProfile';
import { SAMPLE_USER } from '../../utils/SampleRecommenderData';

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

    expect(screen.getByText(SAMPLE_USER.username)).toBeInTheDocument();
    expect(screen.getByText(SAMPLE_USER.email)).toBeInTheDocument();
    expect(screen.getByText(SAMPLE_USER.location)).toBeInTheDocument();
    expect(screen.getByText(SAMPLE_USER.createDate)).toBeInTheDocument();
  });
});
