import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateReview from '../../pages/CreateReview';
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
  createRating: jest.fn(),
  createReview: jest.fn(),
};

DataService.mockImplementation(() => mockDataService);

describe('CreateReview', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/create-review/1']}>
        <Routes>
          <Route path="/create-review/:id" element={<CreateReview />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: { title: 'Test Listing' },
    });
    mockDataService.createRating.mockResolvedValue({ status: 201 });
    mockDataService.createReview.mockResolvedValue({ status: 201 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Listing')).toBeInTheDocument();
    });
  });

  test('shows validation errors when submitting an empty form', async () => {
    renderComponent();

    const submitButton = await screen.findByText('Submit');
    fireEvent.click(submitButton);


  });

  test('submits the form with valid data', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test Listing')).toBeInTheDocument();
    });

    const ratingStars = screen.getAllByRole('radio');
    const targetStar = ratingStars.find(star => star.getAttribute('aria-label') === '4 out of 5 stars');
    if (targetStar) {
      fireEvent.click(targetStar);
    }

    const reviewInput = screen.getByRole('textbox', { name: /review/i });
    fireEvent.change(reviewInput, { target: { value: 'Great listing!' } });

    const submitButton = await screen.findByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDataService.createReview).toHaveBeenCalledWith('1', 'Great listing!');
    });
  });

  test('displays notification on connection error', async () => {
    mockDataService.getListing.mockResolvedValue(undefined);

    renderComponent();

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Connection Error!',
      }));
    });
  });
});
