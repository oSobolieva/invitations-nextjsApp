import { createPortal } from "react-dom"
import React, { useState } from "react";
import EventInform from "./EventInform"
import ChangeEventForm from "./ChangeEventForm";


export default function Event({ information }) {
    const [showInformation, setShowInformation] = useState('');

    function handleChangeInfo(value) {
        setShowInformation(value);
    }

    const renderModalContent = () => {
        switch (showInformation) {
            case 'info':
                return <EventInform information={information} handleChangeInfo={() => handleChangeInfo('change_info')} closeEventInfo={() => handleChangeInfo('')} />;
            case 'change_info':
                return <ChangeEventForm information={information} closeEventInfo={() => handleChangeInfo('')} />;
            default:
                return null;
        }
    };

    return (
        <>
            {showInformation && createPortal(renderModalContent(), document.body)}
            <button className='event' onClick={() => handleChangeInfo('info')}>{information.title}</button>
        </>
    );
}

