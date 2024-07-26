import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../../pages/UserProfile';
import { SAMPLE_USER_DATA } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

const API_URL = "http://localhost:8080/";

describe('UserProfile Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders without crashing', () => {
    render(<UserProfile />);
  });

  test('displays the correct user information', async () => {
    render(<UserProfile />);

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/me',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: SAMPLE_USER_DATA };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      const usernameElement = screen.getByText(/Username:/i);
      expect(usernameElement).toBeInTheDocument();
      expect(screen.getByText(SAMPLE_USER_DATA.username)).toBeInTheDocument();
    })

    const postalCodeElement = screen.getByText(/Postal Code:/i);
    const createDateElement = screen.getByText(/Date Joined:/i);

    expect(postalCodeElement).toBeInTheDocument();
    expect(createDateElement).toBeInTheDocument();

    const dateFormatted = "Jun 19, 2024"; // Based on SAMPLE_USER_DATA.joiningDate
    expect(screen.getByText(SAMPLE_USER_DATA.location)).toBeInTheDocument();
    expect(screen.getByText(dateFormatted)).toBeInTheDocument();
  });
});
