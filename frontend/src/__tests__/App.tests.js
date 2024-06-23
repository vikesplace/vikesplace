import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ViewListings from './pages/ViewListings';
import CreateListing from './pages/CreateListing';
import ManageListings from './pages/ManageListings';
import Messages from './pages/Messages';
import VerifyAccount from './pages/VerifyAccount';
import VerifiedAccount from './pages/VerifiedAccount';
import SearchHistory from './pages/SearchHistory';
import ListingDetailsPage from './pages/ListingDetailsPage';
import EditListing from './pages/EditListing';
import Login from './pages/Login';
import RequestAccount from './pages/RequestAccount';
import CheckYourEmail from './pages/CheckYourEmail';
import MessageHistory from './pages/MessageHistory';

describe('App Component', () => {
  test('renders NavBar component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('navigates to Home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('navigates to ViewListings page', () => {
    render(
      <MemoryRouter initialEntries={['/view-listings']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/View Listings/i)).toBeInTheDocument();
  });

  test('navigates to CreateListing page', () => {
    render(
      <MemoryRouter initialEntries={['/create-listing']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create Listing/i)).toBeInTheDocument();
  });

  test('navigates to ManageListings page', () => {
    render(
      <MemoryRouter initialEntries={['/manage-listings']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Manage Listings/i)).toBeInTheDocument();
  });

  test('navigates to Messages page', () => {
    render(
      <MemoryRouter initialEntries={['/messages']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
  });

  test('navigates to Login page', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('navigates to VerifyAccount page', () => {
    render(
      <MemoryRouter initialEntries={['/verify']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Verify Account/i)).toBeInTheDocument();
  });

  test('navigates to VerifiedAccount page', () => {
    render(
      <MemoryRouter initialEntries={['/verified']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Verified Account/i)).toBeInTheDocument();
  });

  test('navigates to SearchHistory page', () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Search History/i)).toBeInTheDocument();
  });

  test('navigates to RequestAccount page', () => {
    render(
      <MemoryRouter initialEntries={['/request-account']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Request Account/i)).toBeInTheDocument();
  });

  test('navigates to CheckYourEmail page', () => {
    render(
      <MemoryRouter initialEntries={['/check-email']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();
  });

  test('navigates to ListingDetailsPage', () => {
    render(
      <MemoryRouter initialEntries={['/listings/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Listing Details/i)).toBeInTheDocument();
  });

  test('navigates to EditListing page', () => {
    render(
      <MemoryRouter initialEntries={['/edit-listing/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Edit Listing/i)).toBeInTheDocument();
  });

  test('navigates to MessageHistory page', () => {
    render(
      <MemoryRouter initialEntries={['/message-history/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Message History/i)).toBeInTheDocument();
  });
});
