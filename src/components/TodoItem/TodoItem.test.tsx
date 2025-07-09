import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
    const mockToggle = jest.fn();
    const mockRemove = jest.fn();

    const defaultProps = {
        id: '1',
        text: 'Task 1',
        completed: false,
        onToggle: mockToggle,
        onRemove: mockRemove,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('отображает текст задачи и состояние чекбокса', () => {
        render(<TodoItem {...defaultProps} />);

        const checkbox = screen.getByRole('checkbox');
        const label = screen.getByLabelText(defaultProps.text);

        expect(label).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    test('клик по карточке вызывает onToggle', () => {
        render(<TodoItem {...defaultProps} />);

        const item = screen.getByTestId('todo-item');
        fireEvent.click(item);

        expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    test('клик по кнопке удаления вызывает onRemove и не вызывает onToggle', () => {
        render(<TodoItem {...defaultProps} />);

        const clearButton = screen.getByTestId('clear-button');
        fireEvent.click(clearButton);

        expect(mockRemove).toHaveBeenCalledTimes(1);
        expect(mockToggle).not.toHaveBeenCalled();
    });
});
