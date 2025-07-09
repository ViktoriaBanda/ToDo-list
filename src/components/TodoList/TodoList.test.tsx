import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
    const todos = [
        { id: '1', text: 'Task 1', completed: false },
        { id: '2', text: 'Task 2', completed: true },
    ];
    const mockToggle = jest.fn();
    const mockRemove = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерит все заметки при фильтре all', () => {
        render(<TodoList todos={todos} onToggle={mockToggle} onRemove={mockRemove} filter="all" />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('рендерит только активные заметки при фильтре active', () => {
        render(<TodoList todos={todos} onToggle={mockToggle} onRemove={mockRemove} filter="active" />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).toBeNull();
    });

    test('рендерит только выполненные заметки при фильтре completed', () => {
        render(<TodoList todos={todos} onToggle={mockToggle} onRemove={mockRemove} filter="completed" />);
        expect(screen.queryByText('Task 1')).toBeNull();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('показывает сообщение если нет заметок', () => {
        const { rerender } = render(<TodoList todos={[]} onToggle={mockToggle} onRemove={mockRemove} filter="all" />);
        expect(screen.getByText('Заметок нет')).toBeInTheDocument();

        rerender(<TodoList todos={[]} onToggle={mockToggle} onRemove={mockRemove} filter="active" />);
        expect(screen.getByText('Нет активных заметок')).toBeInTheDocument();

        rerender(<TodoList todos={[]} onToggle={mockToggle} onRemove={mockRemove} filter="completed" />);
        expect(screen.getByText('Нет выполненных заметок')).toBeInTheDocument();
    });
});
