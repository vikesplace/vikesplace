import React from 'react';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageListings from '../../pages/ManageListings';
import { SAMPLE_LISTING_LIST } from '../../testSetup/TestData';
import { SAMPLE_DATA } from '../../utils/SampleRecommenderData';

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
    const listingCards = screen.getAllByTestId('listing-card');
    expect(listingCards.length).toBe(SAMPLE_DATA.length); // Based on initialListings length
  });
});