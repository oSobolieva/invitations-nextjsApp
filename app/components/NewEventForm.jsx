'use client'
import React,{ useState } from "react"
import Input from "./Input"
import SearchContainer from "./SearchContainer"
import addEventToDB from "./helpers/eventToDB";


export default function EventForm({closeForm, friends, email}) {
    const [showFriends, setShowFriends] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const sendForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (fieldsNotEmpty(formData)) {
            const eventDetails = {
                title: formData.get('title'),
                type: formData.get('type'),
                dresscode: formData.get('dresscode'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location')
            };
            
            sendInvitations(eventDetails);
            addEventToDB(eventDetails, email);
        } else {
            setErrorMessage('All fields need to have text.');
        }
    };

    const fieldsNotEmpty = (form) => {
        return (
            form.get('title').trim() !== '' &&
            form.get('dresscode').trim() !== '' &&
            form.get('description').trim() !== '' &&
            form.get('location').trim() !== '' &&
            form.get('date').trim() !== '' &&
            form.get('time').trim() !== ''
        );
    };

    const sendInvitations = (eventDetails) => {
        // send to friends' emails!!!  ADD FRIENDS TO DB
    };

    
    return (
        <div className = 'new-event'>
            <div className='new-event__title'>
                <h1>New Event</h1>
                <button onClick={closeForm}>X</button>
            </div>
            <form className='new-event__form' onSubmit={sendForm}>
                <Input Ilabel='Назва заходу' Itype='text' Iplaceholder='enter event' Iname='title' hasError={() => console.log('+')} />
                <select name='type'>
                    <option>Вечірка</option>
                    <option>After-party</option>
                    <option>Гендерна вечірка</option>
                    <option>Поховання</option>
                    <option>Весілля</option>
                    <option>День народження</option>
                </select>
                <Input Ilabel='Стиль одягу' Itype='text' Iplaceholder='enter dress-code' Iname='dresscode' hasError={() => console.log('+')} />
                <Input Ilabel='Опис' Itype='text' Iplaceholder='description..' Iname='description' hasError={() => console.log('+')} />
                <Input Ilabel='Локація' Itype='text' Iplaceholder='enter address' Iname='location' hasError={() => console.log('+')} />
                <Input Ilabel='Дата' Itype='date' Iplaceholder='' Iname='date' hasError={() => console.log('+')} />
                <Input Ilabel='Час' Itype='time' Iplaceholder='' Iname='time' hasError={() => console.log('+')} />
                {showFriends ? <SearchContainer people={friends} /> : <button className='new_event__friends' onClick={() => setShowFriends(true)}>Friends</button>}
                <button className = 'new-event__form__sendBtn'>Send Invitations!</button>
            </form>
            {errorMessage == '' ? '' : <p className="new-event__error_message">{errorMessage}</p>}
        </div>  
    )
}


