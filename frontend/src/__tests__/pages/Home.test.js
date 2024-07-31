import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home.js';
import { SAMPLE_DATA as data } from '../../utils/SampleRecommenderData.js';
import SearchBar from '../../components/searchbar/SearchBar.js';
import RecommendedList from '../../components/recommender/RecommendedList.js';

// Mock the imported components
jest.mock('../../components/SearchBar.js', () => () => <div data-testid="searchbar" />);
jest.mock('../../components/recommender/RecommendedList', () => ({ data }) => (
    <div data-testid="recommendedlist">
      {data.map((item) => (
        <div key={item.id} data-testid={`recommendeditem-${item.id}`}>
          {/* Simulate RecommendedItem content */}
          <span>{item.title}</span>
          <span>{item.price}</span>
          <span>{item.status}</span>
          <span>{item.location}</span>
        </div>
      ))}
    </div>
  ));

describe('Home Component', () => {
  test('renders the Home component on the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Top picks for you')).toBeInTheDocument();
  });

  test('renders the SearchBar component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();
  });

  test('renders the RecommendedItem components with the correct data', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Check each item in SAMPLE_DATA to be present as RecommendedItem
    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(`Price: ${item.price}`)).toBeInTheDocument();
      expect(screen.getByText(`Status: ${item.status}`)).toBeInTheDocument();
      expect(screen.getByText(`Location: ${item.location}`)).toBeInTheDocument();
    });
  });
});
