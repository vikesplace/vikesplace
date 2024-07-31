// SearchHistory.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchHistory from '../../pages/SearchHistory';
import mockAxios from 'jest-mock-axios';
import DataService from '../../services/DataService';

jest.mock('../../services/DataService');

describe('SearchHistory Component', () => {
  const mockHistoryData = {
    data: {
      searches: ['query1', 'query2', 'query3', 'query4', 'query5', 'query6', 'query7', 'query8', 'query9', 'query10', 'query11']
    }
  };

  beforeEach(() => {
    DataService.mockClear();
  });

  test('displays loading message initially', () => {
    DataService.mockImplementationOnce(() => ({
      getUserSearchHistory: jest.fn().mockResolvedValue({ data: { searches: [] } })
    }));

    render(<SearchHistory />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays no search history message when no data is available', async () => {


    render(<SearchHistory />);

    await waitFor(() => {
      expect(screen.getByText('No Search History Available')).toBeInTheDocument();
    });
  });

  test('handles page change correctly', async () => {
    DataService.mockImplementationOnce(() => ({
      getUserSearchHistory: jest.fn().mockResolvedValue(mockHistoryData)
    }));

    render(<SearchHistory />);

    await waitFor(() => expect(screen.getByText('query1')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    await waitFor(() => expect(screen.getByText('query11')).toBeInTheDocument());
  });
 
});
