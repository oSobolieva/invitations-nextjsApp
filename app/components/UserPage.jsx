'use client'

/**

Компонент UserPage відображає інформацію про користувача, його заходи та дозволяє створювати нові події.

@component

@param {Object} props - Пропси компонента.

@param {Object} props.user - Інформація про користувача.

@param {Array} props.user.events - Масив заходів користувача.

@param {Array} props.user.friends - Масив друзів користувача.

@param {string} props.user.email - Електронна адреса користувача.

@returns {JSX.Element} Компонент сторінки користувача.
*/

import React, { useState, Suspense } from 'react';
import Sidebar from './Sidebar';
import Event from './Event';
import ModalAllFriends from './ModalAllFriends';
import { FriendsProvider } from '../context/FriendsContext';

import styles from "../styles/UserPage.module.css"

const LazyEventForm = React.lazy(() => import('./NewEventForm'));

export default function UserPage({ user }) {
  const [events, setEvents] = useState(user.events || []);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModalFriends, setModalFriends] = useState(false);

  function showSuccessMessage() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  }

  return (
    <Suspense fallback={<div>Завантажую...</div>}>
      <FriendsProvider email={user.email}>
        <Sidebar info={user} showModalFriends={() => setModalFriends(true)} />
        <div className={styles.events__board}>
          {events.length > 0
            ?
            events.map((el, id) => <Event information={el} setEvents={setEvents} userEmail={user.email} userName={user.name} key={id} />)
            : 'заплановані події відсутні.'}
        </div>
        <button className={styles.addEnventBtn} onClick={() => setShowForm(true)}>+</button>   
        {showForm &&
          <LazyEventForm closeForm={() => setShowForm(false)} setEvents={setEvents} userName={user.name} email={user.email} successHandler={() => showSuccessMessage()} />}

        {showSuccess && <p className={styles.succes_sending}>Листи успішно відправлені!&#128516;</p>}
        {showModalFriends && <ModalAllFriends userEmail={user.email} hideModalFriends={() => setModalFriends(false)} />}
      </FriendsProvider>
    </Suspense>
  )
}