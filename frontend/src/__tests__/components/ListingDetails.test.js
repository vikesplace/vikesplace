import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ListingDetails from '../../components/ListingDetails';
import { SAMPLE_LISTING } from '../TestData';

describe('ListingDetails component', () => {

    beforeEach(() => {
      render(
        <Router>
          <ListingDetails listing={SAMPLE_LISTING}/>
        </Router>
      );
    });
    
    test('renders component', () => {
    });

});