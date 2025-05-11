'use client'
/**
 * Форма для створення нового заходу.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {Function} props.closeForm - Функція для закриття форми.
 * @param {Array} props.friends - Масив друзів користувача.
 * @param {string} props.email - Електронна адреса користувача.
 * @returns {JSX.Element} Форма створення заходу.
 */
import React,{ useState, useEffect } from "react"
import Input from "./Input"
import SelectFriends from "./SelectFriends"
import addEventToDB from "../lib/eventToDB";


export default function EventForm({closeForm, email}) {
    const [showFriends, setShowFriends] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [allFriends, setAllFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const loadFriends = async () => {
        const res = await fetch(`/api/friends?email=${email}`);
        const data = await res.json();
        setAllFriends(data);
    }
    
    useEffect(() => {
        loadFriends();
    }, [email]);


    const showSelectFriends = (isFriendVisible) => setShowFriends(isFriendVisible);

    const getFriends = (friends) => setSelectedFriends(friends);

    /**
     * Обробляє подію відправки форми.
     * 
     * @param {Event} e - Подія форми.
     */
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

    /**
     * Перевіряє, чи всі поля форми заповнені.
     * 
     * @param {FormData} form - Дані форми.
     * @returns {boolean} Чи всі поля заповнені.
     */
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

    /**
     * Відправляє запрошення друзям.
     * 
     * @param {Object} eventDetails - Деталі заходу.
     */
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
                <ul className="new_event__selected_friends">
                    {selectedFriends.map((el, id) => (<li key={id}>{el.name}</li>))}
                </ul>
                <button className='new_event__friendsBtn' onClick={() => showSelectFriends(true)}>Add Friends</button>
                {showFriends &&
                    <SelectFriends
                    availableFriends={allFriends.filter(f => !selectedFriends.map(s => s.email).includes(f.email))}
                    choosenFriends={selectedFriends}
                    isShowFriends={() => showSelectFriends(false)}
                    getListFriends={getFriends} />}
                <button className = 'new-event__form__sendBtn'>Send Invitations!</button>
            </form>
            {errorMessage == '' ? '' : <p className="new-event__error_message">{errorMessage}</p>}
        </div>  
    )
}


