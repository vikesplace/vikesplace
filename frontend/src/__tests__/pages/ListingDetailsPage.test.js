import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingDetailsPage from '../../pages/ListingDetailsPage';
import { SAMPLE_LISTING } from '../../testSetup/TestData'

// TODO get this to mock useParams correctly
/* jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
})); */

describe('ListingDetailsPage page', () => {

    beforeEach(() => {
        render(
          <Router>
            <ListingDetailsPage />
          </Router>
        );
    });
    
    test('renders listing detalis page with invalid id', () => {
      // jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'invalid' });
      expect(screen.getByText('No Listing Found')).toBeInTheDocument();
    });
    
    // TODO add test for mocked id/axois call
});