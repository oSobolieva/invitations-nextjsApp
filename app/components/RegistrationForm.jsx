'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from './Input';

import '@/app/styles/registerPage.css'
import '@/app/styles/loading.css'


export default function RegistrationForm() {
    const route = useRouter();
    const [inputsErrors, setInputsErrors] = useState({
        'name': false,
        'surname': false,
        'email': false,
        'password': false,
    });
    const [registrationError, setRegistrationError] = useState({
        error: false,
        text: '',
    });
    const [loading, setLoading] = useState(false);
    let disabledButton = !inputsErrors['name'] && !inputsErrors['surname'] && !inputsErrors['email'] && !inputsErrors['password'];

    async function checkUser(e) {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const userName = formData.get('name') + ' ' + formData.get('surname');

        try {
            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userName,
                    email: formData.get('email'),
                    password: formData.get('password'),
                    image: '',
                    events: [],
                    friends: [],
                })
            });

            if (response.status == 400) {
                setRegistrationError({ error: true, text: 'Email вже існує' });
            } else if (response.status == 200) {
                route.push('/login');
            }
        } catch (er) {
            setRegistrationError({ error: true, text: 'Щось пішло не так:( Спробуйте знову' });
        }
        
    }
    
    function getError(field, value) {
        setInputsErrors(previous => ( { ...previous, [field]: value } ));
    }

    return (
        <>
            {loading && <span className="loader"></span>}
            <form className='register__form' onSubmit={checkUser}>
                <h1 className = 'register__form__title'>- Реєстрація - </h1>
                <Input Ilabel="Введіть ім'я" Iplaceholder='Іван' Itype='text' Iname='name' hasError={getError} />
                <Input Ilabel='Введіть прізвище' Iplaceholder='Андрієнко' Itype='text' Iname='surname' hasError={getError} />
                <Input Ilabel='Введіть Email' Iplaceholder='example12@ukr.net' Itype='email' hasError={getError}/>
                <Input Ilabel='Введіть пароль' Iplaceholder='Ivan1995' Itype='password' Iname='password' hasError={getError}/>
                <button className='register__form_button' disabled={!disabledButton}>Зареєструватися</button>
                {registrationError.error && <p style={{ color: 'red' }}>{registrationError.text}</p>}
            </form>
        </>
        
    )
}