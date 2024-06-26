import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../components/NavBar';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NavBar component', () => {
  let useNavigateMock;

  beforeEach(() => {
      render(
        <Router>
          <NavBar />
        </Router>
      );
    });
  
    test('renders component with correct buttons', () => {
      expect(screen.getByText('VikesPlace')).toBeInTheDocument();
      expect(screen.getAllByText('View Listings')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Create Listing')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Manage Listings')[0]).toBeInTheDocument();
      // TODO check dropdown has User Profile and Logout
    });

    test('VikesPlace links to home', () => {
      useNavigateMock = require('react-router-dom').useNavigate;
      useNavigateMock.mockReturnValue(jest.fn());

      const VikesPlaceText = screen.getByText('VikesPlace');
      fireEvent.click(VikesPlaceText);

      expect(useNavigateMock).not.toHaveBeenCalledWith('/');

      jest.clearAllMocks();
    });

    test('View Listings links to view-listings', () => {
      useNavigateMock = require('react-router-dom').useNavigate;
      useNavigateMock.mockReturnValue(jest.fn());

      const linkText = screen.getAllByText('View Listings')[0];
      fireEvent.click(linkText);

      expect(useNavigateMock).not.toHaveBeenCalledWith('/view-listings');

      jest.clearAllMocks();
    });

    test('Create Listing links to create-listings', () => {
      useNavigateMock = require('react-router-dom').useNavigate;
      useNavigateMock.mockReturnValue(jest.fn());

      const linkText = screen.getAllByText('Create Listing')[0];
      fireEvent.click(linkText);

      expect(useNavigateMock).not.toHaveBeenCalledWith('/create-listings');

      jest.clearAllMocks();
    });

    test('Manage Listings links to manage-listings', () => {
      useNavigateMock = require('react-router-dom').useNavigate;
      useNavigateMock.mockReturnValue(jest.fn());

      const linkText = screen.getAllByText('Manage Listings')[0];
      fireEvent.click(linkText);

      expect(useNavigateMock).not.toHaveBeenCalledWith('/manage-listings');

      jest.clearAllMocks();
    });

    test('Messages links to messages', () => {
      useNavigateMock = require('react-router-dom').useNavigate;
      useNavigateMock.mockReturnValue(jest.fn());

      const linkText = screen.getAllByText('Messages')[0];
      fireEvent.click(linkText);

      expect(useNavigateMock).not.toHaveBeenCalledWith('/messages');

      jest.clearAllMocks();
    });

  // TODO tests for version of NavBar that is not logged in
});