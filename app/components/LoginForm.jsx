'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import '@/app/styles/loginPage.css'

export default function LoginForm() {
    const route = useRouter();
    const [error, setError] = useState({
        error: false,
        text: ''
    });

    async function checkUser(e) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        if (formData.get('email').trim() == '' || formData.get('password').trim() == '') {
            setError({
                error: true,
                text: 'Each field must have personal data for login.'
            });
        } else {
            const response = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
            });

            if (response.status == 401) {
                console.log('+');
                setError({
                    error: true,
                    text: 'User does not exist. Check the entered data or register!'
                });
            }

            if (!response?.error) {
                route.push('/user');
            }
        }
        
    }

    const removeError = () => setError({error: false, text: ''});
    

    return (
        <form className = 'start__form' onSubmit={checkUser}>
            <div className = 'start__form_block'>
                    <label className = 'start__form_label'>User Name</label>
                    <input type='email' placeholder="email" className = 'start__form_input' name='email' onFocus={removeError}/>
                </div>
                <div className = 'start__form_block'>
                    <label className = 'start__form_label'>Password</label>
                    <input type='password' placeholder="" className = 'start__form_input' name='password' onFocus={removeError}/>
                </div>
            <button className='start__form_button'>Go</button>
            {error.error && <p className='start__form_error-text'>{error.text}</p>}
        </form>
    )
}






