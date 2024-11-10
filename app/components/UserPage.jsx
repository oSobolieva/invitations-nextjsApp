'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Event from './Event';
import EventForm from './NewEventForm';


export default function UserPage({user}) {
    const [showForm, setShowForm] = useState(false);

    return (
    <>
      <Sidebar info={user} />
      <div className='events__board'>
          {user.events.length > 0 ? user.events.map((el, id) => <Event information={el} key={id} />) : 'no event yet.'}
      </div>
      <button className='addEnventBtn' onClick={() => setShowForm(true)}>+</button>   
      {showForm && <EventForm closeForm={() => setShowForm(false)} friends={user.friends} email={user.email} />} 
    </>
  )
}