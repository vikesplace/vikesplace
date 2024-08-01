import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RecommendedItem from '../../components/recommender/RecommendedItem.js';
import DataService from '../../services/DataService.js';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock DataService
jest.mock('../../services/DataService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      ignoreRecommendation: jest.fn()
    };
  });
});

describe('Recommender Component', () => {
  const props = {
    id: 123,
    title: 'Listing Name',
    status: 'AVAILABLE',
    price: 10,
    location: 'V9V9V9',
    forCharity: false
  };
  let useNavigateMock;
  let dataServiceMock;

  test('renders recommender item links to correct page', async () => {
    render(
      <Router> 
        <RecommendedItem props={props} />
      </Router>);

    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    fireEvent.click(document);

    waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/listings/'+props.id);
    })

    jest.clearAllMocks();
  });

  test('ignore button calls ignoreRecommendation', async () => {
    render(
      <Router> 
        <RecommendedItem props={props} />
      </Router>);
    dataServiceMock = new DataService();
    dataServiceMock.ignoreRecommendation.mockResolvedValueOnce({
      status: 200
    });

    const ignoreButton = screen.getByRole('button', { name: /ignore/i });
    fireEvent.mouseDown(ignoreButton);

    waitFor(() => {
      expect(dataServiceMock.ignoreRecommendation).toHaveBeenCalledWith(props.id);
    })

    jest.clearAllMocks();
  });
});