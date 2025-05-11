'use client'
/**
 * Форма авторизації користувача.
 * 
 * @component
 * @returns {JSX.Element} Форма для входу користувача з валідацією та перевіркою автентифікації.
 */

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from './Input';

import '@/app/styles/loginPage.css'
import '@/app/styles/loading.css'

export default function LoginForm() {
    const route = useRouter();
    const [errors, setErrors] = useState({
        "email": false,
        "password": false
    });
    const [loading, setLoading] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);

    /**
     * Обробник відправки форми. 
     * Виконує перевірку введених даних і здійснює вхід користувача.
     * 
     * @param {Event} e - Подія відправки форми.
     */
    async function checkUser(e) {
        e.preventDefault();
        
        if (!errors["email"] && !errors["password"]) {
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            
            const response = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
            });

            if (response.status == 401) {
                setLoading(false);
                setUnauthorized(true);
            }

            if (!response?.error) {
                route.push('/user');
            }
        }
        
    }
    
    /**
     * Оновлює стан помилок для конкретного поля.
     * 
     * @param {string} field - Назва поля (email або password).
     * @param {boolean} value - Наявність помилки.
     */
    const getErrors = (field, value) => setErrors(previous => ( { ...previous, [field]: value } ));

    return (
        <>
            {loading && <span className="loader"></span>}
            <form className='start__form' onSubmit={checkUser}>
                <Input Ilabel='Введіть Email' Iplaceholder='example123@ukr.net' Itype='email' hasError={getErrors}/>
                <Input Ilabel='Введіть пароль' Iplaceholder='' Itype='password' Iname='password' hasError={getErrors}/>
                <button className='start__form_button'>Увійти</button>
            </form>
            {unauthorized && <p className = "unauthorized_error">Користувач не існує. Перевірте введені дані або зареєструйтесь!</p>}
        </>
        
    )
}






