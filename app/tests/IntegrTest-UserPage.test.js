import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserPage from '../components/UserPage';


describe('Intergarion Test', () => {
    test('renders UserPage component with Sidebar', () => {
        const user = {
            events: [{ title: 'Event 1' }, { title: 'Event 2' }],
            friends: ['friend1@example.com', 'friend2@example.com'],
            email: 'user@example.com',
        };

        render(<UserPage user={user} />);

        const sideBarButton = screen.getByText('>>>');
        expect(sideBarButton).toBeInTheDocument();

        // Витягуємо Sidebar
        fireEvent.click(sideBarButton);

        // Перевіряємо Sidebar
        expect(screen.getByText(user.email)).toBeInTheDocument();
    });


    test('Rendering events in UserPage component', () => {
        const user = {
            events: [{ title: 'Event1' }, { title: 'Nickole Birthday' }],
            friends: ['frnd1@example.com', 'fri_d2@example.com'],
            email: 'HenryWal@gmail.tb',
        };

        render(<UserPage user={user} />);

        // Перевіряємо події
        user.events.forEach(async (event) => {
            expect(await screen.findByText(event.title)).toBeInTheDocument();
        });
    });

    test('Rendering UserPage component without events', () => {
        const user = {
            events: [],
            friends: ['frnd1@example.com', 'fri_d2@example.com'],
            email: 'elofant899@example.com',
        };

        render(<UserPage user={user} />);

        const text = 'no event yet.';

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    test('renders UserPage component with form toggling', () => {
        const user = {
            events: [{ title: 'Nickole Birthday' }],
            friends: ['frnd1@example.com', 'fri_d2@example.com', 'fri33@example.com'],
            email: 'HenryWal@gmail.tb',
        };

        render(<UserPage user={user} />);

        // Перевіряємо кнопку
        const addButton = document.querySelector('.addEnventBtn');
        expect(addButton).toBeInTheDocument();

        // Відкриваємо форму
        fireEvent.click(addButton);
        expect(screen.getByText('New Event')).toBeInTheDocument(); // перевірка наявності форми

        // Закриваємо форму
        const closeButton = screen.getByText('X');
        fireEvent.click(closeButton);
        expect(screen.queryByText('New Event')).not.toBeInTheDocument();
    });


})


