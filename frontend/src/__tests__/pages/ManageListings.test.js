import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageListings from '../../pages/ManageListings';
import { SAMPLE_LISTING_LIST } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

describe('ManageListings page', () => {
  beforeEach(() => {
    render(
      <Router>
        <ManageListings />
      </Router>
    );
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders listing cards', async () => {
    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'listings/me', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: SAMPLE_LISTING_LIST };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      expect(listingCards.length).toBe(SAMPLE_LISTING_LIST.length);
    })
  });
});