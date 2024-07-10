import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import Messages from '../../pages/Messages';
import { SAMPLE_CHATS } from '../../utils/SampleRecommenderData'

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

    SAMPLE_CHATS.forEach(chat => {
      expect(screen.getByText(chat.title)).toBeInTheDocument();
      expect(screen.getByText(chat.subtitle)).toBeInTheDocument();      
    });
  });

  test('navigates to correct URL on chat item click', () => {
    render(<Messages />);

    const firstChatItem = screen.getByText(SAMPLE_CHATS[0].title).closest('.rce-container-citem');
    fireEvent.click(firstChatItem);

    expect(mockNavigate).toHaveBeenCalledWith('/message-history/'+SAMPLE_CHATS[0].id);
  });
});
