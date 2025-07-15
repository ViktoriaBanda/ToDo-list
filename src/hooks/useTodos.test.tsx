import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

beforeEach(() => {
    localStorage.clear(); // сброс перед каждым тестом
});

test('добавляет новое todo', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
        result.current.addTodo('Task 1');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Task 1');
    expect(result.current.remainingCount).toBe(1);
});

test('переключает completed', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
        result.current.addTodo('Task 1');
    });

    const id = result.current.todos[0].id;

    act(() => {
        result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);
});

test('фильтрация работает', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
        result.current.addTodo('Task 1');
        result.current.addTodo('Task 2');
    });

    const id = result.current.todos[0].id;

    act(() => {
        result.current.toggleTodo(id);
    });

    act(() => {
        result.current.setFilter('completed');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].completed).toBe(true);
});
