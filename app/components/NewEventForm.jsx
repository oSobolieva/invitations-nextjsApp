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
import React,{ useState } from "react"
import Input from "./Input"
import SelectFriends from "./SelectFriends"
import { useFriends } from '../context/FriendsContext';
import { addEventToDB } from "../lib/eventService";
import {sendInvitations} from "../lib/sendInvitations"

import styles from "../styles/NewEventForm.module.css"


export default function EventForm({closeForm, setEvents, userName, email, successHandler}) {
  const { selectedFriends, clearFriends } = useFriends();
  const [showFriends, setShowFriends] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showSelectFriends = (isFriendVisible) => setShowFriends(isFriendVisible);

    /**
     * Обробляє подію відправки форми.
     * 
     * @param {Event} e - Подія форми.
     */
    async function sendForm(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (fieldsNotEmpty(formData)) {
            setErrorMessage('');
            const eventDetails = {
                _id: generateUniqueId(),
                title: formData.get('title'),
                type: formData.get('type'),
                dresscode: formData.get('dresscode'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location')
            };

            await addEventToDB({ ...eventDetails, friends: selectedFriends }, email);
            sendhandler(eventDetails);         
        } else {
            setErrorMessage('Всі поля мають бути заповнені.');
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
            form.get('time').trim() !== '' &&
            selectedFriends.length > 0
        );
    };

    /**
     * Відправляє запрошення друзям.
     * 
     * @param {Object} eventDetails - Деталі заходу.
     */
    async function sendhandler(eventDetails){
        const friendsEmails = selectedFriends.map(friendsInfo => {
            return friendsInfo['email'];
        });
          
        console.log(friendsEmails);

        const letterType = "create";

        const result = await sendInvitations({ eventDetails, friendsEmails, letterType, userName, email });

        if (result.success) {
            setEvents(prev => [...prev, { ...eventDetails, friends: selectedFriends }]);
            handleCloseForm();
            successHandler();
        } else {
            setStatus('Error: ' + result.error);
        }         
    };

    function generateUniqueId() {
        return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
    } 

    function handleCloseForm() {
        clearFriends();
        closeForm();
    }    
    
    return (
        <div className={styles.new_event}>
            <div className={styles.new_event__title}>
                <h1>Створити Подію</h1>
                <button onClick={handleCloseForm}>X</button>
            </div>
            <form className={styles.new_event__form} onSubmit={sendForm}>
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
                <ul className={styles.new_event__selected_friends}>
                    {selectedFriends.map((el, id) => (<li key={id}>{el.name}</li>))}
                </ul>
                <button type="button" className={styles.new_event__friendsBtn} onClick={() => showSelectFriends(true)}>Add Friends</button>
                {showFriends &&
                    <SelectFriends
                    closeShowFriends={() => showSelectFriends(false)}/>}
                <button className={styles.new_event__form__sendBtn}>Send Invitations!</button>
            </form>
            {errorMessage == '' ? '' : <p className={styles.new_event__error_message}>{errorMessage}</p>}
        </div>  
    )
}


