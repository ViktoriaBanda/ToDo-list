import React from 'react';
import styles from './MenuBar.module.scss';

interface Props {
    activeCount: number;
    onClearCompleted: () => void;
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    filter: 'all' | 'active' | 'completed';
}

const MenuBar: React.FC<Props> = ({activeCount, onClearCompleted, setFilter, filter}) => {
    return (
        <div className={styles.menu}>
            <div className={styles.buttons}>
                {(['all', 'active', 'completed'] as const).map((menuItem) => (
                    <button
                        key={menuItem}
                        onClick={() => setFilter(menuItem)}
                        className={`${styles.button} ${filter === menuItem ? styles.active : ''}`}>
                        {menuItem === 'all' ? 'Все' : menuItem === 'active' ? `Активные (${activeCount})` : 'Выполненные'}
                    </button>
                ))}
            </div>
            <div className={styles.clear} onClick={onClearCompleted}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25"
                     viewBox="0 0 24 25" fill="none">
                    <path
                        d="M8 12.9854L12.2426 17.228L20.727 8.74268M3 12.9854L7.24264 17.228M15.7279 8.74268L12.5 12.0001"
                        stroke="#4C54F4"></path>
                </svg>
                Очистить выполненные
            </div>
        </div>
    );
};

export default MenuBar;