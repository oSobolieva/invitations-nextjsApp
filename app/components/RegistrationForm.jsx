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
                setRegistrationError({ error: true, text: 'This email is already exist!' });
            } else if (response.status == 200) {
                route.push('/login');
            }
        } catch (er) {
            setRegistrationError({ error: true, text: 'Something went wrong. Try again.' });
        }
        
    }
    
    function getError(field, value) {
        setInputsErrors(previous => ( { ...previous, [field]: value } ));
    }

    return (
        <>
            {loading && <span className="loader"></span>}
            <form className='register__form' onSubmit={checkUser}>
                <h1 className = 'register__form__title'>- Registration - </h1>
                <Input Ilabel='Enter Name' Iplaceholder='Name..' Itype='text' Iname='name' hasError={getError} />
                <Input Ilabel='Enter Surname' Iplaceholder='Surname..' Itype='text' Iname='surname' hasError={getError} />
                <Input Ilabel='Enter Email' Iplaceholder='Email..' Itype='email' hasError={getError}/>
                <Input Ilabel='Enter Password' Iplaceholder='Password..' Itype='password' Iname='password' hasError={getError}/>
                <button className='register__form_button' disabled={!disabledButton}>Register</button>
                {registrationError.error && <p style={{ color: 'red' }}>{registrationError.text}</p>}
            </form>
        </>
        
    )
}