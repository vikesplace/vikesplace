import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CheckYourEmail from '../../pages/CheckYourEmail';
import { SAMPLE_LISTING } from '../TestData';

describe('CheckYourEmail page', () => {

    beforeEach(() => {
      render(
        <Router>
          <CheckYourEmail />
        </Router>
      );
    });
    
    test('renders page', () => {
    });

});