import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import VerifiedAccount from '../../pages/VerifiedAccount';
import { SAMPLE_LISTING } from '../TestData';

describe('VerifiedAccount page', () => {

    beforeEach(() => {
        render(
            <Router>
                <VerifiedAccount />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});