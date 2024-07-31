import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import EditListing from '../../pages/EditListing';
import { SAMPLE_LISTING } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
})); 

describe('EditListing page', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('renders edit listing form with no listing', () => {
    const id = 'invalid';
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: id });
    render(
      <Router>
        <EditListing />
      </Router>
    );

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: undefined };
    mockAxios.mockResponse(responseObj);
    
    expect(screen.getByText('No Listing Available')).toBeInTheDocument();
  });

  test('renders edit listing with a listing', async () => {
    const id = '21';
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ id: id });
    render(
      <Router>
        <EditListing />
      </Router>
    );

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { 
      status: 200, 
      data: SAMPLE_LISTING
    };
    mockAxios.mockResponse(responseObj);
    await waitFor(() => {
      expect(screen.getByText('Edit Listing')).toBeInTheDocument();
    })
  });
});