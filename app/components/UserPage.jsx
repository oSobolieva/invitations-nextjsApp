'use client'
import { useState } from 'react';
import Sidebar from './Sidebar';
import Event from './EventBoard';
import EventForm from './NewEventForm';


export default function UserPage({name, email, image, friends}) {
    const [showForm, setShowForm] = useState(false);

    return (
    <>
      <Sidebar name={name} email={email} image={image} />
      <Event/>
      <button className='addEnventBtn' onClick={() => setShowForm(true)}>+</button>
        {showForm && <EventForm closeForm={() => setShowForm(false)} friends={friends} />}
    </>
  )
}