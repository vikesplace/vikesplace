import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../pages/Home';
import { SAMPLE_LISTING } from '../TestData';

describe('Home page', () => {

    beforeEach(() => {
        render(
            <Router>
                <Home />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});