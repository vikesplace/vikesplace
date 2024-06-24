import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { SAMPLE_LISTING } from '../TestData';

describe('NavBar component', () => {

    beforeEach(() => {
        render(
          <Router>
            <NavBar />
          </Router>
        );
      });
    
      test('renders component', () => {
      });

});