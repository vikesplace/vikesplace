import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingDetailsPage from '../../pages/ListingDetailsPage';

describe('ListingDetailsPage page', () => {

    beforeEach(() => {
        render(
          <Router>
            <ListingDetailsPage />
          </Router>
        );
    });
    
    test('renders listing detalis page', () => {
      expect(screen.getByText('No Listing Found')).toBeInTheDocument();
    });
    
    // TODO add test if id has a value (mocked)
});