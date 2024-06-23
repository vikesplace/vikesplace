import React from 'react';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageListings from '../../pages/ManageListings';

const listings = [
    { id: '4', title: 'Test 1', price: '2.00', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' },
    { id: '10',title: 'Super cool object', price: '3.45', location: 'V9V 9W9', category: 'Technology',status: 'SOLD' },
    { id: '100',title: 'Buy Me!', price: '1234.56', location: 'V9V 9W9', category: 'SchoolSupplies',status: 'AVAILABLE' },
    { id: '3',title: 'Another listings for sale', price: '98765432.10', location: 'V9V 9W9', category: 'Furniture', status: 'AVAILABLE' }
  ];

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