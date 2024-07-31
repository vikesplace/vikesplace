// SearchHistory.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import SearchHistory from '../../pages/SearchHistory';
import { SAMPLE_SEARCHES } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

describe('SeachHistory page', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders SearchHistory component', async () => {

    //TODO update once SearchHistory is implemented
    
    render(<SearchHistory />);
    const searchHistoryElement = screen.getByText(/Search History is coming soon!/i);
    expect(searchHistoryElement).toBeInTheDocument();

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_BACK_API + 'users/me/searches', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: SAMPLE_SEARCHES };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      const listingCards = screen.getAllByTestId('history-card');
      expect(listingCards.length).toBe(SAMPLE_SEARCHES.length);
    })
  });
});
