import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewCharities from '../../pages/ViewCharities';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';

jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockDataService = {
  getCharities: jest.fn(),
};

DataService.mockImplementation(() => mockDataService);

describe('ViewCharities', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/view-charities']}>
        <Routes>
          <Route path="/view-charities" element={<ViewCharities />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and shows no charities message when there are no charities', async () => {
    mockDataService.getCharities.mockResolvedValue({
      status: 200,
      data: [],
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('No Charities Available')).toBeInTheDocument();
    });
  });

  test('displays a notification on connection error', async () => {
    mockDataService.getCharities.mockResolvedValue(undefined);

    renderComponent();
    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Connection Error!',
      }));
    });
  });

  test('displays charities correctly and handles pagination', async () => {
    const charities = [
      { name: 'Charity 1', numListings: 5, endDate: '2024-12-31', fund: 1000, status: 'OPEN' },
      { name: 'Charity 2', numListings: 3, endDate: '2024-11-30', fund: 500, status: 'CLOSED' },
      { name: 'Charity 3', numListings: 4, endDate: '2024-10-15', fund: 800, status: 'OPEN' },
      { name: 'Charity 4', numListings: 6, endDate: '2024-09-20', fund: 1200, status: 'CLOSED' },
      { name: 'Charity 5', numListings: 2, endDate: '2024-08-25', fund: 300, status: 'OPEN' },
      { name: 'Charity 6', numListings: 7, endDate: '2024-07-18', fund: 1500, status: 'CLOSED' },
    ];

    mockDataService.getCharities.mockResolvedValue({
      status: 200,
      data: charities,
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Charity 1')).toBeInTheDocument();
      expect(screen.getByText('Charity 3')).toBeInTheDocument();
      expect(screen.getByText('Charity 5')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('2'));  
    await waitFor(() => {
      expect(screen.getByText('Charity 6')).toBeInTheDocument();
    });
  });

  test('opens and closes charity details dialog', async () => {
    const charities = [
      { name: 'Charity 1', numListings: 5, endDate: '2024-12-31', fund: 1000, status: 'OPEN' },
    ];

    mockDataService.getCharities.mockResolvedValue({
      status: 200,
      data: charities,
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Charity 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Charity 1'));
    await waitFor(() => {
      expect(screen.getByText('View Charity')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('View Charity')).not.toBeInTheDocument();
    });
  });
});
