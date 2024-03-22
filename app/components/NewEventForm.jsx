'use client'
import { useState } from "react"
import Input from "./Input"
import SearchContainer from "./SearchContainer"
import addEventToDB from "./helpers/eventToDB";


export default function EventForm({closeForm, friends, email}) {
    const [showFriends, setShowFriends] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function sendForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        
        if (fieldsNotEmpty(formData)) {

            const letter = `Hello, Dear! NAME, I want to invite you to ${formData.get('title')}. It will be an OPTION with ${formData.get('dresscode')} dress-code.
            ${formData.get('description')}.
            When? ${formData.get('date')} ${formData.get('time')}. 
            Where? ${formData.get('location')}.
            I'm looking forward to you! 
            Sincerely yours, USERNAME.`

            //sending letters to friend's emails
            
            addEventToDB({
                title: formData.get('title'),
                type: formData.get('type'),
                dresscode: formData.get('dresscode'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location')
            }, email);

            //SEND FRIENDS TO DB TOO!!!!
        } else {
            setErrorMessage('All fields need to have text.');
        }
        
    }

    return (
        <div className = 'new-event'>
            <div className='new-event__title'>
                <h1>New Event</h1>
                <button onClick={closeForm}>X</button>
            </div>
            <form className='new-event__form' onSubmit={sendForm}>
                <Input Ilabel='Event Name' Itype='text' Iplaceholder='enter event' Iname='title' hasError={() => console.log('+')} />
                <select name='type'>
                    <option>Party</option>
                    <option>After-party</option>
                    <option>Sex-party</option>
                    <option>Funeral</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                </select>
                <Input Ilabel='Dress-code' Itype='text' Iplaceholder='enter dress-code' Iname='dresscode' hasError={() => console.log('+')} />
                <Input Ilabel='Description' Itype='text' Iplaceholder='description..' Iname='description' hasError={() => console.log('+')} />
                <Input Ilabel='Location' Itype='text' Iplaceholder='enter address' Iname='location' hasError={() => console.log('+')} />
                <Input Ilabel='Date' Itype='date' Iplaceholder='' Iname='date' hasError={() => console.log('+')} />
                <Input Ilabel='Time' Itype='time' Iplaceholder='' Iname='time' hasError={() => console.log('+')} />
                {showFriends ? <SearchContainer people={friends} /> : <button className='new_event__friends' onClick={() => setShowFriends(true)}>Friends</button>}
                <button className = 'new-event__form__sendBtn'>Send Invitations!</button>
            </form>
            {errorMessage == '' ? '' : <p className="new-event__error_message">{errorMessage}</p>}
        </div>  
    )
}


function fieldsNotEmpty(form) {
    return form.get('title').trim() !== '' &&
        form.get('dresscode').trim() !== '' &&
        form.get('description').trim() !== '' &&
        form.get('location').trim() !== '' &&
        form.get('date').trim() !== '' &&
        form.get('time').trim() !== '';
}

