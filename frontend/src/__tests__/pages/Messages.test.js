import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import Messages from '../../pages/Messages';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Messages Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders without crashing', () => {
    render(<Messages />);
  });

  test('displays the correct chat information', () => {
    render(<Messages />);

    expect(screen.getByText("Person's Name")).toBeInTheDocument();
    expect(screen.getByText('Title of this item I would like to buy')).toBeInTheDocument();
    expect(screen.getByText('Person Number Two')).toBeInTheDocument();
    expect(screen.getByText('Super cool item')).toBeInTheDocument();
    expect(screen.getByText('Person Three')).toBeInTheDocument();
    expect(screen.getByText('Here is another item available for purchase')).toBeInTheDocument();
  });

  test('navigates to correct URL on chat item click', () => {
    render(<Messages />);

    const firstChatItem = screen.getByText("Person's Name").closest('.rce-container-citem');
    fireEvent.click(firstChatItem);

    expect(mockNavigate).toHaveBeenCalledWith('/message-history/3');
  });
});
