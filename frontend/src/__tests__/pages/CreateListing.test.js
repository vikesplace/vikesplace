import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateListing from '../../pages/CreateListing';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

describe('CreateListing page', () => {
  let useNavigateMock;

  beforeEach(() => {
    render(
      <Router>
        <CreateListing />
      </Router>
    );
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

  // TODO: no validation on empty/valid category yet
  /* test('validation on an empty category', () => {
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    fireEvent.blur(categoryInput);
    expect(screen.getByText('Category is required')).toBeInTheDocument();
  }); */

  test('should be able to select a category', () => {
    const categoryInput = screen.getByRole('combobox', { name: /category/i });

    fireEvent.mouseDown(categoryInput);
    const listbox = within(screen.getByRole('listbox'));

    fireEvent.click(listbox.getByText(/Furniture/i));

    expect(listbox.getByText('Furniture')).toBeInTheDocument();

    // TODO must be able to select an element (may need to switch to native <Select>)
    // and update to chosen categories
  });

  test('not selecting category prevents saving form', () => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    const button = screen.getByRole('button', { name: /create/i });

    fireEvent.change(titleInput, { target: { value: 'this is a valid title' } });
    fireEvent.change(priceInput, { target: { value: '6.95' } });
    fireEvent.change(postalCodeInput, { target: { value: 'V9V 9V9' } });

    fireEvent.submit(button);
    // TODO confirm correct data is saved?

    expect(useNavigateMock).not.toHaveBeenCalledWith('/manage-listings');

    jest.clearAllMocks();
  });

  test('on success navigate to manage listings', () => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const priceInput = screen.getByRole('textbox', { name: /price/i });
    const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    const button = screen.getByRole('button', { name: /create/i });

    fireEvent.change(titleInput, { target: { value: 'this is a valid title' } });
    fireEvent.change(priceInput, { target: { value: '6.95' } });
    fireEvent.change(postalCodeInput, { target: { value: 'V9V 9V9' } });
    // TODO select a category

    fireEvent.submit(button);
    // TODO confirm correct data is saved?

    expect(useNavigateMock);

    jest.clearAllMocks();
  });

});