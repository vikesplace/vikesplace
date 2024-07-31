// SearchHistory.test.js
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import SearchHistory from '../../pages/SearchHistory';
import { SAMPLE_SEARCHES } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

describe('SeachHistory page', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders SearchHistory component no history', async () => {
    render(<SearchHistory />);

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'users/me/searches', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: undefined };
    mockAxios.mockResponse(responseObj);
    
    const tableRows = container.querySelectorAll<HTMLElement>('table tbody tr')
    expect(within(tableRows[0]).getByRole('cell').getByText('No Search History Available')).toBeInTheDocument();
    // expect(screen.getByText('No Search History Available')).toBeInTheDocument();
  });

  test('renders SearchHistory component with history', async () => {
    render(<SearchHistory />);

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'users/me/searches', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: {searches: SAMPLE_SEARCHES} };
    mockAxios.mockResponse(responseObj);

    const tableRows = container.querySelectorAll<HTMLElement>('table tbody tr')
    expect(within(tableRows[0]).queryAllByRole('cell'));


    await waitFor(() => {
      const listingCards = screen.getAllByTestId('history-card');
      expect(listingCards.length).toBe(SAMPLE_SEARCHES.length);
    })
  });
});
