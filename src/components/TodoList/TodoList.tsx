import React, { useMemo } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { Todo } from "../../hooks/useTodos";

interface Props {
    todos: Todo[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    filter: 'all' | 'active' | 'completed';
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onRemove, filter }) => {
    const filtered = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });
    }, [todos, filter]);

    return (
        <div className={styles.list}>
            {filtered.length === 0 ? (
                <div className={styles.empty}>
                    {filter === 'all' && 'Заметок нет'}
                    {filter === 'active' && 'Нет активных заметок'}
                    {filter === 'completed' && 'Нет выполненных заметок'}
                </div>
            ) : (
                filtered.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        onToggle={() => onToggle(todo.id)}
                        onRemove={() => onRemove(todo.id)}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;