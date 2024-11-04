import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search';

// Налаштовуємо таймери Jest для тестування debounce
jest.useFakeTimers();

const dummyFriends = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
];

test('renders Search component and performs search correctly', async () => {
    render(<Search dummy_friends={dummyFriends} />);
    
    // Перевірка початкового стану: всі друзі відображаються
    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/charlie@example.com/i)).toBeInTheDocument();

    // Знаходимо поле введення та вводимо пошуковий запит
    const searchInput = screen.getByPlaceholderText('Find user..');
    fireEvent.change(searchInput, { target: { value: 'Bob' } });

    // Пропускаємо час для debounce (1500 мс)
    jest.advanceTimersByTime(1500);

    // Очікуємо, що після фільтрації залишився лише "Bob"
    await waitFor(() => {
        expect(screen.queryByText(/alice@example.com/i)).not.toBeInTheDocument();
        expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
        expect(screen.queryByText(/charlie@example.com/i)).not.toBeInTheDocument();
    });
});

test('clears the search and displays all users', async () => {
    render(<Search dummy_friends={dummyFriends} />);
    
    const searchInput = screen.getByPlaceholderText('Find user..');
    fireEvent.change(searchInput, { target: { value: 'Bob' } });
    jest.advanceTimersByTime(1500);

    await waitFor(() => {
        expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
        expect(screen.queryByText(/alice@example.com/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/charlie@example.com/i)).not.toBeInTheDocument();
    });

    // Очищаємо поле введення
    fireEvent.change(searchInput, { target: { value: '' } });
    jest.advanceTimersByTime(1500);

    // Перевіряємо, що знову відображаються всі друзі
    await waitFor(() => {
        expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/charlie@example.com/i)).toBeInTheDocument();
    });
});
