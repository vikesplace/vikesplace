import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import VerifyAccount from '../../pages/VerifyAccount';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('VerifyAccount page', () => {
    let useNavigateMock; 

    beforeEach(() => {
        render(
            <Router>
                <VerifyAccount />
            </Router>
        );
    });
    
    test('renders page', () => {
        expect(screen.getByText('Finish Creating Account')).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
        expect(screen.getAllByText(/password/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/confirm password/i)[0]).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: /postal code/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test('validation on an empty username', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: '' } });
        fireEvent.blur(usernameInput);
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).not.toBeInTheDocument();
    });

    test('validation on a invalid username too short', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'test1' } });
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).toBeInTheDocument();
    });

    test('validation on a invalid username has spaces', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'not valid' } });
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).toBeInTheDocument();
    });

    test('validation on a invalid username invalid symbols', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'test^username&' } });
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).toBeInTheDocument();
    });

    test('validation on a invalid username too long', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'this_is_really_long20' } });
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).toBeInTheDocument();
    });
    
    test('pass validation on a valid username', () => {
        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'valid1_Username@' } });
        fireEvent.blur(usernameInput);
        expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Must be 6-20 characters (allow: letters, numbers, _, @)')).not.toBeInTheDocument();
    });

    test('validation on an empty password', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('validation on an invalid password too short', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: '123Pass%' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('validation on an invalid password missing lowercase', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: '123PASSWORD%' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('validation on an invalid password missing uppercase', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: '123password%' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('validation on an invalid password missing number', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: 'valPassword%' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('validation on an invalid password missing number', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: '123Password4' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).toBeInTheDocument();
    });

    test('pass validation on a valid password', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(passwordInput);
        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).not.toBeInTheDocument();
    });

    test('validation on a nonmatch confirm password', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(passwordInput);

        const confirmPassInput = screen.getAllByText(/confirm password/i)[0];
        fireEvent.change(confirmPassInput, { target: { value: 'notmatch' } });
        fireEvent.blur(confirmPassInput);

        expect(screen.queryByText('Must match password')).toBeInTheDocument();
    });

    test('pass validation on a valid confirm password', () => {
        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(passwordInput);

        const confirmPassInput = screen.getAllByText(/confirm password/i)[0];
        fireEvent.change(confirmPassInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(confirmPassInput);

        expect(screen.queryByText('Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter')).not.toBeInTheDocument();
    });

    test('validation on an empty postal code', () => {
        const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
        fireEvent.change(postalCodeInput, { target: { value: '' } });
        fireEvent.blur(postalCodeInput);
        expect(screen.getByText('Please enter a valid postal code (format: A1A 1A1)')).toBeInTheDocument();
    });
    
    test('validation on an invalid postal code', () => {
        const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
        fireEvent.change(postalCodeInput, { target: { value: 'invalidPostalCode' } });
        fireEvent.blur(postalCodeInput);
        expect(screen.getByText('Please enter a valid postal code (format: A1A 1A1)')).toBeInTheDocument();
    });
    
    test('pass validation on a valid postal code', () => {
        const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
        fireEvent.change(postalCodeInput, { target: { value: 'V9V 9V9' } });
        fireEvent.blur(postalCodeInput);
        expect(screen.queryByText('Please enter a valid postal code (format: A1A 1A1)')).not.toBeInTheDocument();
    });

    test('should not be able to submit empty form', () => {
        useNavigateMock = require('react-router-dom').useNavigate;
        useNavigateMock.mockReturnValue(jest.fn());

        const button = screen.getByRole('button', { name: /sign up/i });

        fireEvent.submit(button);
        // TODO confirm correct data is saved?

        expect(useNavigateMock).not.toHaveBeenCalledWith('/verified');

        jest.clearAllMocks();
    });

    test('should be able to submit valid form', () => {
        useNavigateMock = require('react-router-dom').useNavigate;
        useNavigateMock.mockReturnValue(jest.fn());

        const button = screen.getByRole('button', { name: /sign up/i });

        const usernameInput = screen.getByRole('textbox', { name: /username/i });
        fireEvent.change(usernameInput, { target: { value: 'valid1_Username@' } });
        fireEvent.blur(usernameInput);

        const passwordInput = screen.getAllByText(/password/i)[0];
        fireEvent.change(passwordInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(passwordInput);

        const confirmPassInput = screen.getAllByText(/confirm password/i)[0];
        fireEvent.change(confirmPassInput, { target: { value: 'Password123$%^' } });
        fireEvent.blur(confirmPassInput);

        const postalCodeInput = screen.getByRole('textbox', { name: /postal code/i });
        fireEvent.change(postalCodeInput, { target: { value: 'V9V 9V9' } });
        fireEvent.blur(postalCodeInput);

        fireEvent.submit(button);
        // TODO confirm correct data is saved?

        expect(useNavigateMock).toHaveBeenCalledWith('/verified');

        jest.clearAllMocks();
    });

});