'use client'

/**
 * Компонент введення з вбудованою валідацією та можливістю показу пароля.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {string} props.Ilabel - Мітка (label) для інпуту.
 * @param {string} props.Itype - Тип інпуту (text, password тощо).
 * @param {string} props.Iplaceholder - Плейсхолдер для інпуту.
 * @param {string} [props.Iname=Itype] - Назва поля (name).
 * @param {Function} props.hasError - Функція, яка приймає два аргументи: назву поля та наявність помилки.
 * @returns {JSX.Element} Поле введення з валідацією.
 */

import React, { useState, useRef } from "react";
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

    /**
     * Виконує валідацію введеного значення при втраті фокусу.
     * 
     * @param {FocusEvent} e - Подія втрати фокусу.
     */
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

    /**
     * Перемикає видимість пароля.
     */
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




