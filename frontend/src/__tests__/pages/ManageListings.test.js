import React from 'react';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageListings from '../../pages/ManageListings';
import { SAMPLE_LISTING_LIST } from '../TestData';

describe('ManageListings page', () => {
  beforeEach(() => {
    render(
      <Router>
        <ManageListings />
      </Router>
    );
  });

  test('renders listing cards', async () => {
    // TODO mock axios response so this continues to happen
    const listingCards = screen.getAllByText(/Test 1|Super cool object|Buy Me!|Another listings for sale/);
    expect(listingCards.length).toBe(4); // Based on initialListings length
  });
});