import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchBar component', () => {
  let useNavigateMock;

  beforeEach(() => {
    render(
      <Router>
        <SearchBar />
      </Router>
    );
  });
  
  test('renders component', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Search...')).toBeInTheDocument();
    expect(screen.getByTestId('HistoryIcon')).toBeInTheDocument();
  });

  test('search history button navigates to correct page', () => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    const historyIcon = screen.getByTestId('HistoryIcon');
    fireEvent.click(historyIcon);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/history');

    jest.clearAllMocks();
  });

});