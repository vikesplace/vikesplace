import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import VerifiedAccount from '../../pages/VerifiedAccount';

describe('VerifiedAccount page', () => {

    beforeEach(() => {
        render(
            <Router>
                <VerifiedAccount />
            </Router>
        );
    });
    
    test('renders page', () => {
        expect(screen.getByText('Your account is now verified and ready for use.')).toBeInTheDocument();
    });

});