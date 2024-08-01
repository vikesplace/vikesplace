import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RecommendedGrid from '../../components/recommender/RecommendedGrid.js';

describe('Recommender Component', () => {
  const data = [{
    id: 123,
    title: 'Listing Name',
    status: 'AVAILABLE',
    price: 10,
    location: 'V9V9V9',
    forCharity: false
  }, 
  {
    id: 124,
    title: 'Listing Name',
    status: 'AVAILABLE',
    price: 10,
    location: 'V9V9V9',
    forCharity: false
  }];

  test('renders recommender grid with correct data', () => {
    render(
      <Router> 
        <RecommendedGrid data={data} />
      </Router>);

    const recItems = screen.getAllByTestId("rec-item");
    expect(recItems.length).toBe(data.length);
  });
});