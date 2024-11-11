//import EntryButtons from "./EntryButtons"
import React, { Suspense } from 'react';

const EntryButtons = React.lazy(() => import('./EntryButtons'));


export default function Start(){

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <link rel="preload" as="image" href="../../public/starting-page.png"></link>
            <div className = 'start-container'>
                <h1>Hello from 'Invitations'!</h1>
                <p>Login or register to create a new invitation &#128516;</p>
                <EntryButtons/>
            </div>
            <section className = 'start-section'>
                <h2>What is 'Invitations' about?</h2>
                <p>Hey! We're new app 'Invitations'! Where you can create a new event and invite your friends.
                    When creating a new event, you indicate all the necessary data: title, date, time, description, dress code and other necessary parameters.
                    After creating an event, you can edit it and resend invitations.
                    If your friends are not registered in our application, you can add their emails manually.</p>
            </section>
        </Suspense>
    )
}
