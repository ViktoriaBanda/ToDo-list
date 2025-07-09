import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp/TodoApp';

test('добавление новой задачи', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/добавьте/i);
    const button = screen.getByText('+');

    fireEvent.change(input, { target: { value: 'Сделать задание' } });
    fireEvent.click(button);

    expect(screen.getByText('Сделать задание')).toBeInTheDocument();
});

test('переключение задачи', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/добавьте/i);
    const button = screen.getByText('+');

    fireEvent.change(input, { target: { value: 'Протестировать' } });
    fireEvent.click(button);

    const item = screen.getByText('Протестировать');
    fireEvent.click(item);

    expect(item).toHaveClass('completed');
});