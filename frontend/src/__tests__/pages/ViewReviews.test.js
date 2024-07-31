import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewReviewsPage from '../../pages/ViewReviewsPage';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';

jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockDataService = {
  getListing: jest.fn(),
  getRatings: jest.fn(),
  getReviews: jest.fn(),
};

DataService.mockImplementation(() => mockDataService);

describe('ViewReviewsPage', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/view-reviews/1']}>
        <Routes>
          <Route path="/view-reviews/:id" element={<ViewReviewsPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and displays listing details', async () => {
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: { title: 'Test Listing' },
    });
    mockDataService.getRatings.mockResolvedValue({
      status: 200,
      data: { ratings: [] },
    });
    mockDataService.getReviews.mockResolvedValue({
      status: 200,
      data: { reviews: [] },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Listing')).toBeInTheDocument();
    });
  });

  test('shows a message when no listing is found', async () => {
    mockDataService.getListing.mockResolvedValue(undefined);

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('No Listing Available')).toBeInTheDocument();
    });
  });

  test('shows validation errors when unable to fetch ratings or reviews', async () => {
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: { title: 'Test Listing' },
    });
    mockDataService.getRatings.mockResolvedValue({
      status: 500,
    });
    mockDataService.getReviews.mockResolvedValue({
      status: 500,
    });

    renderComponent();
    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Unable to Get Ratings',
      }));
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Unable to Get Reviews',
      }));
    });
  });

  test('displays reviews and ratings correctly', async () => {
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: { title: 'Test Listing' },
    });
    mockDataService.getRatings.mockResolvedValue({
      status: 200,
      data: { ratings: [{ rating: 5 }] },
    });
    mockDataService.getReviews.mockResolvedValue({
      status: 200,
      data: { reviews: [{ review: 'Great listing!' }] },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Great listing!')).toBeInTheDocument();
    });
  });

  test('displays notification on connection error', async () => {
    mockDataService.getListing.mockResolvedValue(undefined);
    mockDataService.getRatings.mockResolvedValue(undefined);
    mockDataService.getReviews.mockResolvedValue(undefined);

    renderComponent();
    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Connection Error!',
      }));
    });
  });

  test('shows message when no reviews or ratings are available', async () => {
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: { title: 'Test Listing' },
    });
    mockDataService.getRatings.mockResolvedValue({
      status: 200,
      data: { ratings: [] },
    });
    mockDataService.getReviews.mockResolvedValue({
      status: 200,
      data: { reviews: [] },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('No Reviews or Ratings Available')).toBeInTheDocument();
    });
  });
});
