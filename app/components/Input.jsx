'use client'
import React, { useState, useCallback, useRef } from "react";
import Image from 'next/image'
import validateForm from "./helpers/validateForm";
import eye from './assets/password-eye.png'

import '@/app/styles/inputs.css'

export default function Input({ Ilabel='', Itype, Iplaceholder, Iname=Itype, hasError, ...props }) {
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        text: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputRef = useRef(null);

    const checkBlur = (e) => {
        if (e.relatedTarget && e.relatedTarget.classList.contains("form__input_eye")) {
            return;
        }

        let validationResult = validateForm(
            e.target.value,
            Iname === "name" || Iname === "surname" ? Itype : Iname
        );
            
        if (Iname === "password") {
            setIsPasswordVisible(false);
        }

        setErrorMessage(validationResult);
        hasError(Iname, validationResult.error);
    };


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev); 
    }

    const inputType = Iname === "password" ? (isPasswordVisible ? "text" : "password") : Itype;
    
    return (
        <div className = 'form_block'>
            <label className='form_label'>
                {Ilabel}
                <input
                    type={inputType}
                    placeholder={Iplaceholder}
                    className={errorMessage.error ? 'form_input error-input' : 'form_input'}
                    name={Iname}
                    onBlur={checkBlur}
                    ref={inputRef}
                    {...props}
                />
                {Iname === 'password' && (
                    <Image src={eye}
                        alt="Show password"
                        className='form__input_eye'
                        tabIndex="-1"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={togglePasswordVisibility} />
                )}
            </label>           
            {errorMessage.error && <p className='error-message'>{errorMessage.text}</p>}
        </div>
    )
}




