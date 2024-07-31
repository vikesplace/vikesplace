import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ManageListing from '../../components/ManageListing';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';
import { SAMPLE_LISTING } from '../../testSetup/TestData';

jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockDataService = {
  updateListing: jest.fn(),
  deleteListing: jest.fn(),
};

DataService.mockImplementation(() => mockDataService);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe('ManageListing page', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/manage-listing']}>
        <Routes>
          <Route path="/manage-listing" element={<ManageListing listing={SAMPLE_LISTING} />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders edit listing form', () => {
    renderComponent();

    expect(screen.getByText('Edit Listing')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postal code/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('validation on an empty title', () => {
    renderComponent();

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.blur(titleInput);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });

  test('pass validation on a valid title', () => {
    renderComponent();

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    fireEvent.change(titleInput, { target: { value: 'this is a valid title' } });
    fireEvent.blur(titleInput);

    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
  });

  test('validation on an empty price', () => {
    renderComponent();

    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.blur(priceInput);

    expect(screen.getByText('Expected format: $#.##')).toBeInTheDocument();
  });

  test('validation on an invalid price', () => {
    renderComponent();

    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.change(priceInput, { target: { value: 'invalid' } });
    fireEvent.blur(priceInput);

    expect(screen.getByText('Expected format: $#.##')).toBeInTheDocument();
  });

  test('pass validation on a valid price', () => {
    renderComponent();

    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.change(priceInput, { target: { value: '6.95' } });
    fireEvent.blur(priceInput);

    expect(screen.queryByText('Expected format: $#.##')).not.toBeInTheDocument();
  });

  test('validation on an empty postal code', () => {
    renderComponent();

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: '' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByText('Please enter a valid postal code with format A1A1A1')).toBeInTheDocument();
  });

  test('validation on an invalid postal code', () => {
    renderComponent();

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'invalidPostalCode' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByText('Please enter a valid postal code with format A1A1A1')).toBeInTheDocument();
  });

  test('pass validation on a valid postal code', () => {
    renderComponent();

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'V9V9V9' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.queryByText('Please enter a valid postal code with format A1A1A1')).not.toBeInTheDocument();
  });

  test('should be able to save unchanged listing', async () => {
    mockDataService.updateListing.mockResolvedValue({ status: 200 });

    renderComponent();

    const button = screen.getByRole('button', { name: /save/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith();
    });
  });

  test('should not be able to save changed listing with invalid field', async () => {
    renderComponent();

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'notvalid' } });
    fireEvent.blur(postalCodeInput);

    const button = screen.getByRole('button', { name: /save/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('should be able to save changed listing with valid fields', async () => {
    mockDataService.updateListing.mockResolvedValue({ status: 200 });

    renderComponent();

    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'V9V9V9' } });
    fireEvent.blur(postalCodeInput);

    const button = screen.getByRole('button', { name: /save/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/manage-listings');
    });
  });

  test('should be able to delete listing', async () => {
    mockDataService.deleteListing.mockResolvedValue({ status: 200 });

    renderComponent();

    const button = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/manage-listings');
    });
  });
});
