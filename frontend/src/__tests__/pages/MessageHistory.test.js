import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MessageHistory from '../../pages/MessageHistory';
import { SAMPLE_CHATS } from '../../utils/SampleRecommenderData';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/message-history/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('MessageHistory Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<MessageHistory />, { route: '/message-history/3' });
  });

  test('displays the correct chat information', () => {
    renderWithRouter(<MessageHistory />, { route: '/message-history/3' });

    expect(screen.getByText(/Message/)).toBeInTheDocument();
    expect(screen.getByText(/Person's Name/)).toBeInTheDocument();
    expect(screen.getByText(/about/)).toBeInTheDocument();
    expect(screen.getByText(/Title of this item I would like to buy/)).toBeInTheDocument();
    expect(screen.getByText(/I'm interested in buying this item.../)).toBeInTheDocument();
    expect(screen.getByText(/Could I ask for a \$5 discount\?/)).toBeInTheDocument();
    expect(screen.getByText(/How long have you had this item\?/)).toBeInTheDocument();
    expect(screen.getByText(/I've had it for 2 years, and it has been very useful to me. I'm glad you're interested in it.../)).toBeInTheDocument();
    expect(screen.getByText(/I can give you \$2 off if that works\?/)).toBeInTheDocument();
    expect(screen.getByText(/Yes that works. Are you comfortable meeting at the library\?/)).toBeInTheDocument();
    expect(screen.getByText(/Yes! That works for me/)).toBeInTheDocument();
  });

  test('sends a new message when clicking the send button', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<MessageHistory />, { route: '/message-history/3' });

    const inputElement = screen.getByPlaceholderText('Type here...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(inputElement, { target: { value: 'New message' } });
    fireEvent.click(sendButton);

    expect(window.alert).toHaveBeenCalledWith('Sending... New message');
  });
});
