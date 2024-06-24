import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import VerifyAccount from '../../pages/VerifyAccount';
import { SAMPLE_LISTING } from '../TestData';

describe('VerifyAccount page', () => {

    beforeEach(() => {
        render(
            <Router>
                <VerifyAccount />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});