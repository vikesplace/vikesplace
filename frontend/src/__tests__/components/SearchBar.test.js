import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { SAMPLE_LISTING } from '../TestData';

describe('SearchBar component', () => {

    beforeEach(() => {
      render(
        <Router>
          <SearchBar />
        </Router>
      );
    });
    
    test('renders component', () => {
    });

});