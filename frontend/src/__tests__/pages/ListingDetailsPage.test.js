import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingDetailsPage from '../../pages/ListingDetailsPage';
import { SAMPLE_LISTING } from '../TestData';

describe('ListingDetailsPage page', () => {

    beforeEach(() => {
        render(
          <Router>
            <ListingDetailsPage />
          </Router>
        );
    });
    
    test('renders edit listing form', () => {
      expect(screen.getByText('Listing not found')).toBeInTheDocument();
    });
    
    // TODO add test if id has a value (mocked)
});