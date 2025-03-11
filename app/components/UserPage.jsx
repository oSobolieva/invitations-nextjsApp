'use client'
import React, { useState, Suspense } from 'react';
import Sidebar from './Sidebar';
import Event from './Event';
//import EventForm from './NewEventForm';

const LazyEventForm = React.lazy(() => import('./NewEventForm'));

/*function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoadedComponent />
    </Suspense>
  );
}*/


export default function UserPage({user}) {
    const [showForm, setShowForm] = useState(false);

    return (
    <Suspense fallback={<div>Завантажую...</div>}>
      <Sidebar info={user} />
      <div className='events__board'>
          {user.events.length > 0 ? user.events.map((el, id) => <Event information={el} key={id} />) : 'no event yet.'}
      </div>
      <button className='addEnventBtn' onClick={() => setShowForm(true)}>+</button>   
      {showForm && <LazyEventForm closeForm={() => setShowForm(false)} friends={user.friends} email={user.email} />} 
    </Suspense>
  )
}