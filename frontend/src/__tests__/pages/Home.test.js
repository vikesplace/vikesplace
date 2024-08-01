import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../pages/Home';
import { useSearch } from '../../components/searchbar/searchContext';

jest.mock('../../components/searchbar/searchContext', () => ({
  useSearch: jest.fn(),
}));

jest.mock('../../components/recommender/RecommendedGrid', () => () => <div data-testid="recommended-list" />);

describe('Home Component', () => {
  const setShowSearchMock = jest.fn();

  beforeEach(() => {
    useSearch.mockReturnValue({
      setShowSearch: setShowSearchMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(<Home />);
  };

  test('renders Home component with correct content', () => {
    renderComponent();

    expect(screen.getByText('Top picks for you')).toBeInTheDocument();
    expect(screen.getByTestId('recommended-list')).toBeInTheDocument();
  });

  test('calls setShowSearch with true on mount and false on unmount', () => {
    const { unmount } = renderComponent();
    expect(setShowSearchMock).toHaveBeenCalledWith(true);
    unmount();

    expect(setShowSearchMock).toHaveBeenCalledWith(false);
  });
});
