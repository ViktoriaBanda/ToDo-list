import React from 'react';
import styles from './TodoItem.module.css';

interface Props {
    id: string;
    text: string;
    completed: boolean;
    onToggle: () => void;
    onRemove: () => void;
}

const TodoItem: React.FC<Props> = ({ id, text, completed, onToggle, onRemove }) => {
    return (
        <div className={styles.item} onClick={onToggle}>
            <div className={styles.checkbox}>
                <input type="checkbox"
                       id={`completed-${id}`}
                       checked={completed}/>
                <label htmlFor={`completed-${id}`} className={completed ? styles.completed : ''} >{text}</label>
            </div>
            <span className={styles.delete} onClick={(event) =>  {
                event.stopPropagation(); onRemove();
            }}>
        ✖
      </span>
        </div>
    );
};

export default TodoItem;