import React from 'react';
import styles from './TodoApp.module.css';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import MenuBar from "../MenuBar/MenuBar";
import { useTodos } from "../../hooks/useTodos";

const TodoApp: React.FC = () => {
    const {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
        setFilter,
        filter,
        remainingCount,
    } = useTodos();

    return (
        <div className={styles.app}>
            <TodoInput onAdd={addTodo} />
            <MenuBar
                todos={todos}
                activeCount={remainingCount}
                onClearCompleted={clearCompleted}
                setFilter={setFilter}
                filter={filter}
            />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onRemove={removeTodo}
                filter={filter}
            />
        </div>
    );
};

export default TodoApp;