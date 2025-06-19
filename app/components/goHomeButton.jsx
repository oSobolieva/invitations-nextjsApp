'use client'
/**
 * Компонент кнопки для переходу на головну сторінку.
 * 
 * @component
 * @returns {JSX.Element} Кнопка, яка перенаправляє користувача на головну сторінку.
 */
import { useRouter } from 'next/navigation';

import styles from "../styles/UserPage.module.css"

export default function GoHome() {
    const route = useRouter();
    
    /**
     * Функція для переходу на головну сторінку.
     */
    const go = () => route.push('/');

    return <button className={styles.goHome_button} onClick={go}>&#128072;</button>
}

