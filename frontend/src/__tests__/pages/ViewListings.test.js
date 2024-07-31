import React from 'react';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewListings from '../../pages/ViewListings';
import { useSearch } from '../../components/searchbar/searchContext'; // Adjust the import path based on your project structure
import DataService from '../../services/DataService'; // Adjust the import path based on your project structure
import { Store } from 'react-notifications-component';

jest.mock('../../components/searchbar/searchContext');
jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const SAMPLE_DATA = [
  { listingId: 1, title: "Item 1", price: "5", location: "Location 1", status: "AVAILABLE", forCharity: false, category: 'Electronics' },
  { listingId: 2, title: "Item 2", price: "15", location: "Location 2", status: "SOLD", forCharity: false, category: 'Furniture' },
  { listingId: 3, title: "Item 3", price: "8", location: "Location 3", status: "AVAILABLE", forCharity: true, category: 'Sports' },
  { listingId: 4, title: "Item 4", price: "100", location: "Location 4", status: "AVAILABLE", forCharity: false, category: 'Clothing' },
  { listingId: 5, title: "Item 5", price: "200", location: "Location 5", status: "SOLD", forCharity: false, category: 'Books' },
];

describe('ViewListings Component', () => {
  beforeEach(() => {
    useSearch.mockReturnValue({
      setShowSearch: jest.fn(),
      searchQuery: ''
    });

    DataService.mockImplementation(() => ({
      getSortedListings: jest.fn().mockResolvedValue({ status: 200, data: SAMPLE_DATA }),
      getMyUserData: jest.fn().mockResolvedValue({ status: 200, data: { location: 'Test Location' } }),
      updateUserData: jest.fn().mockResolvedValue({ status: 200 }),
      search: jest.fn().mockResolvedValue({ status: 200, data: SAMPLE_DATA }),
    }));

    render(
      <Router>
        <ViewListings />
      </Router>
    );
  });

  test('renders listing cards', async () => {
    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      expect(listingCards.length).toBe(SAMPLE_DATA.length);
    });
  });

  test('opens and closes the filter dialog', async () => {
    fireEvent.click(screen.getByText('Add Filter'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('applies price range filter', async () => {
    fireEvent.click(screen.getByText('Add Filter'));

    fireEvent.change(screen.getByLabelText('Min Price'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Max Price'), { target: { value: '100' } });

    const applyButton = await screen.findByRole('button', { name: /Apply/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      const listings = screen.queryAllByTestId('listing-card');
      const numFilteredListings = SAMPLE_DATA.filter(listing => {
        return (parseFloat(listing.price) >= 3) && (parseFloat(listing.price) <= 100);
      }).length;
      expect(listings.length).toBe(numFilteredListings+1);
    });
  });

  test('applies status filter', async () => {
    fireEvent.click(screen.getByText('Add Filter'));

    fireEvent.mouseDown(screen.getByLabelText('Status'));
    fireEvent.click(screen.getByRole('option', { name: /Available/i }));

    const applyButton = await screen.findByRole('button', { name: /Apply/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      const availableListings = listingCards.filter(card => {
        return within(card).queryByText(/Available/i);
      });
      const numFilteredListings = SAMPLE_DATA.filter(listing => {
        return listing.status === "AVAILABLE";
      }).length;
      expect(availableListings.length).toBe(numFilteredListings);
    });
  });



  test('changes location', async () => {
    fireEvent.click(screen.getByText('Change Location'));

    fireEvent.change(screen.getByLabelText('Postal Code'), { target: { value: 'V8V1E7' } });

    const applyButton = await screen.findByRole('button', { name: /Apply/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText('V8V1E7')).toBeInTheDocument();
    });
  });
});
