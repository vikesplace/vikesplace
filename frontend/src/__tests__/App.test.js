import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App.js';

describe('App page', () => {
    
    test('renders without crashing', () => {
        const div = document.createElement('div');
        render(<App />, div);
    });

});