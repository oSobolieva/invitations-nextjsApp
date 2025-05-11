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

const LazyEventForm = React.lazy(() => import('./NewEventForm'));

export default function UserPage({user}) {
  const [showForm, setShowForm] = useState(false);
  const [showModalFriends, setModalFriends] = useState(false);

  return (
    <Suspense fallback={<div>Завантажую...</div>}>
      <Sidebar info={user} showModalFriends={() => setModalFriends(true)} />
      <div className='events__board'>
          {user.events.length > 0 ? user.events.map((el, id) => <Event information={el} key={id} />) : 'заплановані події відсутні.'}
      </div>
      <button className='addEnventBtn' onClick={() => setShowForm(true)}>+</button>   
      {showForm && <LazyEventForm closeForm={() => setShowForm(false)} email={user.email} />} 
      {showModalFriends && <ModalAllFriends userEmail={user.email} hideModalFriends={() => setModalFriends(false)} />}  
    </Suspense>
  )
}