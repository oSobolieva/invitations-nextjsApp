'use client'
import { useState } from "react";
import validateForm from "./helpers/validateForm";

import '@/app/styles/inputs.css'

export default function Input({ Ilabel, Itype, Iplaceholder, Iname=Itype, hasError }) {
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        text: '',
    });
    
    function checkBlur(e) {
        const validationResult = validateForm(e.target.value, Itype);
        setErrorMessage(validationResult);
        hasError(Iname, !validationResult.error);
    }
    
    return (
        <div className = 'form_block'>
            <label className='form_label'>{Ilabel}</label>
            <input type={Itype}
                placeholder={Iplaceholder}
                className={errorMessage.error ? 'form_input error-input' : 'form_input'}
                name={Iname}
                onBlur={checkBlur}
            />
            {errorMessage.error && <p className='error-message'>{errorMessage.text}</p>}
        </div>
    )
}


