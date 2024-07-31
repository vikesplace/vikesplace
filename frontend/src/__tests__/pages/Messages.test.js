import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Messages from '../../pages/Messages';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';

jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockDataService = {
  getChats: jest.fn(),
  getMyUserData: jest.fn(),
  getChatInformation: jest.fn(),
  getUserData: jest.fn(),
  getListing: jest.fn(),
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

describe('Messages', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/messages']}>
        <Routes>
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and shows no chats message when there are no chats', async () => {
    mockDataService.getChats.mockResolvedValue({
      status: 200,
      data: { chats: [] },
    });
    mockDataService.getMyUserData.mockResolvedValue({
      status: 200,
      data: { userId: 1 },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('No Chats Available')).toBeInTheDocument();
    });
  });

  test('displays a notification on connection error', async () => {
    mockDataService.getChats.mockResolvedValue(undefined);

    renderComponent();
    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        message: "Cannot read properties of undefined (reading 'status')",
      }));
    });
  });

  test('displays chats correctly', async () => {
    const chatIds = [1, 2];
    const user = { userId: 1 };
    const chatInfo1 = { users: [1, 2], listingId: 10, lastMessageTime: '2024-07-30T12:34:56Z' };
    const chatInfo2 = { users: [1, 3], listingId: 11, lastMessageTime: '2024-07-30T12:34:56Z' };
    const otherUser1 = { username: 'User 2' };
    const otherUser2 = { username: 'User 3' };
    const listing1 = { title: 'Listing 1' };
    const listing2 = { title: 'Listing 2' };

    mockDataService.getChats.mockResolvedValue({
      status: 200,
      data: { chats: chatIds },
    });
    mockDataService.getMyUserData.mockResolvedValue({
      status: 200,
      data: user,
    });
    mockDataService.getChatInformation
      .mockResolvedValueOnce({ status: 200, data: chatInfo1 })
      .mockResolvedValueOnce({ status: 200, data: chatInfo2 });
    mockDataService.getUserData
      .mockResolvedValueOnce({ status: 200, data: otherUser1 })
      .mockResolvedValueOnce({ status: 200, data: otherUser2 });
    mockDataService.getListing
      .mockResolvedValueOnce({ status: 200, data: listing1 })
      .mockResolvedValueOnce({ status: 200, data: listing2 });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('User 2')).toBeInTheDocument();
      expect(screen.getByText('User 3')).toBeInTheDocument();
      expect(screen.getByText('Listing 1')).toBeInTheDocument();
      expect(screen.getByText('Listing 2')).toBeInTheDocument();
    });
  });

  test('handles chat click and navigates to message history', async () => {
    const chatIds = [1];
    const user = { userId: 1 };
    const chatInfo = { users: [1, 2], listingId: 10, lastMessageTime: '2024-07-30T12:34:56Z' };
    const otherUser = { username: 'User 2' };
    const listing = { title: 'Listing 1' };

    mockDataService.getChats.mockResolvedValue({
      status: 200,
      data: { chats: chatIds },
    });
    mockDataService.getMyUserData.mockResolvedValue({
      status: 200,
      data: user,
    });
    mockDataService.getChatInformation.mockResolvedValue({
      status: 200,
      data: chatInfo,
    });
    mockDataService.getUserData.mockResolvedValue({
      status: 200,
      data: otherUser,
    });
    mockDataService.getListing.mockResolvedValue({
      status: 200,
      data: listing,
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('User 2')).toBeInTheDocument();
      expect(screen.getByText('Listing 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('User 2'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/message-history/1');
    });
  });
});
