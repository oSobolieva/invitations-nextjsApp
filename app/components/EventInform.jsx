

export default function EventInform({ information, handleChangeInfo, closeEventInfo }) {
    
    
    return (
        <div className='event_information'>
            <div className = 'event_information__header'>
                <p>Title:  <span>{information.title}</span></p>
                <button onClick = {closeEventInfo}>X</button>
            </div>
            <p>Type:  <span> {information.type}</span></p>
            <p>Dress-code:  <span> {information.dresscode}</span></p>
            <p>Description:  <span> {information.description}</span></p>
            <p>Date:  <span> {information.date}</span></p>
            <p>Time:  <span> {information.time}</span></p>
            <p>Location:  <span> {information.location}</span></p>
            <button className='change_event_inform' onClick={() => handleChangeInfo()}>&#9997;</button>
        </div>
    )
}
