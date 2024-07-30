import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MessageHistory from '../../pages/MessageHistory';
import DataService from '../../services/DataService';
import { Store } from 'react-notifications-component';

jest.mock('../../services/DataService');
jest.mock('react-notifications-component', () => ({
  Store: {
    addNotification: jest.fn(),
  },
}));

const mockDataService = {
  getChatMessages: jest.fn(),
  getChatInformation: jest.fn(),
  sendMessage: jest.fn(),
};

DataService.mockImplementation(() => mockDataService);

describe('MessageHistory', () => {
  const renderComponent = (id) => {
    return render(
      <MemoryRouter initialEntries={[`/message-history/${id}`]}>
        <Routes>
          <Route path="/message-history/:id" element={<MessageHistory />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and displays message history', async () => {
    const chatMessages = [
      { senderId: 1, messageContent: 'Hello', timestamp: '2024-07-30T12:34:56Z' },
      { senderId: 2, messageContent: 'Hi', timestamp: '2024-07-30T12:35:56Z' },
    ];
    const chatInfo = { userId: 2, title: 'Seller', listingId: 10 };

    mockDataService.getChatMessages.mockResolvedValue({
      status: 200,
      data: { messages: chatMessages },
    });
    mockDataService.getChatInformation.mockResolvedValue({
      status: 200,
      data: chatInfo,
    });

    renderComponent(1);

    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return content.includes('Message Seller') && element.tagName.toLowerCase() === 'h1';
      })).toBeInTheDocument();
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });
  });

  test('displays a notification on failed message fetch', async () => {
    mockDataService.getChatMessages.mockResolvedValue(undefined);
    mockDataService.getChatInformation.mockResolvedValue({
      status: 200,
      data: { userId: 2, title: 'Seller', listingId: 10 },
    });

    renderComponent(1);

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        message: 'Failed to fetch messages. Please try again.',
      }));
    });
  });

  test('displays a notification on failed chat info fetch', async () => {
    mockDataService.getChatMessages.mockResolvedValue({
      status: 200,
      data: { messages: [] },
    });
    mockDataService.getChatInformation.mockResolvedValue(undefined);

    renderComponent(1);

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        message: 'Failed to fetch chat info. Please try again.',
      }));
    });
  });

  test('handles sending a new message', async () => {
    const chatMessages = [
      { senderId: 1, messageContent: 'Hello', timestamp: '2024-07-30T12:34:56Z' },
    ];
    const chatInfo = { userId: 2, title: 'Seller', listingId: 10 };

    mockDataService.getChatMessages.mockResolvedValue({
      status: 200,
      data: { messages: chatMessages },
    });
    mockDataService.getChatInformation.mockResolvedValue({
      status: 200,
      data: chatInfo,
    });
    mockDataService.sendMessage.mockResolvedValue({
      status: 200,
    });

    renderComponent(1);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Type here...');
    fireEvent.change(input, { target: { value: 'New message' } });
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockDataService.sendMessage).toHaveBeenCalledWith("1", 'New message');
    });
  });

  test('displays a notification on failed message send', async () => {
    const chatMessages = [
      { senderId: 1, messageContent: 'Hello', timestamp: '2024-07-30T12:34:56Z' },
    ];
    const chatInfo = { userId: 2, title: 'Seller', listingId: 10 };

    mockDataService.getChatMessages.mockResolvedValue({
      status: 200,
      data: { messages: chatMessages },
    });
    mockDataService.getChatInformation.mockResolvedValue({
      status: 200,
      data: chatInfo,
    });
    mockDataService.sendMessage.mockResolvedValue(undefined);

    renderComponent(1);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Type here...');
    fireEvent.change(input, { target: { value: 'New message' } });
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(Store.addNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Error',
        message: 'Failed to send message. Please try again.',
      }));
    });
  });
});
