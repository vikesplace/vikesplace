import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingDetailsPage from '../../pages/ListingDetailsPage';
import { SAMPLE_LISTING } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

const API_URL = "http://localhost:8080/";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
})); 

describe('ListingDetailsPage page', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });
    
  test('renders listing detalis page with invalid id', () => {
    const id = 'invalid';
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: id });
    render(
      <Router>
        <ListingDetailsPage />
      </Router>
    );

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: undefined };
    mockAxios.mockResponse(responseObj);
    
    expect(screen.getByText('No Listing Found')).toBeInTheDocument();
  });

  test('renders listing detalis page with valid id', async () => {
    const id = '21';
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: id });
    render(
      <Router>
        <ListingDetailsPage />
      </Router>
    );

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { 
      status: 200, 
      data: SAMPLE_LISTING
    };
    mockAxios.mockResponse(responseObj);
    
    await waitFor(() => {
      expect(screen.getByText(responseObj.data.title)).toBeInTheDocument();
    })
  });
});