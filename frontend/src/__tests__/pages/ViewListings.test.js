import React from 'react';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewListings from '../../pages/ViewListings';
import { SAMPLE_LISTING_LIST } from '../../testSetup/TestData';
import mockAxios from 'jest-mock-axios';

const API_URL = "http://localhost:8080/";

describe('ViewListings Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ViewListings />
      </Router>
    );
  });

  afterEach(() => {
    mockAxios.reset();
  })

  test('renders SearchBar component', () => {
    expect(screen.getByLabelText('Search...')).toBeInTheDocument();
  });

  test('renders listing cards', () => {
    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200, data: SAMPLE_LISTING_LIST };
    mockAxios.mockResponse(responseObj);

    waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      expect(listingCards.length).toBe(SAMPLE_LISTING_LIST.length); 
    })
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
      const numFilteredListings = SAMPLE_LISTING_LIST.filter(listing => {
        return (parseFloat(listing.price) >= parseFloat('3')) &&
                            (parseFloat(listing.price) <= parseFloat('100'));
      }).length;
      expect(listings.length).toBe(numFilteredListings); 
    });
  });

  test('applies status filter', async () => {
    const filterValue = 'AVAILABLE';
    fireEvent.click(screen.getByText('Add Filter')); // Open filter dialog
    
    const statusDropdown = screen.getByLabelText('Status'); // Assuming 'Status' is the label for the dropdown
  
    fireEvent.mouseDown(statusDropdown); // Open status dropdown
  
    // Find option by text directly if role option is not accessible
    const availableOption = screen.getByText('Available', { selector: 'li' }); // Adjust selector as per your dropdown structure
    
    fireEvent.click(availableOption); // Select 'AVAILABLE' status
    
    fireEvent.click(screen.getByText('OK')); // Apply filter
    
    await waitFor(() => {
      const listingCards = screen.getAllByTestId('listing-card');
      const availableListings = listingCards.filter(card => {
        return within(card).queryByText(filterValue);
      });
      const numFilteredListings = SAMPLE_LISTINGS.filter(listing => {
        return listing.status === filterValue;
      }).length;
      expect(availableListings.length).toBe(numFilteredListings); // Adjust based on your expected results
    });
  });
  
  

  test('filters listings by category', async () => {
    const filterValue = 'Sports';
    fireEvent.click(screen.getByText('Add Filter')); // Open filter dialog
  
    fireEvent.mouseDown(screen.getByLabelText('Category')); // Open category dropdown
  
    // Select the option by its unique key
    fireEvent.click(screen.getByRole('option', { name: filterValue })); // Select 'Sports' category
  
    fireEvent.click(screen.getByText('OK')); // Apply filter
  
    await waitFor(() => {
      const filteredListings = screen.queryAllByTestId('listing-card');
      const numFilteredListings = SAMPLE_LISTING_LIST.filter(listing => {
        return listing.category === filterValue;
      }).length;
      expect(filteredListings.length).toBe(numFilteredListings); // Adjust the expected count based on filtered results
    });
  });
});
