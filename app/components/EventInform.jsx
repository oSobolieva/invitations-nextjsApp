/**
 * Компонент відображення інформації про подію.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {Object} props.information - Детальна інформація про подію.
 * @param {string} props.information.title - Назва події.
 * @param {string} props.information.type - Тип події.
 * @param {string} props.information.dresscode - Дрес-код події.
 * @param {string} props.information.description - Опис події.
 * @param {string} props.information.date - Дата події.
 * @param {string} props.information.time - Час події.
 * @param {string} props.information.location - Місце проведення події.
 * @param {Function} props.handleChangeInfo - Функція для редагування інформації про подію.
 * @param {Function} props.closeEventInfo - Функція для закриття вікна інформації про подію.
 * @returns {JSX.Element} Розмітка з інформацією про подію та кнопками для редагування або закриття.
 */

import styles from "../styles/EventInformation.module.css"

export default function EventInform({ information, handleChangeInfo, closeEventInfo }) {
    
    return (
        <div className={styles.event_information}>
            <div className={styles.event_information__header}>
                <p>Назва:  <span>{information.title}</span></p>
                <button onClick={closeEventInfo}>X</button>
            </div>
            <p>Тип:  <span> {information.type}</span></p>
            <p>Стиль одягу:  <span> {information.dresscode}</span></p>
            <p>Опис:  <span> {information.description}</span></p>
            <p>Локація:  <span> {information.location}</span></p>
            <p>Дата:  <span> {information.date}</span></p>
            <p>Час:  <span> {information.time}</span></p>   
            <button className={styles.change_event_inform} onClick={() => handleChangeInfo()}>&#9997;</button>
        </div>
    )
}
