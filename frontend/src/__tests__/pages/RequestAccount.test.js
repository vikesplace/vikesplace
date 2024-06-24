import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestAccount from '../../pages/RequestAccount';
import { SAMPLE_LISTING } from '../TestData';

describe('RequestAccount page', () => {

    beforeEach(() => {
        render(
            <Router>
                <RequestAccount />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});