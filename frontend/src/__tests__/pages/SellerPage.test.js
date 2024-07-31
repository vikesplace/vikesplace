import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import SellerPage from '../../pages/SellerPage';
import DataService from '../../services/DataService';

// Mock the DataService
jest.mock('../../services/DataService');

describe('SellerPage', () => {
  const mockNotification = {
    addNotification: jest.fn()
  };
  Store.addNotification = mockNotification.addNotification;

  const renderComponent = (id) => {
    window.history.pushState({}, 'Test page', `/seller/${id}`);
    return render(
      <Router>
        <SellerPage />
      </Router>
    );
  };

  it('renders loading state', () => {
    renderComponent('123');
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    DataService.mockImplementation(() => ({
      getUserData: jest.fn().mockRejectedValue(new Error('Failed to fetch seller'))
    }));

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText(/Seller Information Not Available/i)).toBeInTheDocument();
    });

    expect(mockNotification.addNotification).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Failed to fetch seller',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  });

  it('displays seller information when fetch is successful', async () => {
    const sellerData = {
      username: 'testuser',
      location: 'Test Location',
      joiningDate: '2021-01-01T00:00:00Z',
      itemsSold: 10,
      itemsPurchased: 5
    };

    DataService.mockImplementation(() => ({
      getUserData: jest.fn().mockResolvedValue({
        status: 200,
        data: sellerData
      })
    }));

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText(/Seller: testuser/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Location: Test Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Items Sold: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Items Purchased: 5/i)).toBeInTheDocument();
  });

  it('displays no seller information message when seller is null', async () => {
    DataService.mockImplementation(() => ({
      getUserData: jest.fn().mockResolvedValue({
        status: 200,
        data: null
      })
    }));

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText(/No Seller Information Available/i)).toBeInTheDocument();
    });
  });
});
