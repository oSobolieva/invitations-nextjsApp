/**
 * Компонент події.
 * 
 * Відображає кнопку з назвою події та дозволяє переглядати або змінювати її інформацію через модальне вікно.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {Object} props.information - Інформація про подію.
 * @param {string} props.information.title - Назва події.
 * @returns {JSX.Element} Кнопка події з можливістю відкриття деталей.
 */

import { createPortal } from "react-dom"
import React, { useState } from "react";
import EventInform from "./EventInform"
import ChangeEventForm from "./ChangeEventForm";

import styles from "../styles/UserPage.module.css"


export default function Event({ information, userEmail, userName }) {
    const [showInformation, setShowInformation] = useState('');

    const eventDateTime = new Date(`${information.date}T${information.time}`);
    const now = new Date();

    const isPast = now > eventDateTime;

    /**
     * Змінює стан показу інформації про подію.
     * 
     * @param {string} value - Новий стан ('info' для перегляду, 'change_info' для редагування, '' для закриття).
     */
    function handleChangeInfo(value) {
        setShowInformation(value);
    }

    /**
     * Визначає контент для модального вікна залежно від стану `showInformation`.
     * 
     * @returns {JSX.Element | null} Відповідний компонент для перегляду чи редагування події.
     */
    const renderModalContent = () => {
        switch (showInformation) {
            case 'info':
                return <EventInform information={information} handleChangeInfo={() => handleChangeInfo('change_info')} closeEventInfo={() => handleChangeInfo('')} />;
            case 'change_info':
                return <ChangeEventForm information={information} email={userEmail} userName={userName} closeEventInfo={() => handleChangeInfo('info')} />;
            default:
                return null;
        }
    };

    return (
        <>
            {showInformation && createPortal(renderModalContent(), document.body)}
            <button className={isPast ? `${styles.event} ${styles.event_past}` : `${styles.event} ${styles.event_upcoming}`}
                onClick={() => handleChangeInfo('info')}>{information.title}</button>
        </>
    );
}