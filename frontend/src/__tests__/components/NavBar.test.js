import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import AuthService from '../../services/AuthService';
import { Store } from 'react-notifications-component';

// Mock Store for notifications
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));


let mockUseLocationValue = {
  pathname: "/home",
  search: '',
  hash: '',
  state: null
}

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));

// Mock AuthService
jest.mock('../../services/AuthService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      logout: jest.fn()
    };
  });
});

describe('NavBar component', () => {
  let useNavigateMock;
  let authServiceMock;

  beforeEach(() => {  
    render(
      <Router>
        <NavBar />
      </Router>
    );

    useNavigateMock = require('react-router-dom').useNavigate;
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(useNavigateMock);

    authServiceMock = new AuthService();
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  test('renders component with correct buttons', async () => {
    expect(screen.getAllByText('VikesPlace')[0]).toBeInTheDocument();
    expect(screen.getAllByText('View Listings')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Create Listing')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Manage Listings')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Messages')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Charity Events')[0]).toBeInTheDocument();

    const accountDropdown = screen.getByTestId("account-dropdown");
    fireEvent.mouseDown(accountDropdown);

    waitFor(() => {
      expect(screen.getAllByText('User Profile')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Logout')[0]).toBeInTheDocument();
    })
  });

  test('VikesPlace links to home', () => {
    const VikesPlaceText = screen.getByText('VikesPlace');
    fireEvent.click(VikesPlaceText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/');
  });

  test('View Listings links to view-listings', () => {
    const linkText = screen.getAllByText('View Listings')[0];
    fireEvent.click(linkText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/view-listings');
  });

  test('Create Listing links to create-listings', () => {
    const linkText = screen.getAllByText('Create Listing')[0];
    fireEvent.click(linkText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/create-listings');
  });

  test('Manage Listings links to manage-listings', () => {
    const linkText = screen.getAllByText('Manage Listings')[0];
    fireEvent.click(linkText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/manage-listings');
  });

  test('Messages links to messages', () => {
    const linkText = screen.getAllByText('Messages')[0];
    fireEvent.click(linkText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/messages');
  });

  test('Charity Events links to charities', () => {
    const linkText = screen.getAllByText('Charity Events')[0];
    fireEvent.click(linkText);

    expect(useNavigateMock).not.toHaveBeenCalledWith('/view-charities');
  });

  test('logout', async () => {
    authServiceMock.logout.mockResolvedValueOnce({
      status: 200,
    });

    const accountDropdown = screen.getByTestId("account-dropdown");
    fireEvent.mouseDown(accountDropdown);

    waitFor(() => {
      expect(screen.getAllByText('Logout')[0]).toBeInTheDocument();
    })

    fireEvent.mouseDown(screen.getByTestId("logout"));

    expect(useNavigateMock).toHaveBeenCalled();
  });

  test('logout fails', async () => {
    authServiceMock.logout.mockResolvedValueOnce({
      status: 500,
    });

    const accountDropdown = screen.getByTestId("account-dropdown");
    fireEvent.mouseDown(accountDropdown);

    waitFor(() => {
      expect(screen.getAllByText('Logout')[0]).toBeInTheDocument();
    })

    fireEvent.click(screen.getByTestId("logout"));

    expect(useNavigateMock).not.toHaveBeenCalledWith('/login');

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Logout Failed',
          message: 'Please try again',
        })
      );
    });
  });

  test('view user profile', async () => {
    const accountDropdown = screen.getByTestId("account-dropdown");
    fireEvent.mouseDown(accountDropdown);

    waitFor(() => {
      expect(screen.getAllByText('User Profile')[0]).toBeInTheDocument();
    })

    fireEvent.click(screen.getByTestId("user-profile"));

    expect(useNavigateMock).toHaveBeenCalled();
  });
});