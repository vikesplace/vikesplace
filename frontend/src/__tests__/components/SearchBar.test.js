import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter as Router } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar.js';
import { useSearch } from '../../components/searchbar/searchContext';

jest.mock('../../components/searchbar/searchContext', () => ({
  useSearch: jest.fn(),
}));

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn()
}));

describe('SearchBar component', () => {
  let useNavigateMock;
  let useLocationMock;
  const setShowSearchMock = jest.fn();

  const renderComponent = () => {
    return render(
      <Router>
        <SearchBar />
      </Router>
    );
  };

  beforeEach(() => {
    useSearch.mockReturnValue({
      setShowSearch: setShowSearchMock,
    });
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(useNavigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders component', async () => {
    useLocationMock = {
      pathname: '/home',
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(useLocationMock);

    renderComponent();

    waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    })
  });

  test('enter text and click enter', async () => {
    useLocationMock = {
      pathname: '/listings',
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(useLocationMock);

    renderComponent();

    waitFor(() => {
      expect(screen.getByTestId('searchField')).toBeInTheDocument();
      fireEvent.change(screen.getByTestId('searchField'), {target: {value: 'laptop'}});
      fireEvent.keyDown(screen.getByTestId('searchField'), {key: "Enter"});
    })
  });

  test('navigate to history', async () => {
    useLocationMock = {
      pathname: '/home',
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(useLocationMock);

    renderComponent();

    waitFor(() => {
      expect(screen.getByTestId('historyIcon')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('historyIcon'));
      expect(useNavigateMock).toHaveBeenCalledWith("/history");
    })
  });
});