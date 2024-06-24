import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Messages from '../../pages/Messages';
import { SAMPLE_LISTING } from '../TestData';

describe('Messages page', () => {

    beforeEach(() => {
        render(
            <Router>
                <Messages />
            </Router>
        );
    });
    
    test('renders page', () => {
    });

});