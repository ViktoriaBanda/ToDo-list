import React, { useState } from 'react';
import styles from './TodoInput.module.css';

interface Props {
    onAdd: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({onAdd}) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form data-testid="todo-form" onSubmit={handleSubmit}>
            <h3>Добавить заметку</h3>
            <div className={styles.input}>
                <div className={styles.inputField}>
                    <input
                        type="text"
                        placeholder="Что нужно сделать?"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    { text && (
                        <button type="button" className={styles.clear} onClick={() => setText('')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                 viewBox="0 0 25 25" fill="none" className="close ng-star-inserted">
                                <path
                                    d="M16.5 16.7617L12.5 12.7617M12.5 12.7617L8.5 8.76172M12.5 12.7617L16.5 8.76172M12.5 12.7617L8.5 16.7617"
                                    stroke="#FC5A5A"></path>
                            </svg>
                        </button>
                    )}
                </div>
                <button type="submit" className={styles.add}
                        disabled={!text.trim()}
                        data-label="Добавить">
                </button>
            </div>
        </form>
    );
};

export default TodoInput;