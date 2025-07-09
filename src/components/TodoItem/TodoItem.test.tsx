import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
    const mockToggle = jest.fn();
    const mockRemove = jest.fn();

    const defaultProps = {
        id: '1',
        text: 'Тест задачи',
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

        const label = screen.getByLabelText(defaultProps.text);
        fireEvent.click(label.closest('div')!);

        expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    test('клик по кнопке удаления вызывает onRemove и не вызывает onToggle', () => {
        render(<TodoItem {...defaultProps} />);

        const crossButton = screen.getByText('✖');
        fireEvent.click(crossButton);

        expect(mockRemove).toHaveBeenCalledTimes(1);
        expect(mockToggle).not.toHaveBeenCalled();
    });
});
