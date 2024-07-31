import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CharityCard from '../../components/CharityCard';
import { SAMPLE_CHARITY } from '../../testSetup/TestData';


describe('CharityCard component', () => {
  beforeEach(() => {
    render(
      <Router>
        <CharityCard name={SAMPLE_CHARITY.name} funds={SAMPLE_CHARITY.funds} numListing={SAMPLE_CHARITY.numListings} endDate={SAMPLE_CHARITY.endDate} />
      </Router>
    );
  });
  
  test('data loads', () => {
    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });
})