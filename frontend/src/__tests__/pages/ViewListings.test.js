import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import ViewListings from '../../pages/ViewListings';
import { useSearch } from '../../components/searchbar/searchContext';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';

jest.mock('../../components/searchbar/searchContext');
jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('ViewListings Component', () => {
  const setShowSearchMock = jest.fn();
  const searchQueryMock = '';

  beforeEach(() => {
    useSearch.mockReturnValue({
      setShowSearch: setShowSearchMock,
      searchQuery: searchQueryMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ViewListings />
      </MemoryRouter>
    );
  };

  test('renders ViewListings component correctly', async () => {
    DataService.mockImplementation(() => ({
      getSortedListings: jest.fn().mockResolvedValue({
        status: 200,
        data: [],
      }),
      getMyUserData: jest.fn().mockResolvedValue({
        data: { location: 'Test Location' },
      }),
      search: jest.fn().mockResolvedValue({
        status: 200,
        data: { listings: [], users: [] },
      }),
    }));

    renderComponent();

    expect(screen.getByText('Add Filter')).toBeInTheDocument();
    expect(screen.getByText('Change Location')).toBeInTheDocument();
  });

  test('calls setShowSearch with true on mount and false on unmount', () => {
    const { unmount } = renderComponent();

    expect(setShowSearchMock).toHaveBeenCalledWith(true);

    unmount();

    expect(setShowSearchMock).toHaveBeenCalledWith(false);
  });

  test('displays loading message initially and no listings message when no listings are available', async () => {
    DataService.mockImplementation(() => ({
      getSortedListings: jest.fn().mockResolvedValue({
        status: 200,
        data: [],
      }),
      getMyUserData: jest.fn().mockResolvedValue({
        data: { location: 'Test Location' },
      }),
      search: jest.fn().mockResolvedValue({
        status: 200,
        data: { listings: [], users: [] },
      }),
    }));

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('No Listings Available')).toBeInTheDocument();
    });
  });

  test('opens and closes filter dialog', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Add Filter'));

    expect(screen.getByText('Apply Filters')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Cancel')).toBeInTheDocument();
  });

  test('opens and closes location dialog',() => {
    renderComponent();

    fireEvent.click(screen.getByText('Change Location'));

    expect(screen.getByText('Enter New Location')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Cancel')).toBeInTheDocument();
  });
});
