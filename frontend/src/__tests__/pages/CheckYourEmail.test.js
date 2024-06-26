import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CheckYourEmail from '../../pages/CheckYourEmail';

describe('CheckYourEmail page', () => {

    beforeEach(() => {
      render(
        <Router>
          <CheckYourEmail />
        </Router>
      );
    });
    
    test('renders page', () => {
      expect(screen.getByText('Thank you for your request!')).toBeInTheDocument();
    });

});