import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import EditListing from '../../pages/EditListing';

// TODO get this to mock useParams correctly
/* jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
})); */

describe('EditListing page', () => {
  beforeEach(() => {
    render(
      <Router>
        <EditListing />
      </Router>
    );
  });

  test('renders edit listing form', () => {
    // jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'invalid' });
    expect(screen.getByText('No Listing Found')).toBeInTheDocument();
  });

  // TODO add test for mocked id/axois call
});