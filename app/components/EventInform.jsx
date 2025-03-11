

export default function EventInform({ information, handleChangeInfo, closeEventInfo }) {
    
    
    return (
        <div className='event_information'>
            <div className = 'event_information__header'>
                <p>Назва:  <span>{information.title}</span></p>
                <button onClick = {closeEventInfo}>X</button>
            </div>
            <p>Тип:  <span> {information.type}</span></p>
            <p>Стиль одягу:  <span> {information.dresscode}</span></p>
            <p>Опис:  <span> {information.description}</span></p>
            <p>Дата:  <span> {information.date}</span></p>
            <p>Час:  <span> {information.time}</span></p>
            <p>Локація:  <span> {information.location}</span></p>
            <button className='change_event_inform' onClick={() => handleChangeInfo()}>&#9997;</button>
        </div>
    )
}
