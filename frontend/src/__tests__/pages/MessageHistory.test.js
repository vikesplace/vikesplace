import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import MessageHistory from '../../pages/MessageHistory';
import { SAMPLE_LISTING } from '../TestData';

describe('MessageHistory page', () => {

    beforeEach(() => {
        render(
            <Router>
                <MessageHistory />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});