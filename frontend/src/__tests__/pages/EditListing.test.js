import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import EditListing from '../../pages/EditListing';

describe('EditListing page', () => {
  beforeEach(() => {
    render(
      <Router>
        <EditListing />
      </Router>
    );
  });

  test('renders edit listing form', () => {
    expect(screen.getByText('Listing not found')).toBeInTheDocument();
  });

  // TODO add test if id has a value (mocked)
});