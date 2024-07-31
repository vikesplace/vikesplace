import React from 'react';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateListing from '../../pages/CreateListing';
import mockAxios from 'jest-mock-axios';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CreateListing page', () => {
  const useNavigateMock = jest.fn();

  beforeEach(() => {
    const { useNavigate } = require('react-router-dom');
    useNavigate.mockImplementation(() => useNavigateMock);

    render(
      <Router>
        <CreateListing />
      </Router>
    );
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('renders create listing form', () => {
    expect(screen.getByText('Create a Listing')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postal code/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  test('validation on an empty title', () => {
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    fireEvent.blur(titleInput);
    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });

  test('pass validation on a valid title', () => {
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    fireEvent.change(titleInput, { target: { value: 'this is a valid title' } });
    fireEvent.blur(titleInput);
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
  });

  test('validation on an empty price', () => {
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.blur(priceInput);
    expect(screen.getByText('Expected format: $#.##')).toBeInTheDocument();
  });

  test('validation on an invalid price', () => {
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.change(priceInput, { target: { value: 'invalid' } });
    fireEvent.blur(priceInput);
    expect(screen.getByText('Expected format: $#.##')).toBeInTheDocument();
  });

  test('pass validation on a valid price', () => {
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    fireEvent.change(priceInput, { target: { value: '6.95' } });
    fireEvent.blur(priceInput);
    expect(screen.queryByText('Expected format: $#.##')).not.toBeInTheDocument();
  });

  test('validation on an empty postal code', () => {
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.blur(postalCodeInput);
    expect(screen.getByText('Please enter a valid postal code with format A1A1A1')).toBeInTheDocument();
  });

  test('validation on an invalid postal code', () => {
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'invalidPostalCode' } });
    fireEvent.blur(postalCodeInput);
    expect(screen.getByText('Please enter a valid postal code with format A1A1A1')).toBeInTheDocument();
  });

  test('pass validation on a valid postal code', () => {
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    fireEvent.change(postalCodeInput, { target: { value: 'V9V9V9' } });
    fireEvent.blur(postalCodeInput);
    expect(screen.queryByText('Please enter a valid postal code with format A1A1A1')).not.toBeInTheDocument();
  });

  test('validation on an empty category', () => {
    const button = screen.getByRole('button', { name: /create/i });
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    fireEvent.blur(categoryInput);
    fireEvent.submit(button);
    expect(useNavigateMock).not.toHaveBeenCalledWith('/manage-listings');
  });

  test('should be able to select a category', () => {
    const categoryInput = screen.getByRole('combobox', { name: /category/i });

    fireEvent.mouseDown(categoryInput);
    const listbox = within(screen.getByRole('listbox'));

    fireEvent.click(listbox.getByText(/Furniture/i));

    expect(listbox.getByText('Furniture')).toBeInTheDocument();
  });

  test('on success navigate to manage listings', async () => {
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    const button = screen.getByRole('button', { name: /create/i });

    const title = 'this is a valid title';
    const price = '6.95';
    const location = 'V9V9V9';
    const category = 'ELECTRONICS';
    const forCharity = false;
    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(priceInput, { target: { value: price.toString() } });
    fireEvent.change(postalCodeInput, { target: { value: location } });

    // Simulate selecting a category
    fireEvent.mouseDown(categoryInput);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/ELECTRONICS/i));

    fireEvent.submit(button);

    const status = 'AVAILABLE';
    const withCredentials = true;
    expect(mockAxios.post).toHaveBeenCalledWith(
      process.env.REACT_APP_BACK_API + 'listings',
      { title, status, location, price, category, forCharity },
      { withCredentials }
    );

    // Simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/manage-listings');
    });
  });
});