import React from 'react';
import styles from '../styles/ConfirmModal.module.css';

export default function ConfirmModal({ 
    message, 
    onConfirm, 
    onCancel, 
    showCkeckbox,
    ...props
}) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                {showCkeckbox && <label>
                    <input
                        type="checkbox"
                        checked={props.dontShowAgain}
                        onChange={() => props.setDontShowAgain(prev => !prev)}
                    />
                    Більше не показувати
                </label>
                }
                <div className={styles.modalButtons}>
                    <button type="button" onClick={onConfirm}>Підтвердити</button>
                    <button type="button" onClick={onCancel}>Скасувати</button>
                </div>
            </div>
        </div>
    );
}
