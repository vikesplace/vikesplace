import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';

describe('PageNotFound component', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
  };

  test('renders the PageNotFound component with appropriate text', () => {
    renderComponent();

    expect(screen.getByText('Sorry, this page does not exist.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  });

  test('renders the Home button with correct link', () => {
    renderComponent();

    const linkElement = screen.getByRole('link', { name: /home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/home');
  });
});
