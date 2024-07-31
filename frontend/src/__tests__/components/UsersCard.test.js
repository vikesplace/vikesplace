import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import UserCard from '../../components/UsersCard';

describe('UserCard Component', () => {
  const props = {
    id: 1,
    username: 'TestUser',
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <UserCard {...props} />
      </MemoryRouter>
    );
  };

  test('renders UserCard with correct username', () => {
    renderComponent();


    expect(screen.getByText(props.username)).toBeInTheDocument();
  });

  test('has correct link to user profile', () => {
    renderComponent();


    expect(screen.getByRole('link')).toHaveAttribute('href', `/sellers/${props.id}`);
  });
});
