import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingCard from '../../components/ListingCard';
import { SAMPLE_LISTING } from '../TestData';

describe('ListingCard component', () => {

    beforeEach(() => {
      render(
        <Router>
          <ListingCard id={SAMPLE_LISTING.id} title={SAMPLE_LISTING.id} price={SAMPLE_LISTING.price} location={SAMPLE_LISTING.location} status={SAMPLE_LISTING.status}/>
        </Router>
      );
    });
  
    test('renders component', () => {
    });

});