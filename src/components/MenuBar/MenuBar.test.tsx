import MenuBar from './MenuBar';
import { render, screen, fireEvent } from '@testing-library/react';

describe('MenuBar', () => {
    const mockSetFilter = jest.fn();
    const mockClearCompleted = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('отображает все кнопки и активный фильтр', () => {
        render(<MenuBar activeCount={5} filter={'active'} setFilter={mockSetFilter}
                        onClearCompleted={mockClearCompleted}/>);

        const activeButton = screen.getByText('Активные (5)');
        expect(screen.getByText('Все')).toBeInTheDocument();
        expect(screen.getByText('Выполненные')).toBeInTheDocument();
        expect(activeButton).toBeInTheDocument();

        expect(activeButton.className).toMatch(/active/);
    });

    test('клик по кнопкам фильтра вызывает setFilter с правильным аргументом', () => {
        render(
            <MenuBar activeCount={0} filter="all" setFilter={mockSetFilter}
                     onClearCompleted={mockClearCompleted}/>
        );

        fireEvent.click(screen.getByText('Активные (0)'));
        expect(mockSetFilter).toHaveBeenCalledWith('active');

        fireEvent.click(screen.getByText('Выполненные'));
        expect(mockSetFilter).toHaveBeenCalledWith('completed');

        fireEvent.click(screen.getByText('Все'));
        expect(mockSetFilter).toHaveBeenCalledWith('all');
    });

    test('клик по "Очистить выполненные" вызывает onClearCompleted', () => {
        render(
            <MenuBar activeCount={0} filter="all" setFilter={mockSetFilter}
                     onClearCompleted={mockClearCompleted}/>
        );

        fireEvent.click(screen.getByText('Очистить выполненные'));
        expect(mockClearCompleted).toHaveBeenCalledTimes(1);
    });
})