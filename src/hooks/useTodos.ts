import { useState, useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

    const addTodo = useCallback((text: string) => {
        if (!text.trim()) return;
        setTodos(prev => [{ id: uuid(), text: text.trim(), completed: false }, ...prev]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos(prev =>
            prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        );
    }, []);

    const removeTodo = useCallback((id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    }, []);

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    const remainingCount = useMemo(
        () => todos.filter(todo => !todo.completed).length,
        [todos]
    );

    return {
        todos: filteredTodos,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
        filter,
        setFilter,
        remainingCount,
    };
}
