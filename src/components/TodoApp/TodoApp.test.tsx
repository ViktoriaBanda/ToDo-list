import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoApp from './TodoApp';
import { useTodos } from '../../hooks/useTodos';

jest.mock('../../hooks/useTodos');

describe('TodoApp', () => {
    const mockAddTodo = jest.fn();
    const mockToggleTodo = jest.fn();
    const mockRemoveTodo = jest.fn();
    const mockClearCompleted = jest.fn();
    const mockSetFilter = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodos as jest.Mock).mockReturnValue({
            todos: [
                { id: '1', text: 'Task 1', completed: false },
                { id: '2', text: 'Task 2', completed: true }
            ],
            addTodo: mockAddTodo,
            toggleTodo: mockToggleTodo,
            removeTodo: mockRemoveTodo,
            clearCompleted: mockClearCompleted,
            setFilter: mockSetFilter,
            filter: 'all',
            remainingCount: 1,
        });
    });

    test('рендерит дочерние компоненты с правильными пропсами', () => {
        render(<TodoApp />);

        expect(screen.getByText(/Активные \(1\)/)).toBeInTheDocument();
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
});
