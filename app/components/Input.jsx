'use client'
import { useState } from "react";
import Image from 'next/image'
import validateForm from "./helpers/validateForm";
import eye from './assets/password-eye.png'

import '@/app/styles/inputs.css'

export default function Input({ Ilabel='', Itype, Iplaceholder, Iname=Itype, hasError, ...props }) {
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        text: '',
    });
    const showIcon = Iname == 'password';
    
    function checkBlur(e) {
        let validationResult; 
        if (Iname == 'name' || Iname == 'surname') {
            validationResult = validateForm(e.target.value, Itype);
        } else {
            validationResult = validateForm(e.target.value, Iname);
        }
        setErrorMessage(validationResult);
        hasError( Iname, validationResult.error);
    }

    function showPassword() {
        const input = document.getElementsByName(Iname);

        if (input[0].getAttribute('type') == 'password') {
            input[0].setAttribute('type', 'text');
        } else {
            input[0].setAttribute('type', 'password');
        }
    }
    
    return (
        <div className = 'form_block'>
            <label className='form_label'>{Ilabel}
            <input type={Itype}
                placeholder={Iplaceholder}
                className={errorMessage.error ? 'form_input error-input' : 'form_input'}
                name={Iname}
                onBlur={checkBlur}
                {...props}
            />
            {showIcon && <Image  src={eye} alt="Picture of the author" className='form__input_eye' onClick={showPassword} /> }
            </label>           
            {errorMessage.error && <p className='error-message'>{errorMessage.text}</p>}
        </div>
    )
}




