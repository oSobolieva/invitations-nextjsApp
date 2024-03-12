'use client'
import { useState } from "react"
import Input from "./Input"
import SearchContainer from "./SearchContainer"


export default function EventForm({closeForm, friends}) {
    const [showFriends, setShowFriends] = useState(false);

    return (
        <div className = 'new-event'>
            <div className='new-event__title'>
                <h1>New Event</h1>
                <button onClick={closeForm}>X</button>
            </div>
            <form className='new-event__form'>
                <Input Ilabel='Event Name' Itype='text' Iplaceholder='enter event' hasError={() => console.log('+')} />
                <select>
                    <option>Party</option>
                    <option>After-party</option>
                    <option>Sex-party</option>
                    <option>Funeral</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                </select>
                <Input Ilabel='Event Theme' Itype='text' Iplaceholder='enter theme' hasError={() => console.log('+')} />
                <Input Ilabel='Dress-code' Itype='text' Iplaceholder='enter dress-code' hasError={() => console.log('+')} />
                <Input Ilabel='Description' Itype='text' Iplaceholder='description..' hasError={() => console.log('+')} />
                <Input Ilabel='Location' Itype='text' Iplaceholder='enter address' hasError={() => console.log('+')} />
                <Input Ilabel='Date' Itype='date' Iplaceholder='' hasError={() => console.log('+')} />
                <Input Ilabel='Time' Itype='time' Iplaceholder='' hasError={() => console.log('+')} />

                {showFriends ? <SearchContainer people={friends} /> : <button className='new_event__friends' onClick={() => setShowFriends(true)}>Friends</button>}
            </form>
        </div>
        
    )
}

