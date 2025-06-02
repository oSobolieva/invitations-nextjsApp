/**
 * Форма редагування події.
 * 
 * Дозволяє користувачам оновлювати інформацію про подію, включаючи назву, тип, стиль одягу, опис, дату, час і локацію.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {Object} props.information - Поточна інформація про подію.
 * @param {string} props.information.title - Назва події.
 * @param {string} props.information.type - Тип події.
 * @param {string} props.information.dresscode - Дрес-код для події.
 * @param {string} props.information.description - Опис події.
 * @param {string} props.information.date - Дата події.
 * @param {string} props.information.time - Час події.
 * @param {string} props.information.location - Локація події.
 * @param {Function} props.closeEventInfo - Функція для закриття форми редагування.
 * @returns {JSX.Element} Форма редагування події.
 */

import { useState } from "react";
import Input from "./Input";
import SelectFriends from "./SelectFriends";
import { useFriends } from '../context/FriendsContext';
import { deleteEventFromDB, updateEventInDB } from "../lib/eventService";

import styles from "../styles/EventInformation.module.css";
import errorStyle from "../styles/NewEventForm.module.css"

export default function ChangeEventForm({ information, email, closeEventInfo }) {
    const { selectedFriends, clearFriends } = useFriends();
    const [showFriends, setShowFriends] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showSelectFriends = (isFriendVisible) => setShowFriends(isFriendVisible);

    function handleCloseEventChange() {
        clearFriends();
        closeEventInfo();
    }
    
    /**
     * Обробник надсилання форми. Перевіряє, чи всі поля заповнені, перед надсиланням даних.
     * 
     * @param {Event} e - Подія надсилання форми.
     */
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (fieldsNotEmpty(formData)) {
            const eventDetails = {
                _id: information._id,
                title: formData.get('title'),
                type: formData.get('type'),
                dresscode: formData.get('dresscode'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location')
            };

            //send a letter about changes
            updateEventInDB(information._id, eventDetails, email);
        } else {
            setErrorMessage('All fields need to have text.');
        }
    }

    /**
     * Перевіряє, чи всі необхідні поля форми заповнені.
     * 
     * @param {FormData} form - Дані форми.
     * @returns {boolean} `true`, якщо всі поля заповнені, інакше `false`.
     */
    function fieldsNotEmpty(form) {
        return form.get('title').trim() !== '' &&
            form.get('dresscode').trim() !== '' &&
            form.get('description').trim() !== '' &&
            form.get('location').trim() !== '' &&
            form.get('date').trim() !== '' &&
            form.get('time').trim() !== '';
    }

    function handleDelete() {
        //send a letter with warning of canceled.
        deleteEventFromDB(information._id, email);
    }

    return (
        <form className={styles.event_information} onSubmit={handleSubmit}>
            <div className={styles.event_information__header}>
                <Input Ilabel='Назва заходу' Itype='text' Iplaceholder='enter event' Iname='title' hasError={() => console.log('+')} value={information.title}/>
                <button onClick={handleCloseEventChange}>X</button>
            </div>
            <select name='type'>
                <option selected="selected">{information.type}</option>
                <option>Вечірка</option>
                <option>After-party</option>
                <option>Гендерна вечірка</option>
                <option>Поховання</option>
                <option>Весілля</option>
                <option>День народження</option>
            </select>
            <Input Ilabel='Стиль одягу' Itype='text' Iplaceholder='enter dress-code' Iname='dresscode' hasError={() => console.log('+')} value={information.dresscode}/>
            <Input Ilabel='Опис' Itype='text' Iplaceholder='description..' Iname='description' hasError={() => console.log('+')} value={information.description}/>
            <Input Ilabel='Локація' Itype='text' Iplaceholder='enter address' Iname='location' hasError={() => console.log('+')} />
            <Input Ilabel='Дата' Itype='date' Iplaceholder='' Iname='date' hasError={() => console.log('+')} value={information.date}/>
            <Input Ilabel='Час' Itype='time' Iplaceholder='' Iname='time' hasError={() => console.log('+')} value={information.time}/>
            <ul className={styles.new_event__selected_friends}>
                {selectedFriends.map((el, id) => (<li key={id}>{el.name}</li>))}
            </ul>
            <button className={styles.new_event__friendsBtn} onClick={() => showSelectFriends(true)}>Add Friends</button>
            {showFriends &&
                <SelectFriends isShowFriends={() => showSelectFriends(false)}/>}

            {errorMessage == '' ? '' : <p className={errorStyle.new_event__error_message}>{errorMessage}</p>}
            <div className={styles.event_information__actions}>
                <button type="submit" className={styles.event_information__save}>&#9989;</button>
                <button type="button" className={styles.event_information__delete} onClick={handleDelete}>&#128686;</button>
            </div>
        </form>
    )
}
