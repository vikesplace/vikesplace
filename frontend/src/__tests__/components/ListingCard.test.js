import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingCard from '../../components/ListingCard';
import { SAMPLE_LISTING } from '../../testSetup/TestData';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ListingCard component', () => {
  let useNavigateMock;

  beforeEach(() => {
    render(
      <Router>
        <ListingCard id={SAMPLE_LISTING.id} title={SAMPLE_LISTING.id} price={SAMPLE_LISTING.price} location={SAMPLE_LISTING.location} status={SAMPLE_LISTING.status} category={SAMPLE_LISTING.category} />
      </Router>
    );
  });
  
  test('component links to correct page', () => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    fireEvent.click(document);

    waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/listings/'+SAMPLE_LISTING.id);
    })

    jest.clearAllMocks();
  });

});