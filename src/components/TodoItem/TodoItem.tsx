import React from 'react';
import styles from './TodoItem.module.scss';

interface Props {
    id: string;
    text: string;
    completed: boolean;
    onToggle: () => void;
    onRemove: () => void;
}

const TodoItem: React.FC<Props> = ({text, completed, onToggle, onRemove}) => {
    return (
        <div data-testid="todo-item" className={styles.item} onClick={onToggle}>
            <label className={completed ? styles.completed : ''}>
                <input type="checkbox" checked={completed} onChange={() => {
                }}/>
                <span>{text}</span>
            </label>
            <button data-testid="clear-button" type="button" className={styles.delete} onClick={(event) => {
                event.stopPropagation();
                onRemove();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                     viewBox="0 0 25 25" fill="none" className="close ng-star-inserted">
                    <path d="M7.5 7.5L17.5 17.5M7.5 17.5L17.5 7.5"
                          stroke="#FC5A5A" strokeWidth="1.8" strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TodoItem;