import React from 'react';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewListings from '../pages/ViewListings';

describe('ViewListings Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ViewListings />
      </Router>
    );
  });

  test('renders SearchBar component', () => {
    expect(screen.getByLabelText('Search...')).toBeInTheDocument();
  });

  test('renders listing cards', () => {
    const listingCards = screen.getAllByText(/Test 1|Super cool object|Buy Me!|Another listings for sale/);
    expect(listingCards.length).toBe(4); // Based on initialListings length
  });

  test('opens and closes the filter dialog', async () => {
    fireEvent.click(screen.getByText('Add Filter'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('sorts listings by price', async () => {  
    fireEvent.mouseDown(screen.getByLabelText('Sort By'));
    fireEvent.click(screen.getByText('Price'));

    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      const prices = listingCards.map(card => {
        const priceElement = within(card).getByText(/\$\s?[\d,]+(\.\d{2})?/);
        return parseFloat(priceElement.textContent.replace(/[$,]/g, ''));
      });
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  });

  test('applies price range filter', async () => {
    fireEvent.click(screen.getByText('Add Filter'));
    
    fireEvent.change(screen.getByLabelText('Min Price'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Max Price'), { target: { value: '100' } });
    
    fireEvent.click(screen.getByText('OK'));
    
    await waitFor(() => {
      const listings = screen.queryAllByTestId('listing-card');
      expect(listings.length).toBe(2); 
    });
  });

  test('applies status filter', async () => {
    fireEvent.click(screen.getByText('Add Filter'));
    
    fireEvent.mouseDown(screen.getByLabelText('Status'));
    fireEvent.click(screen.getByText('AVAILABLE'));
    
    fireEvent.click(screen.getByText('OK'));
    
    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      const availableListings = listingCards.filter(card => {
        return within(card).queryByText('AVAILABLE');
      });
      expect(availableListings.length).toBe(2); 
    });
  });
});
