import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchHistory from '../../pages/SearchHistory';
import { SAMPLE_LISTING } from '../TestData';

describe('SearchHistory page', () => {

    beforeEach(() => {
        render(
            <Router>
                <SearchHistory />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});