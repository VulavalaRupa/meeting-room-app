import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useLoginQuery, meetingRoomApi } from '../../API/rtkQuery';
import { BrowserRouter as Router } from 'react-router';
import LoginForm from './LoginForm';

const store = configureStore({
    reducer: {
        [meetingRoomApi.reducerPath]: meetingRoomApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(meetingRoomApi.middleware),
})

test('renders login form', () => {
    render(
        <Router>
            <Provider store={store}>
                <LoginForm />
            </Provider>
        </Router>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});

test('handles login with valid email and password', () => {
    render(
        <Router>
            <Provider store={store}>
                <LoginForm />
            </Provider>
        </Router>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    // You can add assertions here to check if the login functionality is working as expected
});

test('displays error message for invalid email and password', () => {
    render(
        <Router>
            <Provider store={store}>
                <LoginForm />
            </Provider>
        </Router>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Invalid email or password!! Please register');
    expect(errorMessage).toBeInTheDocument();
});

