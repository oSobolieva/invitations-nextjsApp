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

import { useEffect, useState } from "react";
import Input from "./Input";
import SelectFriends from "./SelectFriends";
import { useFriends } from '../context/FriendsContext';
import { deleteEventFromDB, updateEventInDB } from "../lib/eventService";
import { sendInvitations } from "../lib/sendInvitations"
import ConfirmModal from "./ConfirmModal";

import styles from "../styles/EventInformation.module.css";
import errorStyle from "../styles/NewEventForm.module.css";

export default function ChangeEventForm({ information, setEvents, email, closeEventInfo, userName }) {
    const { selectedFriends, clearFriends, setSelectedFriends } = useFriends();
    const [showFriends, setShowFriends] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [modalMessage, setModalMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        dresscode: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });
      
    useEffect(() => {
        if (information) {
          setFormData({
            title: information.title || '',
            type: information.type || '',
            dresscode: information.dresscode || '',
            description: information.description || '',
            date: information.date || '',
            time: information.time || '',
            location: information.location || ''
          });
        }
    }, [information]);

    useEffect(() => setSelectedFriends(information.friends), [email, information.friends]);

    function handleCloseEventChange() {
        clearFriends();
        closeEventInfo();
    }
    
    function confirmSave() {
        setPendingAction(() => () => handleSubmitAction());
        setModalMessage('Ви зберігаєте зміни, ваші гості будуть про це попередженні новим листом');
        setShowConfirmModal(true);
    }
    
    function confirmDelete() {
        setPendingAction(() => () => handleDelete());
        setModalMessage('Ви видаляєте подію, ваші гості будуть попередженні про відміну новим листом');
        setShowConfirmModal(true);
    }
    
    function handleConfirm() {
        if (pendingAction) pendingAction();
        setShowConfirmModal(false);
        setPendingAction(null);
    }
    
    function handleCancel() {
        setShowConfirmModal(false);
        setPendingAction(null);
    }
    

    /**
     * Обробник надсилання форми. Перевіряє, чи всі поля заповнені, перед надсиланням даних.
     * 
     * @param {Event} e - Подія надсилання форми.
     */
    async function handleSubmitAction() {
        if (!fieldsNotEmpty(formData)) {
            setErrorMessage('Всі поля мають бути заповнені.');
            return;
        }
    
        const eventDetails = {
            ...formData,
            _id: information._id
        };
    
        const oldFriends = information.friends.map(f => f.email);
        const newFriends = selectedFriends.map(f => f.email);
    
        const addedFriends = selectedFriends.filter(f => !oldFriends.includes(f.email));
        const removedFriends = information.friends.filter(f => !newFriends.includes(f.email));
        const keptFriends = selectedFriends.filter(f => oldFriends.includes(f.email));
    
        const infoWasChanged = eventInfoChanged(information, formData);
    
        await updateEventInDB(information._id, { ...eventDetails, friends: selectedFriends }, email);    
        setEvents(prev => prev.map(ev => ev._id === information._id ? { ...eventDetails, friends: selectedFriends } : ev));
    
        if (addedFriends.length > 0) {
            await sendHandler({
                eventDetails,
                friendsEmails: addedFriends.map(f => f["email"]),
                letterType: "create"
            });
        }
    
        if (removedFriends.length > 0) {
            await sendHandler({
                eventDetails,
                friendsEmails: removedFriends.map(f => f["email"]),
                letterType: "cancel"
            });
        }
    
        if (infoWasChanged && keptFriends.length > 0) {
            await sendHandler({
                eventDetails,
                friendsEmails: keptFriends.map(f => f["email"]),
                letterType: "update"
            });
        }
    }

    function eventInfoChanged(oldInfo, newInfo) {
        return (
            oldInfo.title !== newInfo.title ||
            oldInfo.type !== newInfo.type ||
            oldInfo.dresscode !== newInfo.dresscode ||
            oldInfo.description !== newInfo.description ||
            oldInfo.date !== newInfo.date ||
            oldInfo.time !== newInfo.time ||
            oldInfo.location !== newInfo.location
        );
    }
    

    /**
     * Перевіряє, чи всі необхідні поля форми заповнені.
     * 
     * @param {FormData} form - Дані форми.
     * @returns {boolean} `true`, якщо всі поля заповнені, інакше `false`.
     */
    function fieldsNotEmpty(data) {
        return (
          data.title.trim() !== '' &&
          data.dresscode.trim() !== '' &&
          data.description.trim() !== '' &&
          data.location.trim() !== '' &&
          data.date.trim() !== '' &&
          data.time.trim() !== '' &&
          selectedFriends.length > 0
        );
      }

    async function handleDelete() {
        await deleteEventFromDB(information._id, email);
        sendHandler({
            eventDetails: information,
            friendsEmails: information.friends.map(f => f["email"]),
            letterType: "cancel"
        });
        await setEvents(prevEvents => prevEvents.filter(ev => ev._id !== information._id));
        handleCloseEventChange();
    }

    /**
     * Відправляє запрошення друзям.
     * 
     * @param {Object} eventDetails - Деталі заходу.
     */
    async function sendHandler({ eventDetails, friendsEmails, letterType }) {
        console.log('details: ' + eventDetails);
        console.log('emails: ' + friendsEmails);
        console.log('type: ' + letterType);
        console.log('uname: ' + userName);
        console.log('uemail: ' + email);

        const result = await sendInvitations({ eventDetails, friendsEmails, letterType, userName, email });     

        if (result.success) {
            handleCloseEventChange();
        } else {
            setStatus('Error: ' + result.error);
        }         
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }


    return (
        <form className={styles.event_information} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.event_information__header}>
                <p>Змінити інформацію про подію</p>
                <button onClick={handleCloseEventChange}>X</button>
            </div>
            <Input Ilabel='Назва заходу' Itype='text' Iplaceholder='enter event' Iname='title' hasError={() => console.log('+')}
                value={formData.title}
                onChange={handleChange} />
            <select name='type' onChange={handleChange}>
                <option selected="selected">{formData.type}</option>
                <option>Вечірка</option>
                <option>After-party</option>
                <option>Гендерна вечірка</option>
                <option>Поховання</option>
                <option>Весілля</option>
                <option>День народження</option>
            </select>
            <Input Ilabel='Стиль одягу' Itype='text' Iplaceholder='enter dress-code' Iname='dresscode' hasError={() => console.log('+')}
                value={formData.dresscode}
                onChange={handleChange} />
            <Input Ilabel='Опис' Itype='text' Iplaceholder='description..' Iname='description' hasError={() => console.log('+')}
                value={formData.description}
                onChange={handleChange}/>
            <Input Ilabel='Локація' Itype='text' Iplaceholder='enter address' Iname='location' hasError={() => console.log('+')}
                value={formData.location}
                onChange={handleChange}/>
            <Input Ilabel='Дата' Itype='date' Iplaceholder='' Iname='date' hasError={() => console.log('+')}
                value={formData.date}
                onChange={handleChange}/>
            <Input Ilabel='Час' Itype='time' Iplaceholder='' Iname='time' hasError={() => console.log('+')}
                value={formData.time}
                onChange={handleChange}/>
            <ul className={styles.event_information__selected_friends}>
                {selectedFriends.map((el, id) => (<li key={id}>{el.name}</li>))}
            </ul>
            <button type="button" className={styles.event_information__friendsBtn} onClick={() => setShowFriends(true)}>Add Friends</button>
            {showFriends &&
                <SelectFriends closeShowFriends={() => setShowFriends(false)}/>}

            {errorMessage == '' ? '' : <p className={errorStyle.new_event__error_message}>{errorMessage}</p>}
            <div className={styles.event_information__actions}>
                <button type="button" className={styles.event_information__save} onClick={confirmSave}>&#9989;</button>
                <button type="button" className={styles.event_information__delete} onClick={confirmDelete}>&#128686;</button>
            </div>
            {showConfirmModal && (
                    <ConfirmModal
                        message={modalMessage}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        showCkeckbox="false"
                    />
            )}
        </form>
    )
}
