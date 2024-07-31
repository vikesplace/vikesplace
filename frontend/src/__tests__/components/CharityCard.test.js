import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharityCard from '../../components/CharityCard';

describe('CharityCard Component', () => {
  const props = {
    name: 'Charity XYZ',
    funds: 5000,
    numListings: 10,
    endDate: '2024-12-31',
  };

  test('renders CharityCard with correct data', () => {
    render(<CharityCard {...props} />);

    expect(screen.getByText(props.name)).toBeInTheDocument();

    expect(screen.getByText(`Funds: $${props.funds}`)).toBeInTheDocument();

    expect(screen.getByText(`Listings: ${props.numListings}`)).toBeInTheDocument();

    expect(screen.getByText(`End Date: ${props.endDate}`)).toBeInTheDocument();

    expect(screen.getByTestId('charity-card')).toBeInTheDocument();
  });
});
