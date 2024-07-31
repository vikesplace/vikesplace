import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RecommendedItem from '../../components/recommender/RecommendedItem.js';

describe('Recommender Component', () => {
  const props = {
    id: 123,
    title: 'Listing Name',
    status: 'AVAILABLE',
    price: 10,
    location: 'V9V9V9',
    forCharity: false
  };

  test('renders recommender item with correct data', () => {
    render(
      <Router> 
        <RecommendedItem props={props} />
      </Router>);

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.status)).toBeInTheDocument();

    expect(screen.getByText(`$${props.price}`)).toBeInTheDocument();
  });
});