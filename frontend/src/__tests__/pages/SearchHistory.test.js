// SearchHistory.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import SearchHistory from '../../pages/SearchHistory' ;

test('renders SearchHistory component', () => {
  render(<SearchHistory />);
  const searchHistoryElement = screen.getByText(/Search History is coming soon!/i);
  expect(searchHistoryElement).toBeInTheDocument();
});
